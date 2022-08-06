---
title: 创建k8s环境
categories: 编程
tags:
  - k8s
date: 2022-07-31 23:39:05
---

### 环境要求

三台机器，一台做 master，两台做 node 节点

借助 virtualbox 做三台虚拟机，规划如下：

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
