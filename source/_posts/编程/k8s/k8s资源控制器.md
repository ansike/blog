---
title: 控制器说明
categories: 编程
tags:
  - k8s
date: 
---

### 控制器说明

k8s 中内置了很多控制器（controller），控制 pod 的具体状态和行为。

1. ReplicaSet（rs）维持 pod 的副本数目，通过标签（label）去选择 pod
2. Deployment 提供了声明式定义。deployment 创建 rs，rs 创建管理 pod

以上两个一般用来满足无状态服务的诉求。
rs 维持了 pod 中副本的数量，维持的手段时通过 label 选择对应的副本，实时检测 pod 的数目和 replicas 定义的数量是否一致
deployment 则是通过创建 rs 来进行 pod 的管理和维护

所以通过 deployment 描述的资源会同时创建 rs，但是通过 rs 创建的资源不会创建 deployment

3. DaemonSet 确保全部（或一些）Node 上运行一个 Pod 的副本（和 node 相关）
4. Job 负责批处理任务，即执行一次的任务，保证批处理的任务的一个或者个 Pod 成功结束
5. CronJob 基于时间的 Job，给定的时间点只运行一次，周期行的时间点运行
6. StatefulSet 稳定的持久化存储，基于 PVC 实现；稳定的网络标志；有序部署，有序收缩；（有状态服务）
