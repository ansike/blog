---
title: awk命令
categories: 编程
tags:
date: 2021-02-22 23:36:36
---

从练习入手

### 练习题
https://blog.csdn.net/aywb1314/article/details/52239281
```shell
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
