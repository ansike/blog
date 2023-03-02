---
title: BTC-密码学原理
categories: 编程
tags:
  - web3
  - BTC
date: 2022-12-25 22:52:48
---
BTC(bitcoin)
本系列开始区块链的学习，主要内容为B站上[北京大学肖臻老师《区块链技术与应用》公开课](https://www.bilibili.com/video/BV1Vt411X7JF?p=1&vd_source=22653c02dfbe0c9c7bb4a200eb87fe4e)

加密货币 crypto currency
加密货币不加密：区块的地址，转账金额都是公开的

比特币用到了密码学中的两个能力：哈希，签名

1. 哈希函数（cryptographic hash function）重要的性质
   - collision resistance（抗碰撞）。
   不同的输出产出相同的结果。即x不等于y但是H(x)=H(y)说明发生了hash碰撞。该碰撞是不可避免的因为输入空间大于输出空间。但是哈希碰撞无法人为制造，无法验证
   该性质的作用：对一个message求digest
   对message取m，m的hash值是H(m)=digest，如果有人想改m而使H(m)不变，这点是做不到的。
   - hiding（不可逆）。
   计算过程事单向不可逆的，即从H(m)中无法推断出m的值。
   hiding性质前提是输入空间足够大，分布比较均匀。如果不足够大，一般在message后边拼接一个随机数，如H(x||nonce)。
   - puzzle friendly 值hash值的预算是不可预测的。比如hash值是000..00xx..xx，无法知道哪个值更容易算出这个结果，还是需要一个一个带入计算。
   比特币的挖矿的过程其实就是找一个nonce的过程，nonce和区块的头里的信息合一起作为输入，得出的hash值要小于等于某个指定的目标预值。H(block header)<=target。block header块头里有很多域，其中一个域是可以设置的随机数nonce，挖矿的过程是不停的试随机数，使block header取hash落在指定的范围。
   puzzle friendly是指挖矿过程没有捷径，为了使值落在一个指定范围内，只能一个一个去试。所以这个过程可以作为工作量的证明（proof of work）。
   挖矿很难，验证很容易(difficut to solve, but easy to verify)。
   比特币中使用的hash函数是SHA-256 (secure hash algorithm)

2. 签名
比特币中开户其实就是创建一个公私钥对（public key, private key）。非对称加密RSA，加密用接收方的公钥，解密使用私钥。签名中私钥进行签名，公钥进行验证。

**私钥，公钥，钱包地址，数字签名之前的关系**
1. 私钥是随机生成的（256位二进制数字），公钥是通过私钥与椭圆曲线计算出来的，钱包地址是公钥通过hash函数计算出来的。
2. 数字签名是由交易信息+私钥计算出来的，因为数字签名隐含私钥信息，所以可以证明自己的身份。

**作用区别**
公私钥可以互相解密对方加密的数据。
1. 公钥加密，私钥解密。公钥公开，所有人都可以加密，加密的message只有发送方和接收方可以知道。
2. 私钥签名，公钥验证。并没有解出message，只是验证了该message确实是私钥的拥有者生成的。
   签名生成方式：signature=encrypt(privateKey, hash(message))。该签名是公开的，所有人都可以拿到signature和message来验证message确实是来自私钥的拥有者发出的。
   签名验证方式：decrypt(publicKey, signature) === hash(message)。签名的验证实质是拿公钥对签名进行解密，解密产出的值等于hash(message)即说明message没有被串改。



