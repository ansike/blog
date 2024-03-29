---
title: web3 思考
categories: 编程
tags:
  - web3
date: 2023-03-23 00:05:55
---

在经过半年的时间对其中的很多概念有了大致的了解之后再次看[这篇文章](https://ethereum.org/en/web3/)，再次思考其中的几个命题

# 重新思考什么是web3？
要想讲清楚什么是web3，就必须知道什么是web以及web1和web2。
我们常说的web其实正确的来说叫万维网（world wide web），是一个透过互联网访问的，由许多互相链接的超文本组成的信息系统。一般来说浏览器及web服务都属于web的范畴，其中核心的几个关键词是：browser、HTML、HTTP等

web1 受限于技术，产品发展的进程只能呈现一些**文字的一些内容**；
web2 在基础设施和web用户增多之后在内容形式上有了很大的突破，数据从原来的仅文字转变到**图片+音视频**，内容产生也从网站所有者到**全民生产**的状态；
web3 随着内容的丰富，web用户的增多，对于数据的把控有了更高的诉求。web3更多的是一种愿景，用户可以对自己生产内容有完全的把控。

最后用一句话解释：**web3 是用户对数据有完全控制权的一个愿景。**

### 思考：一个手机应用属于web范畴吗？
回答该问题前提：浏览器属于web范畴，这个是毋庸置疑的，因为我们web的信息就是通过浏览器来对用户进行呈现的。
然后辩证的来看这个问题：
- 不属于web的范畴。如果说因为它内部使用了HTTP协议和服务端进行通信就判定属于web的其实也不完全合理。因为如果需要的话手机完全可以接管TCP协议来自己实现数据通信，协议的使用与否是不能作为对web范围做判定的依据；
- 属于web的范畴。现在很多手机应用内部都已经内嵌了webview，甚至还有一些小程序，这些都是web的协议栈进行开发，从这个角度看完全属于web应用，毕竟这些手机应用有点像套壳的浏览器了。

