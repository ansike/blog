---
title: for循环
---
### 基础使用
for var in vars
for ((expr1;expr2;expr3))
do
  指令...
done

### 使用for打印54321
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
