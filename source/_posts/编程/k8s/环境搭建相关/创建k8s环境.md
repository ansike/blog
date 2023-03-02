---
title: 创建k8s环境
categories: 编程
tags:
  - k8s
date: 2022-08-06 23:59:06
---

### 目标

创建一个 k8s 集群包含三个 node，一个 master，两个子 node
创建 image 为 nginx 的 deployment，直接访问可以返回 nginx 的默认页面。
deployment 会创建三个 pod 会分布到集群中的两个 node 上

{% asset_img k8s-01.jpg k8s 集群安装目标 %}

### 环境要求

借助 virtualbox 做三台虚拟机，规划如下：
系统选择 centos7
k8s 使用最近稳定版本 1.24.3

```yaml
192.168.56.2 master
192.168.56.3 node01
192.168.56.4 node02
```

### 机器之间免密登录

将 `/etc/ssh/sshd_config` 中以下改行进行解注释

```shell
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

AuthorizedKeysFile 指向了客户端的 ssh 生成的公钥在服务器端存放的文件。所以创建该文件`~/.ssh/authorized_keys`,讲客户端生成的.ssh/id_rsa.pub 复制到 authorized_keys 中
id_rsa.pub 生成方式 `ssh-keygen -t rsa` 一路回车即可

### 初始化系统

{% post_link source/_posts/编程/k8s/环境搭建相关/Centos系统初始化 %}

[Centos 系统初始化](../Centos系统初始化)

### 通过 kubeadm 安装 k8s

[k8sKubeadm 部署安装](../k8sKubeadm部署安装)
