---
title: URLSearchParams constructor
categories: 编程
tags: js
date: 2021-05-05 17:24:39

---


## Quick Start
URLSearchParams是URL的一个属性的返回的构造函数

### constructor
``` javascript
/**
 * params：（param）
 * url查询字符串    eg:'?s=url',location.search
 * 查询字符序列     eg:['s', 'url'], ['someId', 1]]
 * 查询键值对象     eg:{"s": "url", "someId": 2}
 * return 一个人 URL实例
 */  
new URLSearchParams(param);
```

### Function

1. append()     追加参数params.append('from', 'zxx');
2. delete()     删除已存在的参数params.delete('from');
3. entries()    返回查询参数们的迭代器对象，可以使用for of循环
4. forEach()    forEach(callback), callback = (value,key){}
5. get()        params.get('s');
6. getAll()     params.getAll('s');
7. has()        params.has('s') == true;    // true
8. keys()       返回一个key迭代器对象
9. values()     返回一个value迭代器对象
10. set()       有则替换，无则加冕。params.set('s', 'css世界');
11. sort()      所有键/值对就地排序,稳定的排序算法
12. toString()  输出字符串

``` javascript
var searchParams = new URLSearchParams('c=4&a=2&b=3&a=1'); 
// 键值对排序
searchParams.sort();
console.log(searchParams.toString());    // 结果是：a=2&a=1&b=3&c=4
```