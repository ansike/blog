---
title: 函数
categories: 编程
tags:
  - python
  - language
date: 2022-09-07 22:36:35
---

### 函数的创建和调用

def 函数名([参数]):
    函数体
    [return xxx]

```python
def calc(a, b):
    return a + b
print(calc(10, 20))
```
### 函数的参数传递
形参，实参和其他语言一致
**传递方式：**
- 位置实参 calc(10,20)
- 关键字实参 calc(a=10, b=20) 顺序可以调换

### 函数的返回值
多个返回为元组，一个返回为原类型
```python
def main():
    odd = []
    even = []
    for i in range(1, 11):
        if i % 2 == 0:
            even.append(i)
        else:
            odd.append(i)
    return odd, even

print(main())
# ([1, 3, 5, 7, 9], [2, 4, 6, 8, 10])
```
### 函数的参数定义
- 默认参数和其他语言类似，在形参上定义默认值
- 个数可变的位置参数 def func(*args) args为元组
- 个数可变的关键字形参  def func(**args) args为字典

函数定义中个数可变的位置参数和关键字形参都存在时，位置上参数必须放前边
参数中某个位置有*，*之后的参数只能采用关键字参数传递

```python
def func(a, b, c):
    print('a', a)
    print('b', b)
    print('c', c)


lst = [1, 2, 3]
func(*lst)
# a 1
# b 2
# c 3

map = {'a': 12, 'b': 23, 'c': 12}
func(**map)
# a 12
# b 23
# c 12
```

### 变量的作用域
局部变量和全局变量和其他语言类似

有不一样的地方，可以在函数是内部通过global字段标识一个变量为全局变量，这个能力个人感觉不好

### 递归函数

```python
# 阶乘
def main(n):
    if n <= 1:
        return n
    else:
        return n * main(n - 1)


print(main(6))


# 斐波那契数列
# 1，1，2，3，5....
def main(n):
    if n == 1 or n == 2:
        return 1
    else:
        return main(n - 1) + main(n - 2)


print(main(6))
```