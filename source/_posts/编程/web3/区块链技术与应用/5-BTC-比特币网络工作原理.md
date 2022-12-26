---
title: BTC-比特币网络工作原理
categories: 编程
date: 2022-12-26 23:14:37
---

本系列开始区块链的学习，主要内容为B站上[北京大学肖臻老师《区块链技术与应用》公开课](https://www.bilibili.com/video/BV1Vt411X7JF?p=1&vd_source=22653c02dfbe0c9c7bb4a200eb87fe4e)


应用层 application layer：Bitcoin Block Chain
网络层 network layer：P2P overlay network

比特币网络的设计原则：simple, robust but not efficient.

消息的传输时flooding的方式传播给所有的节点，每个区块的大小上限是1M，大概需要几十秒的时间才能传递到绝大多数的节点。

每个节点维护一个等待上链的交易的集合
该节点监听到A->B的转账交易，就将其写入集合中。
这时如果有一个A->C的double spending，该节点是不会再写入的。
如果该节点监听到区块中有A->B的交易就会将集合中的这笔交易删掉。

