---
title: deployment和svc实验
categories: 编程
tags:
  - k8s
date: 2022-08-08 00:00:02
---

### 目标

实现 4 种 svc 的 demo

```shell
kubectl get svc

NAME              TYPE           CLUSTER-IP     EXTERNAL-IP        PORT(S)        AGE
kubernetes        ClusterIP      10.96.0.1      <none>             443/TCP        8h
myapp-clusterip   ClusterIP      10.108.249.7   <none>             80/TCP         13m
myapp-headless    ClusterIP      None           <none>             80/TCP         13m
myapp-nodeport    NodePort       10.104.3.44    <none>             80:31515/TCP   31m
mysvc-1           ExternalName   <none>         ansike.github.io   <none>         31m
```

### 步骤实现一个 server，需要操作步骤

- 创建 backend 的 deployment，副本数为 3
- 创建一个 service，指向 backend 的服务
- 将服务对外暴露

**外部可以访问当前暴露服务的实现原理**

1. 创建 service 时 kubectl 向 apiServer 发送创建 service 的命令，apiServer 将数据存储到 etcd 中
2. kubernetes 中每个 node 都有一个叫 kube-proxy 的进程，该进程负责感知 service 和 pod 的变化，并将变化的信息写入 ipvs 中
3. ipvs 使用 nat 技术将 virtual 的流量转至 endpoint 中

### 为什么需要无头服务？

1. 客户端想要和指定的的 Pod 直接通信，在集群内部可以通过[serviceName].[namespace].svc.cluster.local直接访问服务
2. 开发人员希望自己控制负载均衡的策略，不使用 Service 提供的默认的负载均衡的功能，或者应用程序希望知道属于同组服务的其它实例。

### CNAME 和 A 记录分别是什么意思？

A: Address 记录。域名和IP之间的映射关系。通过A记录可以将主机名或域名解析到对应的 IP 地址。如我们/etc/hosts 文件中配置的 host 解析。
CNAME: 别名记录。域名和域名之间的映射关系。如访问www.baidu.com实际上会转发到www.a.shifen.com上。
MX: 邮件交换记录。发送电子邮件时服务器地址
NS: 解析服务器记录。表明由哪台服务器对域名进行解析。NS 记录只对子域名生效，NS 优先级高于 A 记录

**A 和 CNAME 使用场景:**

1. CNAME 适用于大型站点多多负载

CNAME 将多个地址映射到一个地址，这个地址再根据 A 记录进行实际 IP 地址的映射。A 记录优先级高于 CNAME

- 服务器发生变更之后，需要同步修改多个域名的 A 记录。如果有 CNAME 的话，只需修改 CNAME 对应服务器的解析就可以。
- 降低多域名、多服务器、多业务的运维成本

2. A 记录适合场景单一的业务 IP 不经常变动，不需要输入 www 也可访问对应的服务。

### 代码位置

https://github.com/ansike/k8s-script/tree/main/experiment/exp1
