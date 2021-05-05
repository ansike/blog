---
title: select语法
categories: 编程
tags:
date: 2021-04-10 13:09:02

---

### 基础语法
```shell
#!/bin/bash
PS3="`Pls input the num you want`"
select item in a b c
do
  echo $item
  # 不显式退出，程序不会退出
  exit 0
done
```