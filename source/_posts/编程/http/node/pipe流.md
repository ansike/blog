---
title: http 读 流
categories: 编程
tags:
  - 基础概念
date: 2022-01-08 21:40:45
---
```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((cReq, cRes)=>{
  // 读取文件文件流返回给Res对象处理
  fs.ReadStream('./server.js').pipe(cRes)
})

server.listen(8001);
console.log('服务启动8001');

```
