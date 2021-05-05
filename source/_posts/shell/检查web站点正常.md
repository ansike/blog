---
title: function函数实战-脚本检查web站点正常
categories: 编程
tags:
date: 2021-02-26 23:14:03

---

检查方式
1. wget 访问站点 eg: wget --spider https://ansike.github.io/blog/
2. curl 访问站点 eg: curl --connect-timeout 5 -o /dev/null -s -w "%{http_code}\n" https://ansike.github.io/blog/

### 常规写法

```shell
# 使用wget检查站点服务是否正常
#!/bin/bash
[ $# -ne 1 ] && {
  echo "USAGE:$0 url"
  exit 1
}

wget --spider -q -T 2 -t 1 -o /dev/null $1

[ $? -eq 0 ] && {
  echo "$1 is success"
  exit 0
} || {
  echo "$1 is error"
  exit 2
}
```

### 函数写法

```shell
# 使用wget检查站点服务是否正常
#!/bin/bash
. /etc/init.d/functions
function usage () {
  echo "USAGE:$0 url"
  exit 1
}

function check_url () {
  wget --spider -q -T 2 -t 1 -o /dev/null $1
  [ $? -eq 0 ] && {
    action "$1 is success" /bin/true
    exit 0
  } || {
    action "$1 is error" /bin/false
    exit 2
  }
}

function main () {
  [ $# -ne 1 ] && {
    usage
  }
  check_url $1
}

main $*
```

### while守护进程方式,循环检测。失败超过阈值退出

```shell
# 使用wget检查站点服务是否正常
#!/bin/bash
. /etc/init.d/functions
function usage () {
  echo "USAGE:$0 url"
  exit 1
}

function check_url () {
  
  [ `curl --connect-timeout 5 -o /dev/null -s -w "%{http_code}\n" $1 | egrep -w "200|301|302" | wc -l` -eq 1 ] && {
    action "$1 is success" /bin/true
  } || {
    action "$1 is error" /bin/false
    return 2
  }
}

# function check_url () {
#   wget --spider -q -T 2 -t 1 -o /dev/null $1
#   [ $? -eq 0 ] && {
#     action "$1 is success" /bin/true
#   } || {
#     action "$1 is error" /bin/false
#     return 2
#   }
# }

function main () {
  [ $# -ne 1 ] && {
    usage
  }
  TIMES=0
  while [ $TIMES -lt 3 ]
  do
    check_url $1
    [ $? -eq 0 ] || {
      ((++TIMES))
    }
    sleep 1
  done
}

main $*
```
