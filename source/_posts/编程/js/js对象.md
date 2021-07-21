---
title: js对象
categories: 编程
tags: js
date: 2021-05-05 17:24:39

---
### 对象的属性
ECMAScript中有两种属性: 数据属性和访问器属性
- 数据属性
\[[Configurable]] 能否删除,能否修改属性的特性,能否修改为访问器属性 默认为true
\[[Enumerable]] 能否for-in枚举 默认为true
\[[Writable]] 能否修改属性的值 默认为true
\[[value]] 当前属性的值 默认为undefined

- 访问器属性
\[[Configurable]] 能否删除,能否修改属性的特性,能否修改为数据属性 默认为true
\[[Enumerable]] 能否for-in枚举 默认为true
\[[Get]] 能否修改属性的值
\[[Set]] 当前属性的值

- 注意
\[[Configurable]]一旦被置为false之后,将不可能改为true
writable,value和get,set互斥,同时设置可能会报错
[codepen查看例子](https://codepen.io/ansike/pen/poPWvQY?editors=1111)

### 创建一个对象
1. new Object()
2. Object.create()
3. 构造函数创建

常见面试题
- 新建对象时new的必要性
  new 构造函数创建的对象可以将实例标识为一种特定的类型. 换句话说 `(Sub instanceof Super) === true`
- new的过程发生了什么
1. 创建一个新的对象
2. 将构造函数的作用域赋值给新对象 
3. 执行构造函数(可能会给新对象添加属性)
4. 返回新的对象
追加: <b>构造函数有返回值且值是对象的情况下,new返回的其实构造函数返回的对象.</b>

### 对象继承
n中继承方式
最需要关注的寄生组合式继承
本质: copy父的原型,赋值给子的prototype,实例化子对象时执行父的constructor,
父亲的原型在一个新的对象中,且父的构造函数只会执行一次.