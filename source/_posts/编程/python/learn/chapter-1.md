---
title: print和转义字符
categories: 编程
tags:
  - python
  - language
date: 2022-09-07 22:36:35
---

# print 函数使用
```python

# 输出数字
print(520)
print(52.1)

# 输出字符串
print('hello world')
print("hello world")

# 含有运算符的表达式
print(2+1)

# 将数据写入文件
fp = open('print.txt', 'a+')
print('hello world', file=fp)
fp.close()

# 不换行
print('hello', 'world', 'python')

```

# python中的转义字符

```python
# 一次输出中间加换行
print('hello\nworld')
print('hello\tworld')
print('helloooo\tworld')
# 观察两个制表位的空间大小不一致，是因为一个\t是4个字符。第一个'hello\tworld'中第一个o占据了一个空间，\t只能是占三个字符的空间。
# 第二个'helloooo\tworld'字符长度对4取余是0，没有占据制表位的字符，所以第二个实际撑开的空间就是默认的4

# 回车 后边的内容会覆盖之前的内容
print('hello\rworld')

# 退格 会删掉之前的一个字符
print('hello\bworld')

# 转移引号
print('he say \'hello world\'')

# 原字符 不希望print对字符串中的转义字符解析
print(r'he say \'hello world\'')
# 最后一个字符不能是反斜杠
# print(r'he say \'hello world\')
print(r'he say \'hello world\\')

```
