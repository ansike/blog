---
title: bash
categories: 编程
tags: shell
date: 2022-10-12 23:41:20
---

### 常用功能

1. 输入流中读取脚本执行

```shell
echo 'echo "this is receive arg $1"' | bash -s firstarg
# this is receive arg firstarg
```

2. 一键安装脚本实现

```shell
# 使用curl下载到本地之后执行shell脚本
curl http://xxx/install.sh | bash
```
