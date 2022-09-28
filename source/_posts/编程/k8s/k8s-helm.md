---
title: helm安装使用
categories: 编程
tags:
  - k8s
date: 
---

### 为什么需要 helm

没有使用 helm 前我们只能手动的去管理我们的 deployment，svc 等，步骤繁琐且在复杂的容器中部署及管理较为复杂。
helm 可以支持 k8s 中的应用管理（deployment，service 等）可配置，能够动态生成，然后通过调用 kubectl 自动执行 k8s 资源部署
此外通过打包的能力，支持发布的版本进行管理很大程度简化了 k8s 应用的部署和管理

### helm 组件

Helm 客户端：负责 chart 和 release 的创建和管理
v3 版本已经将 tiller 给删除了
本身 client 就可以通过 KubeConfig 直接和 k8s 进行交互

### helm 安装

```shell
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### helm 中比较重要的概念

1. Chart 包。它包含 k8s 集群内部运行应用程序，工具或服务所需的所有资源定义。
2. Repository 仓库。用来存放和共享 charts 的地方。
3. Release 实例。运行在 k8s 中 chart 的一个实例。每个 chart 可以在集群中安装多次，每次安装都是新的 release。

Helm 安装 Charts 到 k8s 集群中，每次安装都会创建一个新的 release，chart 存在于 respository。
