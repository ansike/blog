---
title: 字典
categories: 编程
tags:
  - python
  - language
date: 2022-09-07 22:36:35
---
### 字典的概念
类似于java和js中的map

### 字典操作

1. 创建字典可以通过花括号语法以声明的方式创建，也可以通过dict函数通过命令的方式创建


```python
# 声明式创建字典
map = {'a': 1, 'b': 2}
print(map, id(map))

# 命令式创建字典
map2 = dict({'a': 1, 'b': 2})
print(map2, id(map2))
```

2. 获取字典内容
- []语法 map['xxx'] 值不存在会抛出异常 keyError
- get()方法 map.get('xxx') 值不存在会返回None， 可以通过参数设置上默认的值

```python
map2 = dict({'a': 1, 'b': 2})
print(map2['a'])
print(map2.get('a'))
# print(map2['c']) # 会抛错
print(map2.get('c', 'xxx')) # xxx
```

3. key 判断
key是否在字典中存在 in，not in

3. 获取字典视图
- keys 获取所有的key
- values 获取所有的value
- items 获取字典中所有的key,value对
```python
map2 = dict({'a': 1, 'b': 2})
print(map2.keys(), id(map2))
print(list(map2.keys()), id(map2))
print(map2.values(), id(map2))
print(map2.items(), id(map2))
```

4. 字典遍历
```python
for item in map2:
    print(item, map2[item])
```

### 字典生成式
拥有keys和values可以通过zip生成一个map
{ key: value for key, value in zip(keys, values) }
```python
keys = ['a', 'b', 'c']
values = [1, 2, 3]
map3 = {key: value for key, value in zip(keys, values)}
print(map3) # {'a': 1, 'b': 2, 'c': 3}
```
