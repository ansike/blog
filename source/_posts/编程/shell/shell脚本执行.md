---
title:  shell脚本
categories: 编程
tags: shell
date: 2021-05-05 22:46:13
---
### 执行顺序
1. 先加载系统环境变量ENV.该变量指定了环境文件(加载顺序通常是/etc/profile,~/.bash_profile,~/.bashrc,/etc/bashrc),依次加载环境文件
2. 开始执行shell
3. 遇到子脚本的时候一般会开启一个新的进程执行子shell

### 执行方式
