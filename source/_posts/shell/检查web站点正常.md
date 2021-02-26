---
title: function函数实战-脚本检查web站点正常
---

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

### 常规写法

```shell
# 使用wget检查站点服务是否正常
#!/bin/bash
function usage () {
  echo "USAGE:$0 url"
  exit 1
}

function check_url () {
  wget --spider -q -T 2 -t 1 -o /dev/null $1
  [ $? -eq 0 ] && {
    echo "$1 is success"
    exit 0
  } || {
    echo "$1 is error"
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
