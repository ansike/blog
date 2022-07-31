---
title: k8s资源清单
categories: 编程
tags:
  - k8s
date: 2022-07-30 22:51:46
---

### k8s 中的资源

k8s 中所有的内容都抽象为资源，资源实例化后叫对象

<!-- 根据范围可以分为三类
1. namespace: 常见命名空间 kube-system, default
2. cluster: role
3. metadata: HPA 通过指标进行分类 -->

1. 工作负载型资源（workload）: Pod、ReplicaSet、Deployment、StatefulSet、DaemonSet、Job、CronJob
2. 服务发现及负载均衡资源（ServiceDiscovery LoadBalance）: Service、Ingress
3. 配置和存储型资源: Volume（存储卷）、CSI（容器存储接口）
4. 特殊类型的存储卷: ConfigMap（当配置中心来使用的资源类型）、Secret（保存敏感数据）、DownwardAPI（把外部环境中的信息输出给容器）
5. 集群级资源: Namespace、Node、Role、ClusterRole、RoleBinding、ClusterRoleBinding
6. 元数据类型资源: HPA、PodTemplate、LimitRange

### 资源清单

在 k8s 中我们一般使用 yaml 格式的文件来创建符合我们预期期望的 pod，这样的文件我们一般称之为资源清单

<!-- TODO yaml 格式 -->

### 常用字段解释

| 参数名                                  | 字段类型 | 说明                                                                                                  |
| --------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| version                                 | string   | 指 K8S API 的版本，目前基本是 v1，可以使用 kubectl api-version 查询                                   |
| kind                                    | string   | 指 yaml 文件定义的资源类型和角色，如：Pod （注意首字母大写）                                          |
| metadata                                | object   | 元数据对象                                                                                            |
| metadata.name                           | string   | 元数据对象的名字，自定义 pod 的名字                                                                   |
| metadata.namespace                      | string   | 元数据对象的命名空间                                                                                  |
| spec                                    | string   | 元数据对象的命名空间                                                                                  |
| spec.containers[]                       | list     | 容器列表定义                                                                                          |
| spec.containers[].name                  | string   | 容器的名字                                                                                            |
| spec.containers[].image                 | string   | 容器使用的镜像名字                                                                                    |
| spec.containers[].ports[]               | list     | 容器需要使用的端口列表                                                                                |
| spec.containers[].ports[].name          | string   | 容器需要使用的端口名称                                                                                |
| spec.containers[].ports[].conatinerPort | string   | 容器监听的端口号                                                                                      |
| spec.containers[].ports[].hostPort      | string   | 主机需要监听的端口号，设置之后同一台主机无法启动改容器相同的副本                                      |
| spec.containers[].env[]                 | list     | 环境变量                                                                                              |
| spec.containers[].env[].name            | string   | 环境变量 name                                                                                         |
| spec.containers[].env[].value           | string   | 环境变量 value                                                                                        |
| spec.restartPolicy                      | string   | 定义 Pod 的重启策略，可选值：Always（退出就重启）, OnFailure（失败退出时重启）, Never（永远不会重启） |
|                                         |

### 容器的生命周期

pod 创建时经历过程如下

1. pause 网络和数据卷初始化
2. start initC 初始化容器(主容器启动的前置动作，包括数据初始化，文件创建，依赖服务检测)
3. start mainC（中间还有 start 和 stop 的回调）
  - 1. 容器启动
  - 2. 调用启动的start动作
  - 3. 主流程启动（拉去镜像，启动等）
  - 4. 中间可能会存在探活动作
  - 5. 如果容器停止会调用停止的stop动作


**initC**
initC 是主容器启动前的其他容器启动操作，所有的 initC 会初始化串行启动，所有的容器正常启动且停止之后主容器才会开始启动。

**探针**是 kubelet 对容器执行的定期诊断。

**容器探针的分类：**

1. ExecAction: 容器内执行指定命令。退出码为 0 表示成功
2. TCPSocketAction: 对指定端口上的容器的 IP 地址进行 TCP 检查。如果端口打开则认为是成功的
3. HTTPGetAction: 对指定的端口和路径上的容器的 IP 地址执行 HTTP Get 请求。如果响应码大于等于 200 且小于 400，认为是成功的

**探测方式**
livenessProbe: 指示容器是否正在运行，存在于 mainC 的整个生命周期中。探活检测失败容器将根据重启策略进行相应
readinessProbe: 指示容器是否准备好服务请求。如果探测失败，端点控制器将从与 Pod 匹配的所有 Service 的端点中删除该 Pod 的 IP 地址。

**pod 的分类**
自主式的 Pod: Pod 退出之后不会被自动创建
控制器管理的 Pod: 在控制器的生命周期里是中维持 Pod 的副本数目
