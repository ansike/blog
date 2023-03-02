---
title: 浏览器跨域[cross origin]
categories: 编程
tags: js
date: 2021-12-21 09:33:38
---

就是创建一个文件夹eg:devChromeData

### mac
第二步执行以下命令
```shell
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/ansike/devChromeData
```

微信开发者工具（注意app的名字是否一致）
```shell
open -a /Applications/wechatwebdevtools.app --args --disable-web-security --user-data-dir
```
### windows 
创建该文件夹，右键浏览器快捷键，在目标中追加参数

```shell
--disable-web-security --user-data-dir=C:\path\to\ChromeUserData
```