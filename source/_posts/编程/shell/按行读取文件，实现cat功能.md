---
title: 按行读取文件，实现cat功能
categories: 编程
tags: shell
date: 2021-05-05 22:46:13
---

### 按行读取文件
```shell
#!/bin/bash
[ $# -ne 1 ] && {
  echo "usage: $0 [file]"
  exit 1
}
# exec读取文件
# function readFile() {
#   [ ! -f $1 ] && {
#     echo "文件不存在: $1"
#     exit 2
#   }
#   exec <$1
#   while read line
#   do
#     echo $line
#   done
#   done<$1
# }

# # 重定向输入
# function readFile() {
#   [ ! -f $1 ] && {
#     echo "文件不存在: $1"
#     exit 2
#   }
#   while read line
#   do
#     echo $line
#   done<$1
# }

# 通过管道方式
function readFile() {
  [ ! -f $1 ] && {
    echo "文件不存在: $1"
    exit 2
  }
  cat $1 | while read line
  do
    echo $line
  done
}

readFile $1
```

