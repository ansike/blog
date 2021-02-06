---
title: shell中变量的数值计算
---
### 简介
1. (())
2. let
3. expr
4. bc是UNIX/Linux下的计算器
5. $[]
6. awk
7. declare


### (()) 计算
### let 计算
### expr 计算
### bc 执行交互式计算
``` shell
bc # 输入bc后可以在命令行开始执行交互式计算,退出使用quit

```

##### 命令行使用
``` shell
echo 2 + 2 | bc # 直接`echo 2+2`将会输出`2+2`字符串,使用bc能输出计算后的值
echo 2.1 + 2 | bc # 支持浮点运算(awk), 整数的话可以考虑(()), let, expr
echo "scale=2;12313/123" | bc # 使用scale保留2位小数
echo "scale=4;12313/13" | bc # 使用scale保留2位小数

# 配合变量做运算,效率略低下
i=5
i=`echo $i + 6 | bc`
echo $i
```

##### 生成数字序列并做计算
```shell
# 计算1加到n的值
# 1+2+3+4+5+6+7+8+9+10=55

# bc
echo `seq -s "+" 10`=`seq -s "+" 10 | bc`

# (())
echo `seq -s "+" 10`=$((`seq -s "+" 10`))

# expr, 注意操作符两边必须有空格
echo `seq -s "+" 10`=`seq -s " + " 10 | xargs expr`

# $[]
echo `seq -s "+" 10`=$[`seq -s "+" 10`]
```




### awk 计算
适合小数和整数运算,很精确,适合命令行运算

```shell
# 注意awk 后边是单引号
echo "4.31 12.222" | awk '{print ($1-$2)}'
echo "3 4" | awk '{print ($1**2+$2**2)}'
```

### declare 计算
```shell
# 
declare -i A=30 B=7
A=A+B
echo $A
```

### $[] 计算
```shell
i=5
i=$[$i+1]
echo $i
echo $[2*3]
echo $[2**3]
```
