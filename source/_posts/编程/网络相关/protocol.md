---
title: protocol
categories: 编程
tags:
  - 网络
date: 2022-08-08 22:50:41
---

### TCP（transmission control protocol）

一句话介绍：**是一种面向连接的可靠的传输层协议**

解释上文中的两个关键词
面向连接：clinet 和 server 双方是会有一个会话保持的机制，创建的连接是 socket 连接。
可靠的传输：clinet 和 server 之前进行信息传递时都是准确且正确的。

client 和 server 在通信时通过三次握手建立连接，连接建立之后通过该 socket 进行消息通信，数据的传输过程中 TCP 自己实现了超时重传，sequence number，ack，checksum 等确保消息的有序和正确。

**抓取三次握手的包** wireshark

我们随便找一个 http 的站点 `http://c.biancheng.net/linux_tutorial/12/`

1. 查询域名对应的 IP，每个人可能不一样，也有可能会变动

```shell
ping c.biancheng.net
# IP可能会变
# PING c.biancheng.net.w.kunlunno.com (123.138.67.8): 56 data bytes
# 64 bytes from 123.138.67.8: icmp_seq=0 ttl=54 time=16.311 ms
```

2. 配置 wireshark 过滤器，开始抓包

在过滤器中添加：ip.dst==123.138.67.8 or ip.src==123.138.67.8

```shell
# 发送请求
curl http://c.biancheng.net/linux_tutorial/12/
```

查看 wireshark 中的数据，查找 http 请求，然后查找对应的三次 TCP
![wireshark抓包](./20220922-223635.jpeg)

**三次握手的过程**

1. client 向 server 发起一个 SYN 包，请求建立连接。SYN 包中包含一个 sequence numer 随机数 A。
2. server 收到之后会向 client 发送一个 SYN/ACK 包，表示可以建立连接。SYN/ACK 包中包含一个发给客户端的 ACK=A+1 和一个新的 sequence numer=B。
3. client 收到之后再向 server 发送一个 ACK 的包。ACK 包中包含一个给服务端的 ACK=B+1 和该包的序号为 A+1

为什么 TCP 要三次握手？
三次握手是 client 和 server 双方知道对方收发能力的最少次数。第一次握手，server 知道 client 具有发数据的能力；第二次握手 client 知道 server 有接收数据和发送数据的能力；第三次握手，server 知道 client 有接受数据的能力。

两次握手建立连接会有什么问题：已失效的请求从 client 发到 server，如果仅两次握手建立连接的话，此时 sever 向 client 发送确认之后就会认为当前连接已经建立，一直等待客户端发送数据，这样很多 server 资源就会被浪费。

**四次挥手的过程**

1. 查询域名对应的 IP，每个人可能不一样，也有可能会变动

```shell
ping c.biancheng.net
# 182.89.221.201
```

2. 配置 wireshark 过滤器，开始抓包

在过滤器中添加：ip.addr==182.89.221.201

```shell
# 发送请求
curl http://c.biancheng.net
```

查看 wireshark 中的数据，查找 http 请求，然后查找对应的挥手
![三次挥手](./20220923-225149.jpeg)

此处可以看到该挥手次数和我们理解的不太一样，是**三次挥手**。
猜想我们的连接断开很快有关，client 发送断开连接请求，server 收到之后会把即将发送的断开连接请求和上次的 ACK 进行打包发送减少了一次消息传递，最后 client 收到 server 断开的请求后发送 ACK 然后关闭连接进入 close 状态。（看网上的解释说可能和 TCP 延时机制有关 https://www.cnblogs.com/yunmeng-shi/p/16245827.html）

自己用 http-server 起了一个本地服务，可以看到四次挥手的过程

![四次挥手](./20220923-233327.jpeg)
