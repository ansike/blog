---
title: while循环
categories: 编程
tags: shell
date: 2021-05-05 22:46:13
---
### 基础使用
while <条件表达式>
do
  指令...
done

while.sh
```shell
#!/bin/bash
while true
do
  uptime
  sleep 1
  # usleep 1000000 表示1s
done
```
### 使用while打印54321
```shell
#!/bin/bash
i=5
# while ((i>0))
# while [ $i -gt 0 ]
while [[ $i > 0 ]]
do
  echo $i
  ((--i))
done
```

### 计算从1加到100
```shell
#!/bin/bash
max=100
sum=0
while [[ $max > 0 ]]
do
  # sum=`expr $sum + $max`
  # let sum=sum+max
  # sum=$((sum+max))
  # ((sum=sum+max))
  ((sum+=max))
  ((--max))
done
echo $sum
```

### 命令后台执行相关知识
```shell
# 进入后台
sh while.sh &
# ctrl+c 停止执行
# ctrl+z 暂停执行
jobs # 查看当前执行的任务和脚本
fg # 把当前执行的任务和脚本放到前台执行，多个任务可以加 fg %n n为任务的序号
# kill %n 杀死任务
```