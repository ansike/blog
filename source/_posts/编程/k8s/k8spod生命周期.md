---
title: k8s pod生命周期
categories: 编程
tags:
  - k8s
date: 2022-07-31 23:39:05
---

### init container

于 pod 启动前的容器，可以在此时做数据，文件的初始化，做基础服务的依赖检测。

initC 容器可以有多个，多个容器之间串行执行，执行完成之后才开始主容器的运行

**该 demo 展示了一个容器依赖两个服务的启动**

**1. 启动 pod**

观察 pod 的状态一直处于 init 的状态，这是因为依赖的两个服务还没有启动

```shell
# 初始化pod
kubectl apply -f /home/ansike/ansike/k8s-script/pod/initc/node-initc.yaml
# 获取pod
kubectl get pods
# NAME   READY   STATUS     RESTARTS   AGE
# node   0/1     Init:0/2   0          6s
```

**2. 启动第一个服务：myservice**

启动之后需要等几十秒看 Init 的状态变成 1/2 了说明当前服务一个被 initC 检测到了
检测的方式其实很简单，就是用了 nslookup，向 k8s 的 coredns 进行了域名解析查询。
因为每一个服务启动之后都会向 k8s 进行域名注册

```shell
# 初始化服务
kubectl apply -f /home/ansike/ansike/k8s-script/pod/initc/mydb.yaml
# 获取pod
kubectl get pods
# NAME   READY   STATUS     RESTARTS   AGE
# node   0/1     Init:1/2   0          5m44s
```

**2. 启动第二个服务：mydb**

```shell
# 初始化服务
kubectl apply -f /home/ansike/ansike/k8s-script/pod/initc/myservice.yaml
# 获取pod
kubectl get pods
# NAME   READY   STATUS    RESTARTS   AGE
# node   1/1     Running   0          7m11s
```

### postStart & preStop

postStart 可以在启动之前做一些动作
preStop 可以在退出前做一些动作

### main container

执行正常的容器启动流程

### probe

k8s 有两个探针：就绪探针（readinessProbe），存活探针（livenessProbe）

探测的方式：ExecAction，TCPSocketAction，HTTPGetAction

**就绪探针**

故意将 readinessProbe 检测的 port 写错，然后因为在当前端口检测不到服务，所以 READY 状态一直为 0/1
将 port 改正确之后，pod 很快 reday

```shell
kubectl get pods
# NAME   READY   STATUS    RESTARTS   AGE
# node   0/1     Running   0          2m56s

kubectl get pods
# NAME   READY   STATUS    RESTARTS   AGE
# node   1/1     Running   0          4s
```

**存活探针**

1. exec 对应 node-livenessprobe-exec.yaml 文件

使用 busybox 创建了一个 pod，当前 pod 在启动时创建一个/tmp/live 的文件，该文件将作为存活检测的依据。
在 30s 后将当前文件删除，以便于存活检测生效触发 pod 重启

```shell
kubectl get pods -w
# NAME   READY   STATUS    RESTARTS      AGE
# node   1/1     Running   1 (19s ago)   88s
# node   1/1     Running   2 (1s ago)    2m19s
```

2. httpGet 对应 node-livenessprobe-httpget.yaml 文件

启动服务之后删除 nginx 下的目标文件

```shell
# 删除nginx index.html文件
kubectl exec -it nginx -- rm -rf /usr/share/nginx/html/index.html

kubectl get pods -w
# NAME    READY   STATUS    RESTARTS   AGE
# nginx   1/1     Running   0          8m20s
# nginx   1/1     Running   1 (1s ago)   11m
```

2. httpGet 对应 node-livenessprobe-socket.yaml 文件

因为改方法就是监听 container 的端口，而容器端口监听失败时 pod 自己就会重启，所以无需验证

相关代码参考：https://github.com/ansike/k8s-script/tree/main/pod