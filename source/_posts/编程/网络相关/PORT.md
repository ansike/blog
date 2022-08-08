---
title: PORT
categories: 编程
tags:
  - 网络
date: 2022-08-08 23:37:26
---

### port 是什么？

port 是一个逻辑概念，用来程序和服务进行数据交换，标识程序或者服务所在的位置。
port 使用唯一的数字标识，范围为 0-65535

### IP 和 port 关系

port 总是和 ip 一起出现，IP 确定服务所在的物理位置如主机或者服务器，port 确定所在机器上的服务或程序

**以`http://www.google.com`为例，解释服务的访问过程**
浏览器在发出请求时首先会将 google.com 解析为对应的 IP，因为使用了 HTTP 协议，默认使用 port 为 80，此时拿到 IP+PORT 即可找到对应的 server 或程序

### 常见的 port？

80 HTTP
443 HTTPS
21 FTP
22 SSH
25 Email（SMTP）

### port 分类？

0-1023 系统和常见的端口
1024-49151 可被开发者和和公司注册为特殊的服务
49152-655535 作为计算机临时 port 使用
