---
title: Kubeadm 部署安装
categories: 编程
tags:
  - centos
date: 2022-07-31 23:39:05
---

### kube-proxy 开启 ipvs 的前置条件

```shell
modprobe br_netfilter

cat >/etc/sysconfig/modules/ipvs.modules <<EOF
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
# modprobe -- nf_conntrack_ipv4 # 4.x版本
modprobe -- nf_conntrack # 5.x版本
EOF

chmod 755 /etc/sysconfig/modules/ipvs.modules && bash /etc/sysconfig/modules/ipvs.modules && lsmod | grep -e ip_vs -e nf_conntrack
```

### 安装 Docker 软件

```shell
yum install -y yum-utils device-mapper-persistent-data 1vm2
yum-config-manager\
  --add-repo\
  http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

yum update -y && yum install -y docker-ce

＃ 创建／etc／docker 目录
mkdir /etc/docker

＃ 配置 daemon.
cat >/etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts":{
    "max-size":"100m"
  }
}
EOF

mkdir -p /etc/systemd/system/docker.service.d ＃重启 docker 服务
systemctl daemon-reload&& systemctl restart docker && systemctl enable docker
```

### 安装 Kubeadm（主从配置）

```shell
cat <<EOF >/etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgchec=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# 都是 1.24.3
yum -y install kubeadm kubectl kubelet
systemctl enable kubelet.service
systemctl status kubelet.service
```

### 初始化主节点（仅 master 节点）

```shell
kubeadm config print init-defaults>kubeadm-config.yaml

localAPIEndpoint:
  advertiseAddress: 192.168.56.2
kubernetesVersion: v1.24.3
networking:
  podSubnet: 10.244.0.0/16
  serviceSubnet: 10.96.0.0/12
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
# featureGates: 已经删掉该子段
#   SupportIPVSProxyMode: true
mode: ipvs

# 关闭swap 否则kubelet无法启动
swapoff -a
# 解决 unknown service runtime.v1alpha2.RuntimeService
rm -f /etc/containerd/config.toml
systemctl restart containerd

kubeadm init --config=kubeadm-config.yaml --upload-certs | tee kubeadm-init.1og



# 重启服务
kubeadm reset -f
systemctl restart kubelet
kubeadm init --config=kubeadm-config.yaml --upload-certs | tee kubeadm-init.1og
```

### 加入主节点以及其余工作节点

执行安装日志中的加入命令即可部署网络

```shell
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

### 常见问题

1. coredns pod 无法启动
   network: open /run/flannel/subnet.env: no such file or directory

```shell
mkdir -p /run/flannel/

cat >> /run/flannel/subnet.env <<EOF
FLANNEL_NETWORK=10.244.0.0/16
FLANNEL_SUBNET=10.244.0.1/24
FLANNEL_MTU=1450
FLANNEL_IPMASQ=true
EOF
```

2. 无法访问 pod 的 ip

双网卡导致的问题
https://junjie2018.github.io/notes/%E5%AE%B9%E5%99%A8%E6%8A%80%E6%9C%AF/kubernetes/kubernetes%E8%A7%A3%E5%86%B3%E8%BF%90%E8%A1%8C%E5%9C%A8%E4%B8%8D%E5%90%8C%E4%B8%BB%E6%9C%BA%E4%B8%8A%E7%9A%84pod%E6%97%A0%E6%B3%95ping%E9%80%9A%E7%9A%84%E9%97%AE%E9%A2%98/

### 参考

https://www.jianshu.com/p/51542b0b239b
https://blog.csdn.net/clareeee/article/details/121100431
