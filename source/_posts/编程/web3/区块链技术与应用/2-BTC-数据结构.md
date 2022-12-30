---
title: BTC-数据结构
categories: 编程
tags:
  - web3
  - BTC
date: 2022-12-25 22:52:48
---

本系列开始区块链的学习，主要内容为B站上[北京大学肖臻老师《区块链技术与应用》公开课](https://www.bilibili.com/video/BV1Vt411X7JF?p=1&vd_source=22653c02dfbe0c9c7bb4a200eb87fe4e)

BTC中的数据结构包含了 hash points 和Merkle Tree

1. hash pointers
   普通的指针存储的是某个结构体在内存中的地址，hash指针除了要保存地址还要保存结构体的hash值。可以找到结构体的位置还能检测到结构体内容有没有变化。BTC中最基本的结构体是区块链，区块链是一个一个区块组成的链表。
   
   **区块链和普通链表的区别是什么？** hash指针代替普通指针

   区块链中的每个指针都是这样构成的：H(prevPoint + prevContent)，每个区块的hash指针指向前一个区块，这样所有的区块组成的链表就是区块链。使用该数据结构可以实现tamper-evident log（篡改记录证明）。只要某个区块的内容发生变化，后续所有区块的指针都会受到影响。
   > genesis block（创世界块）中没有hash指针，most recent block(最近区块）的hash指针是存在内存中的

   BTC中节点的类型：全节点(full node)，轻节点(light node)
   - full node：**拥有完整区块链账本的节点**，全节点需要占用内存同步所有的区块数据，能够独立校验区块上的所有交易并实时更新数据，负责区块链交易的广播与验证。
   - light node：没有拥有完整区块链账本的节点。比如手机BTC钱包。

2. Merkle Tree
   2.1 一个BTC区块中大约包含了4000多条交易，这么多的交易在区块中是通过Merkle Tree存储的。
   **我们常见的binary tree（二叉树）和merkle tree有什么区别？** hash point代替普通指针
   ![每个区块的数据结构](./btc.jpg)

   2.2 merkle tree最下层就是transaction，以上的部分都是对下层的一个hash计算。两个hash计算新的hash逐层向上直到 merkle root。**只要知道根hash值就能检测树下任意数据的修改。**

   2.3 每个BTC区块分为了两部分：block header, block body
   - block header：
     - Hash point
     - Merkel root hash
     - Nonce
     - version
     - timestamp
   - block body：包含了区块的所有信息（BTC是所有的交易，以太币还包括所有的账户信息）

   2.4 Merkle proof
      BTC网络参与者包括全节点和轻节点，全节点包含了block header和block body，轻节点只包含block header。
      **轻节点如何知道某笔交易是否写入了区块中？**
     只需要向全节点拿到和该交易相关的hash信息就可以逐层向上计算hash直到merkle tree的根，对比轻节点中存储的merkel tree根hash值，相等说明交易已经写入了区块链中。

   区块链挖区块的过程是什么样的？
   Merkle Tree是怎么新增交易的？