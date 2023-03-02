---
title: awk
categories: 编程
tags:
  - shell
  - awk
date: 2022-01-16 11:27:28
---

### 说明

是 linux 系统最强大的文本处理工具. 不仅是 linux 系统中的一个命令,还是一种编程语言,可以用来处理数据和生成报告(Excel).

### 语法格式

awk [options] 'pattern {action}' [FILE]

### 常用功能

| 序号 | 常用功能             | 说明                                                                                           |
| ---- | -------------------- | ---------------------------------------------------------------------------------------------- |
| 1    | 指定分隔符显示某几列 | awk -F "GET \| HTTP" '{print $2}' access.log 直接取出 url 显示出日志文件的 url 这列            |
| 2    | 取出想要的内容       | awk `'$6~/Failed/{print $11}'` /var/log/secure 分析生产环境中谁在破解用户的密码                |
| 3    | 显示某个范围内的文件 | awk 'NR\==20,NR\==30' filename 显示 20-30 行内容                                               |
| 4    | 统计和计算           | awk '{sum+=$0}END{print sum}' filename 计算总和                                                |
| 5    | 数组计算和去重       | awk '{array[$1]++}END {for(key in array)print key,array[key]}' access.log 对日志进行统计和计数 |

### 选项说明

| 参数选项 | 说明                          |
| -------- | ----------------------------- |
| -F       | 指定字段分隔符                |
| -v       | 定义或修改一个 awk 内部的变量 |

NR 表示行号
\$0 表示整行内容
\$1-\$n 表示某列
\$NF 表示最后一列

### 命令示例

```shell
# 测试文件
cat /etc/passwd

# 打印指定行和行号
cat -n /etc/passwd | awk "NR==2"
cat /etc/passwd | awk '{print NR,$0}'
awk '{print NR,$0}' /etc/passwd

# 打印第1,3,最后列
awk -F ":" '{print $1,$3,$NF}' /etc/passwd

# 替换文本内容 /sbin/nologin => /bin/bash
# gsub函数语法 gsub("替换对象","替换成什么内容","哪一列"),使用$0或者不写是整行替换
awk '{gsub("/sbin/nologin","/bin/bash",$0);print $0}' /etc/passwd
```

### 实战

```shell
# 字符串中获取版本号
echo '{"version": "1.0.0.1"}'|awk -F "\"" '{print $4}'

# 取出网卡中对应的ip地址(具体打印具体对待)
ifconfig en0 | awk -F "\ " 'NR==4{print $2}'


# https://blog.csdn.net/aywb1314/article/details/52239281
# 输入
a='wang     4
cui      3
zhao     4
liu      3
liu      3
chang    5
li       2'

  #  1 通过第一个域找出字符长度为4的
echo $a | awk 'length($1) == "4" {print $1}'
  #  2 当第二列值大于3时，创建空白文件，文件名为当前行第一个域$1 (touch $1)
echo $a | awk '{if($2>3){ system ("touch "$1)}}'
  #  3 将文档中 liu 字符串替换为 hong
  #  4 求第二列的和
echo $a | awk '{a+=$2} END {print a}'
  #  5 求第二列的平均值
echo $a | awk '{a+=$2} END {print a/NR}'
  #  6 求第二列中的最大值
  #  7 将第一列过滤重复后，列出每一项，每一项的出现次数，每一项的大小总和

```
