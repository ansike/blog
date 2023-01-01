---
title: 匿名性
categories: 编程
tags:
  - web3
  - BTC
date: 2023-01-01 16:07:04
---

本系列开始区块链的学习，主要内容为B站上[北京大学肖臻老师《区块链技术与应用》公开课](https://www.bilibili.com/video/BV1Vt411X7JF?p=1&vd_source=22653c02dfbe0c9c7bb4a200eb87fe4e)

Bitcoin and anonymity

pseudonymity privacy

不同的账户之间可以进行关联，账户和真实世界也可以进行关联

BTC的匿名性没有很好

hide your identity from whom?

### 怎么提高自己的匿名性？
BTC实现匿名
network layer (网络层)匿名比较好解决，多路径转发（因为转发的节点只知道上一个节点在哪不知道源节点），比如TOR（洋葱路由）
application layer (应用层) coin mixing 把各种人混在一起。


### 零知识证明
一方（证明者）向另一方（验证者）证明一个陈述时正确的，而无需透露该陈述是正确的外的任何信息。

比特币账户证明：我是一个账号的拥有者，只需要用私钥发布一个签名，然后让其他人验证即可。

### 同态隐藏

- 如果x,y不同，那么它们的加密函数值E(x),E(y)也不同。
- 给定E(x), 很难推出x的值
- 给定E(x)和E(y)的值，我们可以很容易的计算出某些关于x,y的加密函数值。
  - 同态加法：通过E(x)和E(y)计算出E(x+y)的值
  - 同态乘法：通过E(x)和E(y)计算出E(x*y)的值
  - 扩展到多项式

### 盲签方法
- 用户A提供SerialNum，**银行在不知道SerialNum的情况下返回签名Token**，减少A的存款
- 用户A把SerialNum和Token交给B完成交易
- 用户B拿SerialNum和Token交给银行验证，银行验证通过，增加B的存款。
- 银行无法把A和B联系起来
- 中心化


