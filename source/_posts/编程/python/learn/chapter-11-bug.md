---
title: 函数
categories: 编程
tags:
  - python
  - language
date: 2023-07-11 00:28:51
---

### 分类
- SyntaxError
- IndexError 索引错误
- KeyError 映射中没有键
- NameError 未声明/初始化对象
- ValueError 传入无效的参数
- ZeroDivisionError 除/模 0

### 异常处理机制

try-except
可以有多个except

try-except-else-finally
excpety和else二者仅执行一种

```python
try:
    a = int(input("请输入一个整数"))
    b = int(input("请输入另一个整数"))
    c = a / b
    print(c)
except ValueError:
    print('参数必须是整数')
except ZeroDivisionError:
    print('被除数不能是0')
except BaseException as e:
    print('未知异常', e)
else:
    print('else')
finally:
    print('done')
# 请输入一个整数1
# 请输入另一个整数2
# 0.5
# else
# done
# -------- 第二种
# 请输入一个整数1
# 请输入另一个整数0
# 被除数不能是0
# done

# 异常写入日志
import traceback
try:
    print(10/0)
except:
    traceback.print_exc()
```


### PyCharm的调试模式

