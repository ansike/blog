---
title: 文本处理三剑客
categories: 编程
tags: shell
date: 2022-07-03 18:55:58
---

<a href="#grep">1. grep 文本过滤工具</a>
<a href="#tac">2. tac 反向显示文件内容</a>

<h3 id="grep">1. grep 文本过滤工具</h3>

功能说明: 从文本文件或管道数据流中筛选匹配的行及数据。

语法: grep [option] [pattern] [file]

<b>option</b>

| 参数         | 说明                                |
| ------------ | ----------------------------------- |
| -v           | 反选                                |
| -n           | 显示匹配行及行号                    |
| -i           | 不区分大小写，默认区分大小写        |
| -c           | 只统计匹配的行数                    |
| -E           | 使用扩展的 egrep 命令               |
| --color=auto | 为 grep 匹配的字符串添加颜色        |
| -w           | 只匹配过滤的单词,类似单词的精确匹配 |
| -o           | 只输出匹配的内容                    |

```shell
# 去除配置文件中的注视和空行
grep -Ev "^$|#" /etc/mysql/my.cnf
```

###### openvpn 授权脚本案例

```shell
#!/bin/bash
# create by ansike
# time 2022-07-02
FILE_PATH=./openvpn/authfile.conf
[ ! -f $FILE_PATH ] && mkdir -p `dirname $FILE_PATH` && touch $FILE_PATH;

usage(){
  cat <<EOF
  USAGE: `basename $0` (-add|-del|-search) username
EOF
}

# 判断是否是root用户
if [ $UID -ne 0 ]; then
  echo "you are not supper user, please call root";
  exit 1;
fi

# 判断参数的数量
if [ $# -ne 2 ]; then
  usage
  exit 2;
fi

RETVAL=0
case "$1" in
  -a|-add)
    shift
    if grep -w "$1" $FILE_PATH >> /dev/null 2>&1 ; then
      echo "当前用户已经存在"
      exit;
    else
      chattr -i $FILE_PATH
      /bin/cp $FILE_PATH ${FILE_PATH}.$(date +%F%T)
      echo "$1">>$FILE_PATH
      [ $? -eq 0 ] && echo "新增用户成功：$1"
      chattr +i $FILE_PATH
      exit
    fi
    ;;
  -d|-del)
    shift
    if [ `grep -w "$1" $FILE_PATH|wc -l` -lt 1 ]; then
      echo "当前用户不存在"
      exit;
    else
      chattr -i $FILE_PATH
      /bin/cp $FILE_PATH ${FILE_PATH}.$(date +%F%T)
      sed -i "/^${1}$/d" ${FILE_PATH}
      [ $? -eq 0 ] && echo "删除用户成功：$1"
      chattr +i $FILE_PATH
      exit
    fi
    ;;
  -s|-search)
    shift
    if [ `grep -w "$1" $FILE_PATH|wc -l` -lt 1 ]; then
      echo "当前用户不存在"
      exit;
    else
      echo "当前用户存在"
      exit
    fi
    ;;
  *)
    usage
    exit
    ;;
esac
```
