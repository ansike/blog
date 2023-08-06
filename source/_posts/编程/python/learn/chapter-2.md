
---
title: 变量和常见数据类型
categories: 编程
tags:
  - python
  - language
date: 2023-07-02 15:41:11
---

# 二进制与字符编码
计算机中存储和使用的内容是字符，但是在运行过程中只能是以二进制的形式进行运算。

# 标识符与保留字
保留字：和其他语言类似指已被python使用的特定的符号

以下就是3.11.4版本的所有保留字
```python
import keyword
print(keyword.kwlist)
# ['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

标识符：说白了就是一个python定义变量，函数，模块等使用的符号
规则：
- 字母，数字，下划线
- 不能以数字开头
- 不能是保留字
- 严格区分大小写

# 变量与数据类型

**变量有三部分组成**
- 标识：对象存储的内存地址，使用内置韩式id(obj)来获取
- 类型：对象的数据类型，使用内置函数type(obj)来获取
- 值：对象存储的具体数据，使用print(obj)来打印
```python
# 标识为name，类型为str，值为xxx
name="xxx"
print(id(name))
print(type(name))
print(name)
# 2291035693488
# <class 'str'>
# xxx
```

**常用的数据类型：**
- 整数 int 213
  - 可以表示正数，负数和0
  - 不同的进制表示默认十进制，0b 二进制，0o 八进制，0x 十六进制
- 浮点数 float 3.14
  - 由正数和小数组成
  - 浮点数计算不精确  使用decimal模块解决
  ```python
    print(1.1+2.2) # 3.3000000000000003
    print(1.1+2.1) # 3.2

    from decimal import Decimal
    print(Decimal('1.1')+Decimal('2.2')) #3.3
  ```
- 布尔 bool true|false
  - 表示真或者假
  - bool值可以转换为整数
  ```python
    print(True+1) # 2
    print(False+1) # 1
  ```
- 字符串 str "xxx"
  - 字符串又被称为不可变的字符序列
  - 可以使用单引号，双引号或者三引号（''',"""）来定义
  - 单引号和双引号定义的字符串必须在一行
  - 三引号定义的字符串可以分布连续的多行，中间的换行符会直接输出

**数据类型转换**
```python
# 三个函数 int(), float(), str()
a=100
b=10.1
c=True
d='hello'
e='10'
f='10.2'
print(type(a),type(b),type(c),type(d),type(e),type(f))

# int 转换
print(type(int(a)),type(int(b)),type(int(c)),type(int(e)))
# 可以看到字符串和浮点数的字符串都无法直接使用int转换
# print(type(int(d))) # 报错 ValueError: invalid literal for int() with base 10: 'hello'
# print(type(int(f))) # 报错 ValueError: invalid literal for int() with base 10: '10.2'

# float 转换
print(type(float(a)),type(float(b)),type(float(c)),type(float(e)))
# print(type(float(d))) # ValueError: could not convert string to float: 'hello'
print(type(float(f)))

# str 转换
print(type(str(a)),type(str(b)),type(str(c)),type(str(e)))
print(type(str(d)))
print(type(str(f)))
```

# 注释
- 单行注释 单个#
- 多行注释 没有单独的多行注释标记 一对三引号之间的代码称为多行注释

