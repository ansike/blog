---
title: 列表
categories: 编程
tags:
  - python
  - language
date: 2022-09-07 22:36:35
---
### 列表的创建与删除
- 中括号
- 内置函数list()

```python
lst=[1,2,'szxc']
print(lst)

lst2=list([1,2,'xzc'])
print(lst2)
```  
### 查询
- 获取列表元素的索引 index()
- 获取单个元素lst[0]
- 获取列表中的多个元素：切片 lst[start: stop: step]
  - 结果是一个片段的拷贝
  - 数据范围[start, stop)
  - step 默认为1
    - step为正数 start默认列表第一个元素，stop默认列表最后一个元素
    - step为负数 start默认列表最后一个元素，stop默认列表第一个元素

- 判断元素是否在列表中 in, not in
- 遍历列表 for-in

### 增删改查
- 增
  - append 列表末尾添加一个元素
  - extend 在列表末尾至少添加一个元素
  - insert 在列表任意位置添加一个元素
  - 切片 在列表任意位置添加至少一个元素

```python
lst = [1, 2, 3, 4, 5]
lst.append(100)
print(lst, id(lst))  # [1, 2, 3, 4, 5, 100] 1568407185152

# 追加值
lst2 = ['1', True]
lst.append(lst2)
print(lst, id(lst))  # [1, 2, 3, 4, 5, 100, ['1', True]] 1568407185152

# 最后位置增加多个值
lst.extend(lst2)
print(lst, id(lst))  # [1, 2, 3, 4, 5, 100, ['1', True], '1', True] 1568407185152

# 任意的位置插入
lst.insert(1, 20)
print(lst, id(lst))  # [1, 20, 2, 3, 4, 5, 100, ['1', True], '1', True] 1568407185152

# 任意位置增加多个元素
lst[5:] = ['new', 'item']
print(lst, id(lst))  # [1, 20, 2, 3, 4, 'new', 'item'] 1568407185152
```
- 删
  - remove 
    - 一次移除一个元素
    - 重复元素只删除第一个
    - 元素不存在会报错 ValueError
  - pop
    - 删除一个指定索引位置上的元素
    - 指定索引不存在抛出IndexError
    - 不指定索引，删除列表中最后一个元素
  - 切片 一次至少删除一个元素
  - clear 清空列表
  - del 删除列表

```python
lst = [1, 2, 3, 4, 5, 1]
print(lst, id(lst))  # [1, 2, 3, 4, 5, 1] 2151079831296

# 移除1
lst.remove(1)
print(lst, id(lst))  # [2, 3, 4, 5, 1] 2151079831296

# pop
lst.pop(1)
print(lst, id(lst))  # [2, 4, 5, 1] 2151079831296
lst.pop()
print(lst, id(lst))  # [2, 4, 5] 2151079831296

# 切片
nlst=lst[1:2]
print(nlst, id(nlst))  # [4] 2259247206592

lst.clear()
print(lst, id(lst))  # [] 2536412899072

del lst
# print(lst, id(lst))  # NameError: name 'lst' is not defined. Did you mean: 'nlst'?
```
- 改
  - 指定索引赋一个新zhi
  - 为指定切片赋一个新值
```python
lst = [1, 2, 3, 4, 5, 1]
print(lst, id(lst))  # [1, 2, 3, 4, 5, 1] 2151079831296

lst[0] = 100
print(lst, id(lst))  # [100, 2, 3, 4, 5, 1] 2819189270272

lst[1:1] = [21,22,23]
print(lst, id(lst))  # [100, 21, 22, 23, 2, 3, 4, 5, 1] 2819189270272
```

### 排序
1. sort()方法 默认从小到大，可以指定reverse=True 进行降序排序
2. 内置函数sorted() 可以指定reverse=True 进行降序排序
```python
lst = [1, 2, 3, 4, 5, 1]
print(lst, id(lst))  # [1, 2, 3, 4, 5, 1] 1835533231872
nlst = sorted(lst)
print(nlst, id(nlst))  # [1, 1, 2, 3, 4, 5] 1835534291136

lst.sort()
print(lst, id(lst))  # [1, 1, 2, 3, 4, 5] 1835533231872
```

### 列表生成式

[ i for i in range(1,10)]
```python
lst2=[ i for i in range(1,10)]
# [1, 2, 3, 4, 5, 6, 7, 8, 9] 2119767246080
print(lst2, id(lst2)) 
```
