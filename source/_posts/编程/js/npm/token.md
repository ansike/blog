---
title: npm token
categories: 编程
tags: js
date: 2022-11-29 18:59:22
---

### npm 使用 token 发版

```shell
# 生成Token: 该token只有在生成的时候能获取到，token list里面只能看到截取到的token信息，如果Token需要重复使用，请自行存储
npm token create [--read-only] [--cidr=list]

# 删除Token
npm token revoke <id|token>


# 创建.npmrc文件，将以下代码放到文件中
registry=http://registexxx/
//registexxx/:_authToken=xxx
# //registexxx/:_authToken=${NPM_TOKEN}
```

