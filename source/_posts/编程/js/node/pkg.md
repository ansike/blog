---
title: node 二进制包
categories: 编程
tags:
  - node
  - bytecode
date: 2022-09-29 08:05:41
---

### 什么时候需要将 node 应用编译成二进制包

希望交付给用户一个无需开箱，无需安装任何依赖即可直接使用其能力的包。

### 怎么生成二进制包

我们可以通过 node 中 pkg 将 node 应用或者脚本进行二进制编码，生成多平台（linux，macos，windows 等）包。
**使用方式**

1. 命令式

```
script: pkg index.js -t node16 --out-dir=dist
```

2. 声明式

```
script: pkg .
# package.json
pkg:{
  assts:[],
  target:[]
}
```

**有一些 case 需要注意**

- pkg 目前（）只支持 commonjs 的包。如果是 esm，需要转换为 commonjs 包之后再使用 pkg 打包，否则会造成打包失败。（esm 可以在删掉 package.json 中的"module"标识之后使用@xxx/ncc 进行转换）
- 打包之后启动包没有办法使用，可以在打包时加 `--debug` 输出打包过程的日志，查看是否有错误

### 一键式安装脚本

我们在安装一些软件时通常只需要一条命令即可完成安装，我们也可产出自己的 install.sh。

```shell
curl -O- https://xxx/install.sh | sh
```

**以下为 demo 命令的安装示例**

```shell
# install.sh
#!/usr/bin/dev bash
set -e
# TODO 判断是否存在某个命令
if [ type curl ]
then
  curl -o https://xxx/demo-linux
elif [ type wget ]
then
  curl https://xxx/demo-linux
else
  echo "无法下载安装需要的二进制文件，请至少安装一个下载工具：wget|curl"
  exit 1
fi

mv demo-linux /usr/local/bin/demo
chmod +x /usr/local/bin/demo
echo "✅demo[$(demo -v)]已经完成安装，请使用$(demo -h)查看更多使用"
```

**卸载脚本**

```shell
# uninstall.sh
#!/usr/bin/dev bash
set -e
# TODO 判断是否存在某个命令
if [ type demo ]
then
  rm -rf /usr/local/bin/demo
  echo "✅demo已经完成卸载"
else
  echo "⚠️ demo不存在，无需卸载"
fi
```
