
---
title: input，运算符及优先级
categories: 编程
tags:
  - python
  - language
date: 2022-09-07 22:36:35
---

# input 函数
接受用户的输入
```python
iptStr=input('你是谁？')
print('你是：'+iptStr)
```

# 运算符
- 算数运算符
  - 加减乘除 +, -, *, /
  - 特殊的整除 //
    - 注意 9//4 => 2， -9//4 => -3 向下取整
  - 此外还有取余`%`和幂运算`**`
  ```python
    print(9/4) # 2.25
    print(9//4) # 2
    print(9//-4) # -3
    print(9%-4) # 被除数-除数*商 => 9-(-4)*(-3) -3
    print(-9%4) # 被除数-除数*商 => -9-(4)*(-3) 3
  ```
- 赋值运算符
  - 和常规的语言类似
  - 注意的点有一个解包赋值的概念与js中的解构赋值类似 
    - a,b,c=10,20,30。最后a，b，c分别赋值10，20，30
    - 变量交换 a,b=b,a
- bool运算符
  - and, or, not, in, not in
- 比较运算符
  - >,<,>=,<=
  - == 对象value的比较
  - is, is not 对象id的比较
  ```python
    l1=[1,2,3,4]
    l2=[1,2,3,4]
    print(l1==l2) # True
    print(id(l1),id(l2)) # 2489543058880 2489543921216

    a,b=1,1
    print(a==b) # True
    print(a is b) # True 注意python中对于同一个int值的id值是一样的
  ```
- 位运算符
  - &,|,<<,>>


# 运算符的优先级

算术运算符 > 位运算符 > 比较运算符 > bool运算符 > 赋值运算符