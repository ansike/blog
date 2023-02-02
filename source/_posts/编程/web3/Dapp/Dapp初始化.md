---
title: Dapp初始化
categories: 编程
tags:
  - Dapp
date: 2023-02-02 23:38:27
---


### 1. 创建账户 使用钱包metamask
安装地址：https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn

### 2. 使用`ganache`启动本地区块链

https://trufflesuite.com/ganache/
https://github.com/trufflesuite/ganache#readme

```shell
yarn add -g ganache
ganache
```
启动之后会默认创建10个账户每个账户充值有1000ETH

{% asset_img 20230202-210545.jpg ganache %}

### 3. 在metamask中
在钱包中配置本地的区块链

{% asset_img 20230202-213346.jpg 配置本地网络 %}

获取第二步生成的私钥，导入账户
{% asset_img 20230202-214805.jpg 导入第二步生成的账户 %}

### 4. 引入`web3.js`开始操作

https://learnblockchain.cn/docs/web3.js/getting-started.html
https://web3js.readthedocs.io/en/v1.8.2/getting-started.html

- ##### 在页面中引入script标签

项目参考地址：https://github.com/ansike/dapp/

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.8.2/web3.min.js"></script>
<script>
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  // 获取当前区块数量
  web3.eth.getBlockNumber().then((res) => {
    console.log("blockNumber", res);
  });
</script>
```
- ##### 使用cra创建项目中引入 web3

```javascript
import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";

console.log(Web3.givenProvider);

const web3 = new Web3((window as any).web3.currentProvider || "http://127.0.0.1:8545");
function App() {
  const [curAccount, setCurAccount] = useState<string>("");
  const [desAccount, setDesAccount] = useState<string>("");
  useEffect(() => {
    getCurAccount();
  }, []);

  const transMoney = async () => {
    web3.eth
      .sendTransaction({
        from: curAccount,
        to: desAccount,
        value: web3.utils.toWei("1", "ether"),
      })
      .then(function (receipt) {
        console.log("transaction done", receipt);
      });
  };

  const getCurAccount = async () => {
    let accounts = await web3.eth.getAccounts();
    
    if (!accounts.length) {
      accounts = await web3.eth.requestAccounts();
    }
    console.log('linked account：',accounts);
    setCurAccount(accounts[0]);
  };
  return (
    <div className="App">
      <p>{curAccount}</p>
      <input
        type="text"
        value={desAccount}
        onChange={(e) => setDesAccount(e.target.value)}
      />
      <button onClick={transMoney}>transform</button>
    </div>
  );
}

export default App;
```

**在用script直接引用web3和通过npm导入web3有坑**

- script引用：const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
- npm引用：const web3 = new Web3((window as any).web3.currentProvider || "http://127.0.0.1:8545");
只有这样设置再调用requestAccounts时才能和metamask连接