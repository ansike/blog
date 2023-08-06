---
title: 元组和集合
categories: 编程
tags:
  - python
  - language
date: 2023-07-09 00:18:44
---
### 什么是元组
是python内置的数据结构之一，是一个不可变序列

不可变序列（没有增删改的操作）：字符串，元组
可变序列（增删改操后对象地址不变）：列表，字典，集合


### 元组的创建方式

```python
# 对象字面量
t1 = ('a', 'b')
print(t1)
print(type(t1))

# 内置函数tuple
t2 = tuple(('a', 'b'))
print(t2)
print(type(t2))

# 对象字面量
# t3 = ('a')  # 元组只有一个元素且是字符串时会被认为是一个字符串,此时需要增加逗号
t3 = ('a',) 
print(t3)
print(type(t3))
```


### 元组的遍历
使用for-in遍历

### 什么是集合
属于可变序列
集合是没有value的字典

### 集合的创建

```python
s1={1,2,3}
print(s1)

s2=set(range(6))
print(s2)
```

### 集合的增删改查
- 存在判断 in, not in
- 新增操作 add()
- 更新操作 update()
- 删除操作 
  - remove 删除指定元素，不存在抛错 keyError
  - discard 删除指定元素，不存在不抛错
  - pop 一次只删除任意元素
  - clear 清空集合
```python
s2=set(range(6))
print(s2)

print(1 in s2)
print(1 not in s2)

# 新增
s2.add(200)
print(s2)  # {0, 1, 2, 3, 4, 5, 200}

# 更新
s2.update([100, 21, 123])
print(s2)  # {0, 1, 2, 3, 4, 5, 100, 200, 21, 123}

# 删除
s2.remove(100)
print(s2)  # {0, 1, 2, 3, 4, 5, 200, 21, 123}
s2.discard(400)
print(s2)  # {0, 1, 2, 3, 4, 5, 200, 21, 123}
s2.pop()
print(s2)  # {1, 2, 3, 4, 5, 200, 21, 123}
s2.clear()
print(s2)  # set()

# 集合之间的关系
ss1 = {1, 2, 3}
ss2 = {1, 2, 3}
print(ss1 == ss2)  # True
print(ss1 != ss2)  # False
print(ss1.issubset(ss2))  # True
print(ss1.issuperset(ss2))  # True
print(ss1.isdisjoint(ss2))  # False


# 集合之间的数学操作
sss1 = {1, 2, 4}
sss2 = {1, 2, 3}
# 交集
print(sss1.intersection(sss2))  # {1, 2}
print(sss1 & sss2)  # {1, 2}

# 并集
print(sss1.union(sss2))  # {1, 2, 3, 4}
print(sss1 | sss2)  # {1, 2, 3, 4}

# 差集
print(sss1.difference(sss2))  # {4}
print(sss1 - sss2)  # {4}

# 对称
print(sss1.symmetric_difference(sss2))  # {3, 4}
print(sss1 ^ sss2)  # {3, 4}
```


### 集合生成式

s={ i for i in range(10) }