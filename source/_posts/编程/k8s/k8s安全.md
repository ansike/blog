---
title: k8s安全
categories: 编程
tags:
  - k8s
date: 2022-09-28 10:38:51
---

api server 是 k8s 集群中的核心逻辑

使用 https 认证

证书颁发
kubelet 首次访问 api server 使用 token 做认证，通过之后 controller manager 会为 kubelet 生成一个证书，以后的访问都是用证书做认证。

kubeconfig 包含集群参数（CA 证书，API 地址）

ServiceAccount
pod 中容器访问 api server 的中间件，因为 pod 是动态创建和销毁的所以为 pod 手动的生成证书不太可能了，k8s 使用 service account 解决 pod 访问 API server 的认证问题

RBAC (Role-Based-Access-Control) 基于角色的访问控制

Role: 定义一个角色可以关联一些资源的权限
ClusterRole
RoleBinding
ClusterRoleBinding
