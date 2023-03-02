---
title: service(svc)
categories: 编程
tags:
  - k8s
date: 2022-08-06 23:59:06
---

### svc 概念

通过 label selector 匹配一组 pod，对外提供服务的一个机制。每个 svc 相当于一个微服务。

svc 会根据 label 去查找 pod，一旦匹配到 pod 中有 svc 中的全部 label，那么就会把 pod 的 ip 写入 svc 中

只提供 4 层负载均衡能力，没有 7 层（主机名和域名）。只能基于 ip 和端口进行转发

### 分类

1. ClusterIp: 默认类型，分配一个 cluster 内部的虚拟 IP
2. headless 是一种特殊的 ClusterIP，不想受
3. Nodeport: 在 cluster 为 service 在每台机器上绑定一个端口，可以通过\<NodeIP\>:NodePort 进行访问
4. LoadBalancer: 在 NodePort 的基础上，借助 cloud provider 创建一个外部的负载均衡器，讲请求转发到 pod 上
5. ExternalName: 把集群外部的服务引入到集群内部来，在集群内部直接使用。

### VIP 和 service 代理

为什么不用 round-robin DNS 做负载？
因为 dns 会缓存，无法切换服务，没有办法做负载均衡

每个 node 运行一个 kube-proxy，kube-proxy 负责为 service 实现了一种 VIP（虚拟 IP）的形式。kubernets 1.14 版本之后代理默认是 ipvs

代理模式的分类

1. userspace
2. iptables
3. ipvs（最新）

4 层负载均衡和 7 层负载均衡是什么？
