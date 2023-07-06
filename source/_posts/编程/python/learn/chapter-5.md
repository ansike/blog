---
title: 循环
categories: 编程
tags:
  - python
  - language
date: 2022-09-07 22:36:35
---

### range() 函数
- 目的：用于生成一个整数序列
- 创建方式
  - range(stop) 创建一个[0,stop)的整数序列，步长为1
  - range(star,stop) 创建一个[start,stop)的整数序列，步长为1
  - range(star,stop,step) 创建一个[start,stop)的整数序列，步长为step
- 返回值：一个迭代类型对象
- 优点：不管range对象的整数序列有多长，所有range对象占用的内存空间都是相同，仅仅需要存储start,stop,和step，只有需要用到range对象时才回去计算序列中的相关元素
- in与 not in判断整数序列中是否存在（不存在）指定的整数

```python
lst0=range(11)
lst=range(1,11)
lst2=range(1,11,2)
print(list(lst0))
print(list(lst))
print(list(lst2))
print(9 in lst)
print(9 not in lst)
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# [1, 3, 5, 7, 9]
# True
# False
```

### while循环
```python
# 循环输出0-10
a=0
while a < 11:
    print(a)
    a+=1

# 计算0-4之间的累加和
a=0
sum=0
while a<=4:
    sum+=a
    a+=1
print(sum) # 10
```

### for-in循环
从字符串，序列等中依次取值，遍历的对象必须是可迭代对象
循环中不需要使用自定义变量时，可以将自定义变量写为"_"

```python
# 从字符串中依次去取字母
for i in "hello world":
    print(i)

# 从数组中依次取出
for i in range(10):
    print(i)

# 計算0-100之間的偶数和
sum=0
for i in range(101):
    if i%2==0:
        sum+=i
    i+=1
print(sum)

''' 取出100-999之间的水仙花数
    153=1**3+5**3+3**3
'''
for i in range(100,1000):
    first=int(i/100);
    second=int(i%100/10)
    third=i%10
    if first**3+second**3+third**3 == i:
        print(i)
# 153
# 370
# 371
# 407
```

### break, continue, else语句
break和continue与其他语言一致


while，for-in循环正常执行完之后就会执行else
```python
sum=0
for i in range(101):
    if i%2==0:
        sum+=i
    i+=1
    break # 如果没有执行break，程序执行完for-in就会走else
else:
    print("else")
print(sum)
```

### 嵌套循环
```python
'''
打印 99 乘法表
'''
for i in range(1,10):
    for j in range(1, i+1):
        print(str(i)+"*"+str(j)+"="+str(i*j), end='\t')
    print()

# 1*1=1	
# 2*1=2	2*2=4	
# 3*1=3	3*2=6	3*3=9	
# 4*1=4	4*2=8	4*3=12	4*4=16	
# 5*1=5	5*2=10	5*3=15	5*4=20	5*5=25	
# 6*1=6	6*2=12	6*3=18	6*4=24	6*5=30	6*6=36	
# 7*1=7	7*2=14	7*3=21	7*4=28	7*5=35	7*6=42	7*7=49	
# 8*1=8	8*2=16	8*3=24	8*4=32	8*5=40	8*6=48	8*7=56	8*8=64	
# 9*1=9	9*2=18	9*3=27	9*4=36	9*5=45	9*6=54	9*7=63	9*8=72	9*9=81
```