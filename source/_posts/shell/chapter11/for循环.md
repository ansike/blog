---
title: for循环
---

### 基础使用

for var in vars
for ((expr1;expr2;expr3))
do
指令...
done

### 使用 for 打印 54321

```shell
#!/bin/bash
# C语言型
for ((i=5;i>0;i--))
do
  echo $i
done

i=5
for ((;i>0;))
do
  echo $i
  ((i--))
done

for i in 5 4 3 2 1
# for i in {5..1}
# for i in `seq 5 -1 1`
do
  echo $i
done
```
### 使用 for 批量换后缀

```shell
#!/bin/bash
for file in `ls temp`
do
  # 使用cut对文件名切割，读取切割的第一个域，拼接text后缀
  mv temp/$file temp/`echo $file | cut -d . -f1`".text"
  # 将所有的后缀都改为.text
  # ls | awk -F "." '{print "mv",$0, $1".text"}' | bash
done
```

### 使用 for 乘法表

```shell
#!/bin/bash
set -e
for ((i=1;i<=9;i++))
do
  str=""
  for ((j=1;j<=$i;j++))
  do
    str="$str $i*$j=$((i*j))"
  done
  echo $str
done
# res
# 1*1=1
# 2*1=2 2*2=4
# 3*1=3 3*2=6 3*3=9
# 4*1=4 4*2=8 4*3=12 4*4=16
# 5*1=5 5*2=10 5*3=15 5*4=20 5*5=25
# 6*1=6 6*2=12 6*3=18 6*4=24 6*5=30 6*6=36
# 7*1=7 7*2=14 7*3=21 7*4=28 7*5=35 7*6=42 7*7=49
# 8*1=8 8*2=16 8*3=24 8*4=32 8*5=40 8*6=48 8*7=56 8*8=64
# 9*1=9 9*2=18 9*3=27 9*4=36 9*5=45 9*6=54 9*7=63 9*8=72 9*9=81
```

### 批量创建数据库

```shell
#!/bin/bash
USER=root
PASSWORD=123456
LOGINCMD="mysql -u$USER -p$PASSWORD"

for dbname in oldBody oldgirl xxx yyy
do
  # 不存在则创建
  $LOGINCMD -e "create database IF NOT EXISTS $dbname"
  # 强制删除，重新创建
  # $LOGINCMD -e "drop database $dbname; create database $dbname"
done
```
