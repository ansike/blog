---
title: ETH 账户
categories: 编程
tags:
  - web3
  - ETH
date: 
---

本系列开始区块链的学习，主要内容为B站上[北京大学肖臻老师《区块链技术与应用》公开课](https://www.bilibili.com/video/BV1Vt411X7JF?p=1&vd_source=22653c02dfbe0c9c7bb4a200eb87fe4e)

ETH的账户类型 account based ledger

**转账**
相对于BTC的账户 transaction based ledger, BTC进行转账交易时需要一次性把所有的BTC都进行发起转账交易，BTC总量大于交易的数量+fee时需要具体说明哪几个BTC转给接收方，然后把剩余的BTC转到自己的账户中，否则会当成小费转给矿工。ETH则不需要制定哪几个ETH。

**查询余额**
BTC需要UTXO中查找对应的账户计算，ETH可以直观的看到。

**account-based模式优缺点**
优点
1. 符合人主观感受，和现行的银行交易类似。
2. 可以防范double spending
缺点
replay attack 重放攻击。攻击的动作：A转给B10个ETH，过一段时间之后B重新把该动作在区块链上重放了一次，其他节点会认为是一笔新的交易将A账户中的ETH再次转给B
解决方案：加nonce（交易次数编号）
因为有nonce编号之后重放的nonce和区块链中已发布的信息就对不上认为是一个不合法的信息。

externally owned account 所有的交易都只能由外部账户发起，不能由合约账户发起
- balance 
- nonce
smart contract account 合约账户
- balance
- nonce （一个合约可以调用另一个合约，因此也要通过nonce记录调用的次数）
- code
- storage


### 为什么要设置ETH这个全新的体系？

智能合约要求有稳定的账户参与。
 