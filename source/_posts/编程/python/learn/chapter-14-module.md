---
title: 模块和包
categories: 编程
tags:
  - python
  - language
date: 2023-07-12 00:01:10
---

### 什么是模块
在python中对变量，函数，类等进行包裹的集合

### 自定义模块
python中一个py后缀的文件就是一个模块，名称尽量不要与python自带的标准模块名称相同

导入模块
import 模块名称 [as 别名]
from 模块名称 import 函数/类/变量

```python
# calc.py
def add(a, b):
    return a + b


def div(a, b):
    return a / b

# test.py
import calc

print(calc.add(1, 2))
print(calc.div(1, 2))

from calc import add,div

print(add(1, 2))
print(div(1, 2))
```

### 以主程序的形式执行
使用该变量判断当前代码是否在主程序中运行
```python
if __name__ == '__main__':
    print('calc')
```

### python中的包

包是一个分层次的目录结构，它将一组功能相近的模块组织在一个目录下
**作用：**
  - 代码规范
  - 避免模块名称冲突

**包与目录的区别：**
- 包含__init__.py文件的目录称为包
- 目录里通常不包含该文件

**包的导入**
import 包名.模块名

### 第三方模块的安装及使用

安装：pip install 模块名
使用：import 模块名
