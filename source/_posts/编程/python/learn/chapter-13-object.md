---
title: 封装，继承，多态
categories: 编程
tags:
  - python
  - language
date: 2022-09-07 22:36:35
---

**面向对象的三大特征**
- 封装：提高程序的安全性
- 继承：提高复用
- 多态：可扩展性和可维护性

### 封装
```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.__age = age  # age 不被外边访问，所以加了__

    def show(self):
        print(self.name, self.__age)


stu = Student('xxx', 12)

print(stu.name)
print(dir(stu))
# 通过该方法读取 私有age
print(stu._Student__age)
stu.show()

# xxx
# ['_Student__age', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'name', 'show']
# 12
# xxx 12
```

### 继承
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def info(self):
        print(f'姓名:{self.name}，年龄:{self.age}')


class Student(Person):
    def __init__(self, name, age, score):
        super().__init__(name, age)
        self.score = score


class Teacher(Person):
    def __init__(self, name, age):
        super().__init__(name, age)

    # 方法重写
    def info(self):
        super().info()
        print(f'我是老师，我的名字是{self.name},我的年龄是:{self.age}')


stu = Student('xxx', 12, 122)
teacher = Teacher('老师', 23)
stu.info()
teacher.info()
# 姓名:xxx，年龄:12
# 姓名:老师，年龄:23
```


### object类
- object类是所有类的父类，因此所有的类都有object类的属性和方法
- 内置函数dir()可以查看指定对象所有属性
- object有一个__str__()方法，用于返回一个对于“对象的描述”，对应于内置函数str()经常用于print()方法，帮助我们查看对象的信息，所以我们经常会对__str__()进行重写

### 多态

```python
class Dog(Animal):
    def eat(self):
        print('狗吃肉')


class Cat(Animal):
    def eat(self):
        print('猫吃老鼠')


class Person:
    def eat(self):
        print('人吃饭')


def fun(animal):
    animal.eat()


fun(Dog())
fun(Cat())
fun(Person())
# 狗吃肉
# 猫吃老鼠
# 人吃饭
```


### 特殊的方法和属性
- __dict__ 获得类对象或者实例对象所绑定的所有属性和方法的字典
- __len__() 通过重写该方法可以让内置函数len的参数可以是自定义类型
- __add__() 通过重写该方法可使自定义对象具有“+”功能
- __new__() 用于创建对象
- __init__() 对创建的对象进行初始化
 
```python
class Student:
    def __init__(self, name):
        self.name = name

    def __add__(self, other):
        return self.name + other.name

    def __len__(self):
        return len(self.name)

stu1 = Student('1111')
stu2 = Student('2222')

print(stu1 + stu2)
# 11112222

print(stu1.__len__()) # 4

```

### 浅拷贝与深拷贝
```python

import copy


class Name:
    pass


class Student:
    def __init__(self, name):
        self.name = name


stu1 = Student(Name())

# 浅拷贝
stu2 = copy.copy(stu1)

print(stu1, stu1.name)
print(stu2, stu2.name)
# <__main__.Student object at 0x00000232CD9B7710> <__main__.Name object at 0x00000232CD9B6AD0>
# <__main__.Student object at 0x00000232CD9B6B50> <__main__.Name object at 0x00000232CD9B6AD0>


stu3 = copy.deepcopy(stu1)
print(stu1, stu1.name)
print(stu3, stu3.name)
# <__main__.Student object at 0x00000232CD9B7710> <__main__.Name object at 0x00000232CD9B6AD0>
# <__main__.Student object at 0x00000232CD9B7850> <__main__.Name object at 0x00000232CD9DE610>
```
