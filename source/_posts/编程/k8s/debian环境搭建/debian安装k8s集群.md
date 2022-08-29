---
title: 多台debian组k8s集群
categories: 编程
tags:
  - debian
  - k8s
date: 2022-08-10 00:00:50
---

<a href="#环境说明">1. 环境说明</a>
<a href="#docker">2. 修改 docker 配置</a>
<a href="#proxy">3. 配置 proxy</a>
<a href="#k8s">4. 安装配置 k8s</a>
<a href="#install">5. 初始化集群</a>
<a href="#join">6. 其他机器加入集群</a>
<a href="#cni">7. 安装 cni</a>

<h3 id="环境说明">1. 环境说明</h3>

- 操作系统三台机器有 debian 10（两台）和 debian 9（一台）
- Kubernetes v1.22.2
- cni 插件 https://projectcalico.docs.tigera.io/manifests/canal.yaml
- docker 20.10.17

<h3 id="docker">2. 修改 docker 配置</h3>

一台 debian10 做 master，其余两台做 worker

确保安装好 docker 之后，修改 daemon.json 文件
设置`/etc/docker/daemon.json`
确保`native.cgroupdriver=systemd`

```shell
cat >/etc/docker/daemon.json<<EOF
{
    "insecure-registries": ["hub.xxx.org", "hub.xxx.org:443"],
    "live-restore": true,
    "exec-opts": ["native.cgroupdriver=systemd"],
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "100m"
    },
    "storage-driver": "overlay2"
}
```

<h3 id="proxy">3. 配置 proxy</h3>

确保后续安装软件下载包的时候能顺畅的拉取资源
注意将自己的代理覆盖到对应的位置上

1. 系统 proxy

```shell
   export HTTP_PROXY="http://xxx:8118"
   export HTTPS_PROXY="http://xxx:8118"
   export NO_PROXY="127.0.0.1,localhost"
```

2. apt-get 的 proxy

```shell
cat >/etc/apt/apt.conf.d/proxy.conf<<EOF
Acquire {
  http::proxy "http://xxx:8118";
  https::proxy "http://xxx:8118";
}
EOF
```

3. docker 中的 proxy

```shell
sudo mkdir -p /etc/systemd/system/docker.service.d
cat >/etc/systemd/system/docker.service.d/proxy.conf<<EOF
[Service]
Environment="HTTP_PROXY=http://xxx:8118"
Environment="HTTPS_PROXY=http://xxx:8118"
Environment="NO_PROXY=127.0.0.1,localhost"
EOF
```

最后重启 docker

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

<h3 id="k8s">4. 安装配置 k8s</h3>

数据盘映射 Kubelet 数据目录

1. 配置 kubelet 目录

```shell
sudo mkdir /opt/kubelet
sudo ln -s /opt/kubelet /var/lib/kubelet
```

2. 环境准备

```shell
# 更新安装软件
sudo apt-get update && sudo apt-get install -y apt-transport-https curl
# 校验apt-key
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
# 修改k8s配置
sudo cat >/etc/apt/sources.list.d/kubernetes.list<<EOF
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF
# 更新软件
sudo apt-get update
```

3. 安装 k8s

```shell
# 安装1.22.2版本
sudo apt-get install -qy kubelet=1.22.2-00 kubectl=1.22.2-00 kubeadm=1.22.2-00

# 先启动好 kubelet
sudo apt-mark hold kubelet kubeadm kubectl
sudo systemctl enable kubelet

# 预先拉取需要的镜像
kubeadm config images pull
# 如果下载失败，确认一下proxy的代理是不是有问题
```

<h3 id="install">5. 初始化集群</h3>

1. 创建 kubeadm 配置文件

```shell
# 打印init的默认配置
kubeadm config print init-defaults

# 以下为kubeadm启动的默认配置
# 需要变更两个配置才能run起来
apiVersion: kubeadm.k8s.io/v1beta3
bootstrapTokens:
- groups:
  - system:bootstrappers:kubeadm:default-node-token
  token: abcdef.0123456789abcdef
  ttl: 24h0m0s
  usages:
  - signing
  - authentication
kind: InitConfiguration
localAPIEndpoint:
  advertiseAddress: 1.2.3.4
  bindPort: 6443
nodeRegistration:
  criSocket: /var/run/dockershim.sock
  imagePullPolicy: IfNotPresent
  name: node
  taints: null
---
apiServer:
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta3
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
controllerManager: {}
dns: {}
etcd:
  local:
    dataDir: /var/lib/etcd
imageRepository: k8s.gcr.io
kind: ClusterConfiguration
kubernetesVersion: 1.22.0
networking:
  dnsDomain: cluster.local
  serviceSubnet: 10.96.0.0/12
scheduler: {}
```

变更内容

1. 修改 advertiseAddress 为当前机器的 ip
2. networking 下增加 podSubnet: 192.168.0.0/16

**以我机器为例，最后配置为**

```shell
apiVersion: kubeadm.k8s.io/v1beta3
bootstrapTokens:
- groups:
  - system:bootstrappers:kubeadm:default-node-token
  token: abcdef.0123456789abcdef
  ttl: 24h0m0s
  usages:
  - signing
  - authentication
kind: InitConfiguration
localAPIEndpoint:
  advertiseAddress: 10.37.156.156
  bindPort: 6443
nodeRegistration:
  criSocket: /var/run/dockershim.sock
  imagePullPolicy: IfNotPresent
  name: node
  taints: null
---
apiServer:
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta3
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
controllerManager: {}
dns: {}
etcd:
  local:
    dataDir: /var/lib/etcd
imageRepository: k8s.gcr.io
kind: ClusterConfiguration
kubernetesVersion: 1.22.0
networking:
  dnsDomain: cluster.local
  serviceSubnet: 10.96.0.0/12
  podSubnet: 192.168.0.0/16
scheduler: {}
```

2. init 运行成功后,按提示配置好 KubeConfig 文件

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

3. 查看 node 和 pod

```
kubectl get node
kubectl get pod -A
```

<h3 id="join">6. 其他机器加入集群</h3

copy 初始化集群之后的一个打印信息，类似

```
kubeadm join 10.37.156.156:6443 --token 8wybtt.440uq1zn3srp3hq0 \
        --discovery-token-ca-cert-hash sha256:3fa7db3b64f15f1c99bb075dc1410cefd13d715aaecb5e646a69b17c3a3a186f
```

在另外的 worker 机器上执行
然后在 master 上查看注册的 node，可以看到刚才注册进来的 node

```shell
kubectl get node

# NAME    STATUS   ROLES                  AGE   VERSION
# node1   Ready    <none>                 61m   v1.22.2
# master  Ready    control-plane,master   64m   v1.22.2
# node2   Ready    <none>                 63m   v1.22.2
```

<h3 id="cni">7. 安装cni</h3>

但此时集群内部还无法通信，需要安装 container network interface

```shell
# 文件较大，建议先下下来
curl -O -k "https://projectcalico.docs.tigera.io/manifests/canal.yaml"

# 编辑canal的net配置 net-conf.json
# 确保Network 和集群初始化时的 podSubnet 网段一致 192.168.0.0/16
# net-conf.json: |
#     {
#       "Network": "192.168.0.0/16",
#       "Backend": {
#         "Type": "vxlan"
#       }
#     }

kubectl apply -f canal.yaml

# 很快就能看到coredns状态变为running
kubectl get pod -A

# kube-system   calico-kube-controllers-86c9c65c67-dz4hk   1/1     Running   0          57m
# kube-system   canal-7fp55                                2/2     Running   0          57m
# kube-system   canal-gkrdl                                2/2     Running   0          57m
# kube-system   canal-stzzp                                2/2     Running   0          56m
# kube-system   coredns-78fcd69978-5chrp                   1/1     Running   0          58m
# kube-system   coredns-78fcd69978-z7zkg                   1/1     Running   0          58m
# kube-system   etcd-node                                  1/1     Running   1          58m
# kube-system   kube-apiserver-node                        1/1     Running   1          58m
# kube-system   kube-controller-manager-node               1/1     Running   0          58m
# kube-system   kube-proxy-874gz                           1/1     Running   0          58m
# kube-system   kube-proxy-gcb9h                           1/1     Running   0          56m
# kube-system   kube-proxy-lg6wc                           1/1     Running   0          58m
# kube-system   kube-scheduler-node                        1/1     Running   1          58m
```
