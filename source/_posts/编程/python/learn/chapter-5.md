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
# 循環輸出0-10
a=0
while a < 11:
    print(a)
    a+=1

# 計算0-4之間的纍加和
a=0
sum=0;
while a<=4:
    sum+=a
    a+=1
print(sum) # 10
```

### for-in循环


### break,continue,else语句


### 嵌套循环
