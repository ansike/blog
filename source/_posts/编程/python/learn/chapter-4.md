
---
title: 分支结构
categories: 编程
tags:
  - python
  - language
date: 2022-09-07 22:36:35
---

### 对象的bool值
python一切皆对象，所有的对象都有一个bool
获取对象的bool值，使用内置函数 bool()

以下对象的bool值为False
- Flase
- 数值0
- None
- 空字符串
- 空列表
- 空字典
- 空集合
```python
print(bool(False))
print(bool(0))
print(bool(0.0))
print(bool(None))
print(bool(''))
print(bool(""))
print(bool([]))
print(bool(list()))
print(bool(()))
print(bool(tuple()))
print(bool({}))
print(bool(dict()))
print(bool(set()))
```

### 分支结构
- 单分支结构 if
- 双分支结构 if else
- 多分支结构 if elif else
- if语句嵌套
- 条件表达式

```python
money=1000
s=int(input("请输入数值\n12"))
if money>=s:
    money-=s
    print("取款成功，余额为"+str(money))


num=int(input("请输入一个整数"))
if num%2==0:
    print(num, "是偶数")
else:
    print(num, "是奇数")


if num>=90 and num <= 100:
    print("A级")
elif num>=80 and num<=89:
    print("B级")
else:
    print("C级")

# 类似三元
b = 10 if 30 > 20 else 20
print(b) # 10

```
### pass空语句

python不像其他的语言可以写空的代码块，必须要有pass占位

```python
num=int(input("请输入一个整数"))
if num%2==0:
    pass
else:
    pass

```