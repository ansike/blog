---
title: case应用及实践
---


### 基础语法
``` shell
case "$var" in
  "[值1]")
    # 指令1
    ;;
  "[值2]")
    # 指令2
    ;;
  *)
    # 默认指令
    ;;
esac
```

### 数字匹配demo
``` shell
read -p "请输入数字:" var
case "$var" in
  1)
    echo "匹配到1,输出1"
    ;;
  2)
    echo "匹配到2,输出2"
    ;;
  [3-9])
    echo "匹配到${var},输出${var}"
    ;;
  *)
    echo "进入默认项,只能输入[1-9]的数字"
    ;;
esac
```

### 数字匹配菜单[简单版本]
```shell
#!/bin/bash
echo '
  =======================
  1.apple
  2.pear
  3.banana
  4.cherry
  =======================
'
read -p "Pls select a num: " num

case "$num" in
  1)
    echo "apple"
    ;;
  2)
    echo "pear"
    ;;
  3)
    echo "banana"
    ;;
  4)
    echo "cherry"
    ;;
  *)
    echo "must be {1|2|3|4}"
esac
```

##### 优化打印菜单方式
```shell
function menu() {
  cat <<END
1.apple
2.pear
3.banana
4.cherry
END
}
menu
```

##### 数字匹配菜单[优化版本]
```shell
#!/bin/bash
RED_COLOR='\033[1;31m'
GREEN_COLOR='\033[1;32m'
YELLOW_COLOR='\033[1;33m'
BLUE_COLOR='\033[1;34m'
RES='\033[0m'
OS=$(uname)

function menu() {
  cat <<END
1.apple
2.pear
3.banana
4.cherry
END
}

function usage(){
  echo "must be {1|2|3|4}"
  exit 1
}

# 区分mac和其他系统
function echoFn() {
  if [ "${OS}" == "Darwin" ]
    then
      echo $1
    else
      echo -e $1
    fi
  
}

function choice(){
  read -p "Pls select a num: " num
  # mac中不需要-e
  case "$num" in
    1)
      echoFn "${RED_COLOR}apple${RES}"
      ;;
    2)
      echoFn "${GREEN_COLOR}pear${RES}"
      ;;
    3)
      echoFn "${YELLOW_COLOR}banana${RES}"
      ;;
    4)
      echoFn "${BLUE_COLOR}cherry${RES}"
      ;;
    *)
      usage
      ;;
  esac
}

function main(){
  menu
  choice
}

main
```

##### 字体加色
```shell
#!/bin/bash
function usage(){
  echo "Usage: $0 content {red|green|yellow|blue}"
  exit 1
}

# 区分mac和其他系统
function echoFn() {
  if [ "${OS}" == "Darwin" ]
    then
      echo $1
  else
    echo -e $1
  fi
}

function add_color(){
  RED_COLOR='\033[1;31m'
  GREEN_COLOR='\033[1;32m'
  YELLOW_COLOR='\033[1;33m'
  BLUE_COLOR='\033[1;34m'
  RES='\033[0m'
  OS=$(uname)
  [ $# -ne 2 ] && {
    usage
  }

  case "$2" in
    red | RED)
      echoFn "${RED_COLOR}$1${RES}"
      ;;
    green|GREEN)
      echoFn "${GREEN_COLOR}$1${RES}"
      ;;
    yellow|YELLOW)
      echoFn "${YELLOW_COLOR}$1${RES}"
      ;;
    blue|BLUE)
      echoFn "${BLUE_COLOR}$1${RES}"
      ;;
    *)
      usage
      ;;
  esac
}

function main(){
  add_color $1 $2
}

main $*
```
