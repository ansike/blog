---
title: 实现类似 node中util.promisefy的实现
categories: 编程
tags:
date: 2021-05-05 17:24:39

---

分析需求：
1. promisefy将异步回调的nodejs的api fn改成了promise fn
2. 传入一个fn，返回一个新的fn，且新的fn执行的时候返回一个promise
3. 发现所有的nodejs的api的回调函数参数格式一致(error, content)=>{}

```javascript
const fs = require("fs");
const path = require("path");
const util = require("util");

// 将异步回调改为promise
const promisefyReadFile = util.promisify(fs.readFile);
promisefyReadFile(path.resolve(__dirname, './data.txt'), 'utf-8').then(res => {
  console.log(res);
})
```
```javascript

function customPromiseFy(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      // 注意
      const widthCallBackArgs = [...args, function (error, content) {
        if (error) reject(error);
        resolve(content)
      }]
      fn.apply(fn, widthCallBackArgs);
    })
  }
}

const promisefyReadFile = customPromiseFy(fs.readFile);
promisefyReadFile(path.resolve(__dirname, './data.txt'), 'utf-8').then(res => {
  console.log(res);
})
```

