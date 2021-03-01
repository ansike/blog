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

<<<<<<< HEAD
### 函数写法
=======
### 常规写法
>>>>>>> 527ad9fc6ebcbb147ff1b6cc81f0e65a9dbf88f9

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
