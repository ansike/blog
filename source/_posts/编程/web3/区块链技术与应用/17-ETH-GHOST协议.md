---
title: GHOST协议
categories: 编程
tags:
  - web3
  - ETH
date: 2023-01-05 00:08:28
---

本系列开始区块链的学习，主要内容为B站上[北京大学肖臻老师《区块链技术与应用》公开课](https://www.bilibili.com/video/BV1Vt411X7JF?p=1&vd_source=22653c02dfbe0c9c7bb4a200eb87fe4e)

ETH将区块的生产时间设置为10几秒可能带来一下的问题
出块时间10几秒，同时由于network layer限制，一个区块发布到其他节点，也需要10几秒的时间从而分叉成为常态
没有被纳入到区块链中的区块在BTC中叫orphan block，ETH中交uncle block。
对于BTC来树由于出块时间较长，上述最长合法链的机制尚可接受。但对曰ETYH来说出块时间太短，分叉成为了常态，上述机制就不再适用了。
对个体矿工尤其不公平，因为大矿厂有能力去制造最长合法链

GHOST协议核心：给挖到orphan block的节点“安慰奖”
1. 对orphan block来说能被加入到最长合法链的uncle空间，可以获得一定的奖励。奖励多少和加入区块的距离成反比，距离越短，奖励越多，距离最多为6代[(2-7)/8*3]。
2. 对于主动把uncle block加入到uncle空间的区块，也可以获得（1/32*3）的奖励

规定的目的
1. 全节点不用维护所有区块的uncle block信息
2. 奖励递减，使得各节点今早包含叔父区块，尽早消灭分叉

### 把uncle block的tx包括进来是，其中的tx是否执行？
不执行，交易有可能重复，并且也不检查uncle block的合法性（值检查uncle block是否是一个合法区块）

### uncle block后面还跟着一串block该怎么办？是否算叔父区块
不算。如果uncle block也给奖励的话会造成forking attack 太便宜了。

### BTC和ETH得到奖励的区别
BTC：block reward和tx fee
ETH：block reward和gas fee
