---
title: array
categories: 编程
tags: js
date: 2023-09-17 09:42:33
---

### sort 函数
```js
// 猜一下计算结果？？？
[-72,-8].sort()
[-92,-8].sort()


// 1. [-72,-8]
// 2. [-8,-92]
```

原因：默认的排序规则是转换成字符串[comparing their sequences of UTF-16 code units values.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 按位比较字符串的码点
