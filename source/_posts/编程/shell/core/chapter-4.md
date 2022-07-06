---
title: 文本处理三剑客
categories: 编程
tags: shell
date: 2022-07-05 00:22:22
---

<a href="#grep">1. grep 文本过滤工具</a>
<a href="#sed">2. sed 字符流编辑器</a>
<a href="#awk">3. awk 入门</a>

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

<h3 id="sed">2. sed 字符流编辑器</h3>

全称是 Stream Editor，简称流编辑器
常用的功能包括对文件实现快速增删改查，其中查询功能中最常用的两大功能是过滤，取行。

语法：sed [选项] [sed 内置命令字符] [输入文件]

参数选项及说明

| 参数 | 说明                                                                                   |
| ---- | -------------------------------------------------------------------------------------- |
| -n   | 取消默认的 sed 输出，常与命令 p 连用                                                   |
| -i   | 直接修改文件内容而不是输出到终端。sed 默认只是修改内存中的数据，并不会影响磁盘上的文件 |

内置名字字符的说明

| 参数                 | 说明                                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| a                    | append，在指定行后添加一行或者多行文本                                                                                                                |
| d                    | delete，删除匹配的文本                                                                                                                                |
| i                    | insert，在指定行前插入一行或多行文本                                                                                                                  |
| p                    | print，打印匹配的内容常与-n 连用                                                                                                                      |
| s/regexp/replacement | 匹配 regexp 部分的内容，用 replacement 替换 regexp 匹配的内容。regexp 可以使用正则，replacement 部分可以使用特殊字符&和\1-\9 等匹配 regexp 部分的内容 |

```shell
# 第二行append数据
sed "2a xxx" demo.txt
# 第二行insert数据
sed "2i xxx" demo.txt
# 第二行删除数据
sed "2d" demo.txt
# 只输出第二行。sed 输出第n行是需要关闭sed的默认输出功能的 -n
sed -n "2p" demo.txt

# 账号密码格式化
# user01
# pass01
# user01=pass01
sed 'N;s/\n/=/g' pass
```

> N 不会清空模式空间的内容。相当于连续两行为一个循环

Tips

```shell
# 备份一个重要文件
cp important.txt{,.ori}
```

<h3 id="awk">3. awk 入门</h3>
awk不仅仅是一个命令，还是一种编程语言，可以用来处理数据和生成报告（excel）。是linux系统中最强大的文本处理工具，没有之一。

常用功能介绍

| 序号 | 功能             | 说明                                                                                 |
| ---- | ---------------- | ------------------------------------------------------------------------------------ | ------------------ |
| 1    | 分割字符串       | 读取 access.log 读取 url 列，awk -F "GET                                             | HTTP" '{print $2}' |
| 2    | 通过正则取出内容 |                                                                                      |
| 3    | 显示某个范围内容 | 读取 2-30 行内容，awk 'NR==20,NR==30' file                                           |
| 4    | 统计计算         | 计算总和，awk '{sum+=$0}END{print sum}'                                              |
| 5    | 数组计算和去重   | 对日志进行统计和计数，awk '{array[$1]++}END{for(key in array)print key,array[key]}'' |

语法：awk [option] 'pattern{action}' file ...

| 参数 | 说明                            |
| ---- | ------------------------------- |
| -F   | 指定字段分隔符                  |
| -v   | 定义或者修改一个 awk 内部的变量 |

**范例**

```shell
# 只打印第5行数据
cat /etc/passwd|awk 'NR==5'
# 打印行号，$0 表示整行内容，NR表示行号
cat /etc/passwd|awk '{print NR,$0}'
cat /etc/passwd|awk 'NR==2,NR==3 {print NR,$0}'

# 打印:分割的第一列，第三列和最后一列 $n是第n列，$NF是最后一列
cat /etc/passwd|awk -F ":" '{print $1,$3,$NF}'

# 查找替换函数
cat /etc/passwd|awk '{gsub("/sbin/nologin","/bin/bash",$0);print $0}'

```

gsub 函数
语法：gsub('替换对象',"替换结果",哪一列)

**生产案例**

```shell
# 取eth0对应的ip地址
ifconfig eth0|awk -F " " 'NR==2{print $2}'
# 10.227.77.110

# 统计域名的访问次数
# cat access.log
# http://www.baidu1.com/index.html
# http://www.baidu2.com/index.html
# http://www.baidu2.com/index.html
# http://www.baidu.com/index.html
# http://www.baidu.com/index.html
# http://www.baidu.com/index.html
# 常规思路
cat access.log |awk -F "//|/" '{print $2}'|sort -r|uniq -c
      # 3 www.baidu.com
      # 2 www.baidu2.com
      # 1 www.baidu1.com

# 数组思路
cat access.log |awk -F "//|/" '{array[$2]++};END{for(domain in array) print domain, array[domain]}'
# www.baidu1.com 1
# www.baidu.com 3
# www.baidu2.com 2
```
