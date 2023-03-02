---
title: ETH 状态树
categories: 编程
tags:
  - web3
  - ETH
date: 2023-01-01 23:47:35
---

本系列开始区块链的学习，主要内容为B站上[北京大学肖臻老师《区块链技术与应用》公开课](https://www.bilibili.com/video/BV1Vt411X7JF?p=1&vd_source=22653c02dfbe0c9c7bb4a200eb87fe4e)

ETH的账户的状态树
addr（账户地址）=> state（账户状态）
账户的地址为160bit，40位16进制数

### ETH中账户的状态是怎么存储的？

**思路一**：使用(key, value)的hash table存储addr和state，将hash table组成merkle tree，tree的root hash保存在block header中。

存在的问题：每次出块会有新的交易打包进块中，从而改变merkle tree。但事实上只有一部分的账户发生改变，一部分改变要重写整个tree，有点得不偿失。

为什么BTC没有这个问题呢？因为BTC打包的是交易，数量级没有那么大（一段时间内交易的数量有限，一个区块上限大概是4000个）。而ETH打包账户，数量级呈指数级上升（每次都必须打包所有的账户）

**思路二**：直接使用merkle tree存放账户，要改内容直接改merkle tree，是否可行
存在的问题：merkle没有提供一个高效的查找和更新的方法。

比特币运行方式：每个节点在本地运行一个候选区块（每个节点记录的交易，顺序不一定相同），每个节点去挖矿，去竞争记账权。取得记账权的节点发布的区块中的交易就是被区块链记录的交易。
因为顺序为宜，所以不需要进行排序
为什么ETH不能这么做？因为如果由发布区块的节点发布账户信息，发布的仍然是所有的账户信息，又回到了思路一中的问题。

**思路三**：使用sorted merkle tree 是否可行
新增账户，产生的账户地址是随机的，就需要插入重新排序


ETH中使用的存储方式MPT（merkle patricia tree）结构
引例：trie结构（字典树）

trie特点：
1. 打乱顺序，trie结构不变 （天然排序，即使插入新值也不影响）
2. 具有很好的更新局部性 （更新某一数据不需要遍历整棵树）

trie缺点：存储浪费存取内容效率低（键值稀疏）

解决trie缺点：Patricia Tree（进过路径压缩的树）

{% asset_img mpt.jpg MPT %}
{% asset_img mpt2.jpg 相邻区块的 MPT2 %}

后续区块的节点是直接指向前边共享节点的。

问题：为什么钥保留历史状态，不在原先数据上直接修改
答案：为了回滚，在ETH，分叉是常态，orphan block中的数据都要向前回滚，而用于ETH中的有智能合约，为了支撑只能合约的回滚，必须保持之前的状态。


{% asset_img ETH_header.jpg ETH header %}

以上我们将的都是怎么存key，value是怎么存储的呢？
经过RLP（recursive length prefix）序列化，再存储
