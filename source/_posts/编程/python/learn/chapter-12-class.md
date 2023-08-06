---
title: 类与对象
categories: 编程
tags:
  - python
  - language
date: 2023-07-11 00:28:51
---

```python
class Student:
    native_pace = '阿斯顿'  # 类属性

    def __init__(self, name, age):
        self.name = name  # 实例属性
        self.age = age

    # 实例方法
    def eat(self):
        print("学生在吃饭")

    # 静态方法
    @staticmethod
    def method():
        print("我使用了staticmethod修饰，所以我是静态方法")

    # 类方法
    @classmethod
    def cm(cls):
        print("我使用了classmethod修饰，所以我是类方法")


stu1 = Student('张三1', 12)
stu2 = Student('张三2', 13)
stu1.eat()
print(stu1.native_pace)
print(stu2.native_pace)
Student.native_pace='xxx'
print(stu1.native_pace)
print(stu2.native_pace)
```

