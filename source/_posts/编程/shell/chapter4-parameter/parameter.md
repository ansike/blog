---
title: 变量字串
categories: 编程
tags: shell
date: 2021-04-14 00:10:45
---

### 变量字串说明
```shell
#!/bin/bash
parameter=asbcd
# 输出变量的内容
echo ${parameter}

# 返回变量的长度
echo ${#parameter}

# offset从位置开始介入到结尾
echo ${parameter:2}


```
