---
title: 分叉
categories: 编程
tags:
  - web3
  - BTC
date: 2022-12-30 20:00:23
---

本系列开始区块链的学习，主要内容为B站上[北京大学肖臻老师《区块链技术与应用》公开课](https://www.bilibili.com/video/BV1Vt411X7JF?p=1&vd_source=22653c02dfbe0c9c7bb4a200eb87fe4e)

什么叫分叉？
由一条链变成多条链 

- state fork
  - forking attack 分叉攻击
  - deliberate fork 故意做出的分叉
- protocol fork 软件升级
  - hard fork
  - soft fork

### 什么是hard fork

区块数量=区块大小/每个交易的大小（1000,000/250 = 4000），所以一个区块大概能写4000个交易
4000/60*10 = 7 tx/sec 每秒7笔交易
所以为了缓解上述的问题，需要修改BTC的协议，增加 block size limit，假设 1M => 4M
hard fork后出现两条链，一条链是原来的1M大小的链，另外一条是4M大小的链。因为4M大小的链还能兼容之前1M的块，所以只要还有旧节点两条分叉会一直存在。

现在的ETH其实就是由原来的一个区块链分出来的一条分叉，另外一条叫ETC。


**分叉之后两条链上的交易是可以互相回放的，怎么避免？**
增加chain id，交易的时候携带chain id可以进行唯一标识


### 什么是soft fork
减少 block size limit，假设 1M => 0.5M

这样在分叉之后旧节点挖出的区块不被新节点认可，但是新节点挖出的区块旧节点认可，那么在新节点算力占很大比例的时候会认为新节点构成的链是最长合法链，旧节点之后再挖出的区块都不会合入到区块链中，也就不会出现永久性分叉。


hard fork和soft fork
分叉之后如果旧节点认为新节点是合法的，那么结果只会出现一条链，那就是软分叉。
系统中全部的节点更新了协议才不会出现分叉，系统中半数以上的节点更新了协议就不会出现分叉。


soft fork 可能的几种情况
1. 扩展coinbase，extra nonce
2. P2SH: Pay to Script Hash

