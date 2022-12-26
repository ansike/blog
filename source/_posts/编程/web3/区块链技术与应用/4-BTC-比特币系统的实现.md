---
title: BTC-比特币系统的实现
categories: 编程
date: 2022-12-24 00:49:19
---

本系列开始区块链的学习，主要内容为B站上[北京大学肖臻老师《区块链技术与应用》公开课](https://www.bilibili.com/video/BV1Vt411X7JF?p=1&vd_source=22653c02dfbe0c9c7bb4a200eb87fe4e)

### 基本名词
区块链：去中心化账本
BTC：基于交易的账本模式（transaction-based ledger）
ETH：基于账户的账本模式（account-based ledger）
UTXO（unspent transaction output）未花费交易输出，由全节点维护。在BTC中没有一个记录所有账户余额的账本。怎么确定一个地址现在的余额呢？我们需要回顾所有的交易，并且找到所有寄给你的btc把他们都加起来。

### 交易中的输入和输出
如A给C转了3BTC，B给C转了2个BTC，这总和为5的BTC就是UTXO。现在C拥有了两笔UTXO，可以当作未来转给别人的input。

如果现在C想把这5BTC转给D，矿工需要验证有没有使用过这笔UTXO，如果已经花过了就会被认为是不合法的交易。这就是BTC组织double spending的方法。


### 挖矿过程的解释

每次挖矿的过程都是一个Bernoulli trail（an experiment with binary output）
每次试nonce求解构成了Bernoulli process（a sequence of independent Bernoulli trait）（无记忆性）

1. 恶意的有记账权的节点写入一个伪造交易的可行性？
因为一个交易必须要转账方的私钥去生成签名，私钥无法拿到也就无法伪造别人的转账记录。

2. 恶意的有记账权的节点发起了double spending attack怎么避免？
A先给B转了10BTC，记录到了一个最近的区块中。A私钥的拥有者此时挖出了新的区块，在新的区块中写了一个新的交易将10BTC转给了自己，此时如果新挖出的区块如果能并入到最长合法链那么该攻击就会生效。
解决方法：B在收到转账成功之后多等几个区块进行确认，也就是等到当前记账的区块后续增加几个新的区块之后再向A确认收到转账。BTC默认是six confirmation。
原因：block chain 是irrevocable ledger的，但是这个这种不可篡改是概率上的，刚写入的区块是容易被篡改的。

3. 恶意的节点就是不记账怎么办？

没有关系，可以等到下一个区块进行记账。BTC一个区块中存储的交易数量为1M。

selfish mining： 自己藏一堆块不发布，攒一段时间之后进行发布。

