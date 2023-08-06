---
title: 字符串
categories: 编程
tags:
  - python
  - language
date: 2023-07-09 00:18:44
---

### 字符串的驻留机制
仅保留一份且不可变的字符串的方法。不同的值被存放在字符串的驻留池中，python的驻留机制对相同的字符串只保留一份拷贝，后续创建相同字符串是，不会开辟新空间，而是把字符串的地址赋给新创建的变量

如以下三个变量执行的是相同的内存地址
a="a"
b='a'
c='''a'''

### 字符串的常用操作
1. 查询操作
  - index() 查找子串substr第一次出现的位置，如果查找的字串不存在时，抛出ValueError
  - rindex() 查找子串substr最后一次出现的位置，如果查找的子串不存在时，则抛出ValueError
  - find() 查找子串substr第一次出现的位置，如果查找的字串不存在时，返回-1
  - rfind() 查找子串substr最后一次出现的位置，如果查找的子串不存在时，返回-1
2. 大小写转换
  - upper() 全部大写
  - lower() 全部小写
  - swapcase() 大小写调换
  - capitalize() 第一个字符大写，其他小写
  - title() 大驼峰
3. 内容对齐操作
  - center() 居中对齐，第一个参数指定宽度，第二个参数指定填充符，默认是空格，如果设置宽度小于实际宽度则返回原字符串
  - ljust() 左对齐，第一个参数指定宽度，第二个参数指定填充符，默认是空格，如果设置宽度小于实际宽度则返回原字符串
  - rjust() 右对齐，第一个参数指定宽度，第二个参数指定填充符，默认是空格，如果设置宽度小于实际宽度则返回原字符串
  - zfill() 右对齐，左边用0填充，只接受字符串的宽度，如果设置宽度小于实际宽度则返回原字符串
4. 切割字符串
  - split() 
    - 从字符串的左边开始切割，默认的切割符是空字符串，会把字符串切割成一个列表
    - 通过sep指定切割符
    - 通过maxsplit指定切割字符串时的最大切割次数，超过最大值后的子串作为单独的一部分
  - rsplit 从右边开始切割
5. 判断字符串的方法
  - isidentifier() 判断指定的字符串是不是合法的标识符
  - isspace() 判断字符串是否都是空白符组成（回车，换行，制表）
  - isalpha() 是否全是字母
  - isdecimal() 是否全是十进制数字
  - isnumeric() 是否全是数字
  - isalnum() 是否全是字母和数字
6. 字符串替换 replace() 第一个参数指定被替换的子串，第二个指定替换之后的字符串，第三个参数指定替换的最大次数
7. 字符串合并 join() 将列表或元组中的字符串合并成一个字符串

```python
s="ajskdhggjkahgg"
print(s.index('gg'))
print(s.rindex('gg'))
print(s.find('gg'))
print(s.rfind('gg'))
# 6
# 12
# 6
# 12

# 大小写
s = "hello woRld"
print(s.upper())
print(s.lower())
print(s.swapcase())
print(s.capitalize())
print(s.title())
# HELLO WORLD
# hello world
# HELLO WOrLD
# Hello world
# Hello World

# 内容对齐
s = "hello world"
print(s.center(20))
print(s.ljust(20))
print(s.rjust(20))
print(s.zfill(20))
#     hello world
# hello world
#          hello world
# 000000000hello world

# 字符串切割
s = "hello world"
print(s.split())
print(s.split(sep='o'))
print(s.split(sep='o', maxsplit=1))
# ['hello', 'world']
# ['hell', ' w', 'rld']
# ['hell', ' world']

# 字符串组成判断
s = "hello world"
s1 = '1232354'
s2 = 'asda1232354'
s3 = '' \
     '    '
print(s.isidentifier()) # 合法的标识符是字母数字下划线
print(s3.isspace())
print(s.isalpha())
print(s1.isdecimal())
print(s1.isnumeric())
print(s2.isalnum())
# False
# True
# False
# True
# True
# True

# 字符串替换
s = "hello world wll azz"
print(s.replace('ll','xx'))
print(s.replace('ll','xx',1))
# hexxo world wxx azz
# hexxo world wll azz

lst=['1','b']
print(''.join(lst))
# 1b
```

### 字符串的比较
- 运算符 >,<,>=,<=,==,!=
- 比较规则 从头开始依次比较字符串
- 比较原理 字符串比较的是原始值，调用内置函数ord可以得到指定字符的ordinal value（ASSCII）

### 字符串的切片操作
字符串是不可变类型，不具备增删改等操作，切片操作将产生新的对象

# 字符串切片

```python
# 字符串切片
s = "hello world wll azz"
print(s[6:])
print(s[:5])
print(s[:5:2])
# world wll azz
# hello
# hlo
```

### 格式化字符串
1. %占位符 
2. {}占位符
3. 模板字符串 f

```python
name = 'xxx'
age = 12
print('我是%s, 今年%d' % (name, age))
print('我是{0}, 今年{1}'.format(name, age))
print(f'我是{name}, 今年{age}')
# 我是xxx, 今年12
```

### 字符串的编码转换

```python
s = '海上生明月'
# 编码
print(s.encode(encoding='GBK'))  # 一个中文两个字节 b'\xba\xa3\xc9\xcf\xc9\xfa\xc3\xf7\xd4\xc2'
print(s.encode(encoding='UTF-8'))  # 一个中文三个字节 b'\xe6\xb5\xb7\xe4\xb8\x8a\xe7\x94\x9f\xe6\x98\x8e\xe6\x9c\x88'

# 解码
byte = s.encode(encoding='GBK')
print(byte.decode(encoding='GBK'))  # 海上生明月
```
