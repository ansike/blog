---
title: k8s入门
categories: 编程
tags:
  - k8s
---

### 基础概念

deployment: 管理pod资源
service: 
- 提供固定IP。pod可以随时启停，pod对应的ip可能随时变化。service可以提供固定IP，便于其他服务通过service ip找到提供服务的pod
- 提供负载均衡。如随机访问，基于clinetIp的session affinity
- 服务发现。集群内部的其他服务可通过service name访问（DNS），也可通过环境变量
node: 物理机或虚拟机
pod: 运行应用的载体

### 快速发布一个可用的服务

https://minikube.sigs.k8s.io/docs/start/

基于minikube，安装完成之后，创建deployment，即可发布服务





