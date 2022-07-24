---
title: docker镜像制作及使用
categories: 编程
tags:
  - node
  - docker
  - k8s
---

环境依赖：Docker version 20.10.7, build f0df350； node 14 以上；minukube v1.26.0

### 目标

1. 用 node 编写一个简单的 http 服务
2. 编写 Dockerfile，生成 docker 镜像
3. docker 镜像上传至远程 repository 中
4. 本地 docker run 镜像使用
5. 本地 k8s run 镜像使用

### 简单的 http server

这块儿没有太多好讲的，就是启动一个 http server，监听请求进行响应

```javascript
const http = require("http");
const port = process.env.port || 8080;

console.log("port", port);
console.log("env", process.env.env);

const app = http.createServer((req, res) => {
  console.log("access", req.url);
  res.end(JSON.stringify({ url: req.url, headers: req.headers }));
});

app.listen(port);
console.log(`server start on ${port}`);
```

### 编写 Dockerfile，生成 docker 镜像

镜像选择一定要考虑清楚，如不考虑极有可能造成最后打包的产物很大。

```
# 基于node:14-buster-slim镜像产出当前镜像，可以认为该镜像时较为纯净的包含node运行环境的镜像
FROM node:14-buster-slim

# 设置当前服务在镜像中的目录
WORKDIR /usr/app

# 讲当前环境的文件拷贝到镜像文件中
COPY . .

# 设置环境变量
ENV port=8080\
  env=production

# 对外暴露8080端口
EXPOSE 8080

# 镜像启动默认执行的命令
CMD node index.js
```

基于以上的 dockerfile，我们可以使用 docker 命令去生成一个镜像

```shell
docker build -f Dockerfile -t test-docker-node:v1 .

# 可以看到新生成的镜像
docker images | grep test-docker-node
# test-docker-node        v1        05322a8908ad   4 hours ago     183MB
```

### docker 镜像上传至远程 repository 中

将本地的镜像上传到远端是需要重新 docker tag 的
没有 repo 的话可以自己去注册一个，完全免费：https://hub.docker.com/repositories
以我自己的 repo 为例

```shell
# 先登录
docker login
# 修改tag， 我的镜像源 hots+path 是 ansike/ansike
docker tag test-docker-node:v1 ansike/ansike:test-docker-node-v1
# 推送到远端
docker push ansike/ansike:test-docker-node-v1
# 当然也可以拉到本地
docker pull ansike/ansike:test-docker-node-v1
```

### 本地 docker run 镜像使用

```shell
docker run \
--name=test-docker-node \
--env=port=8080 \
--env=env=production \
-p 8080:8080 -t ansike/ansike:test-docker-node-v1 /bin/sh -c 'node index.js'
# 既可以使用刚上传远端的镜像，也可以使用本地的镜像
# -p 8080:8080 -t test-docker-node:v1 /bin/sh -c 'node index.js'
```

此时本地可直接访问 http://localhost:8080 查看数据

### 本地 k8s run 镜像使用

minikube 的安装使用 https://minikube.sigs.k8s.io/docs/start/

```shell
# minikube 装好之后先start基础服务
minikube start
# 创建自己服务的 deployment
kubectl create deployment node --image=ansike/ansike:test-docker-node-v1
# 暴露当前服务 类型为NodePort， 端口为8080
kubectl expose deployment node --type=NodePort --port=8080
# 开启本地和k8s集群端口映射
kubectl port-forward service/node 3001:8080
```

此时本地可直接访问 http://localhost:3001 查看数据

相关代码都可以从这儿找到 https://github.com/ansike/docker-node/tree/pure
