---
title: protocol
categories: 编程
tags:
  - 网络
date: 2022-09-22 22:49:41
---

### Ethernet

![ethernet](./97c13f044de260baf0ed8051091dd251.png)
ethernet 通信的基本单位是 Frame。由头部（header），数据（payload），校验和（checcksum）三部分组成

注意部分

- header（14 bytes） 部分依次是 Destination MAC Address，Source MAC Address 和 EtherType (标识数据包类型，0x0800 代表 IP 包)
- payload（46-1500 bytes）携带的数据
- checksum（4 bytes）验证数据完整性

目前有多种 ethernet 类型在使用，我们常用的就是 ethernetII

header 目的地址可以分为三类：单播地址、多播地址和广播地址。

### IP (Internet Protocol)

一句话介绍：**是一种无连接的点到点的通信协议**

为什么需要 IP 协议？

1. 解决大规模的网络，异构网络的互联互通。
2. 解耦应用层和底层网络技术。基于 ethernet 为 TCP/UDP 等提供服务。

涉及的内容：分组封装，IP 编址，分组转发
IP 分组：首部（20 bytes）和数据部分。
IP 分片：IP 数据包在传输的过程中受 MTU（最大传输单元）的限制会进行数据包的分片传输，导致目标主机之后才会重新组装起来交给下一层协议处理。
IP 首部的 IP Address 是由 4 字节的数字组成，是 IP 协议中核心部分，使用 IP 地址能唯一标识网络中的一台主机。

### TCP（Transmission Control Protocol）

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

### HTTP (Hypertext Transfer Protocol )

一句话介绍：**是一种传输超媒体文档的应用层协议**

http 协议中的内容都是明文，以下我们以一个真实例子来看下 http 协议

```shell
# 访问http请求， 使用curl 打印请求的整个过程
curl http://localhost:4000/blog/programming/%E7%BC%96%E7%A8%8B/%E7%BD%91%E7%BB%9C%E7%9B%B8%E5%85%B3/protocol/ -v

# *   Trying ::1...
# * TCP_NODELAY set
# * Connected to localhost (::1) port 4000 (#0)
#### 请求部分
# > GET /blog/programming/%E7%BC%96%E7%A8%8B/%E7%BD%91%E7%BB%9C%E7%9B%B8%E5%85%B3/protocol/ HTTP/1.1
# > Host: localhost:4000
# > User-Agent: curl/7.54.0
# > Accept: */*
# >
#### 响应部分
# < HTTP/1.1 200 OK
# < X-Powered-By: Hexo
# < Content-Type: text/html
# < Date: Sat, 24 Sep 2022 07:56:02 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# < Transfer-Encoding: chunked
# <
# <!DOCTYPE html>
# <html>
# <head>
#   <meta charset="utf-8">



#   <title>protocol | ASK&#39;s Blog</title>
#   ....
```

**请求部分格式**

```
[method] [path] [protocol/version]
[request header]
empty line
[request body]
```

> 我们在上文的实际报文中是没有[request body]主要是因为我们没有传递 body。⚠️ 切记不是因为我们使用的是 GET 请求，http 协议中 get 和 post 没有本质区别。

以下我们使用了 curl 工具强制使用 GET 方法，携带了 data 进行数据传递，协议是符合预期可以成功发出的。
**网络上说 get 和 post 区别绝大多数都是错误，或者说是没有前提的论述**。在浏览器上 get 确实是无法发送 body 的，但是其他应用是可以的（curl，postman 等）；在 url 中数据的携带也是有限制的；server 接受的 body 大小也是有限制的；安全性更是胡扯，这些都要根据实际情况来看。

```shell
curl -X GET http://localhost:4000/blog/programming/%E7%BC%96%E7%A8%8B/%E7%BD%91%E7%BB%9C%E7%9B%B8%E5%85%B3/protocol/ -v -d '{"a":1}' -H "Content-Type: application/json"
> GET /blog/programming/%E7%BC%96%E7%A8%8B/%E7%BD%91%E7%BB%9C%E7%9B%B8%E5%85%B3/protocol/ HTTP/1.1
> Host: localhost:4000
> User-Agent: curl/7.54.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 7
>
```

**响应部分格式**

```
[protocol/version] [status code] [status message]
[response header]
empty line
[response body]
```

### 为什么计算机中的字节都选择用 16 进制的数进行表示

常见的有 MAC 地址，python 编码之后数据
是为了简洁实用。我们知道一个字节（byte）是 8 位（bit），我们可以选择的范围有二进制，八进制，十进制，十六进制等。二进制会很长不便于肉眼读取，八进制会导致高位不够，十进制会导致结果长度不一，十六进制正好能将一个字节拆分成两个十六进制数。

> 如：10101101 => AD

> DNS 是基于 UDP 传输的
