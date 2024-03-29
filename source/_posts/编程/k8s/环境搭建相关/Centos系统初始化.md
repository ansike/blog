---
title: Centos系统初始化
categories: 编程
tags:
  - centos
date: 2022-08-06 23:59:06
---

### 设置系统主机名以及 Host 文件的相互解析

hostnamectl set-hostname k8s-master01

### 安装依赖包

```shell
yum install -y conntrack ntpdate ntp ipvsadm ipset jq iptables curl sysstat libseccomp wget vim
net-tools git
```

### 设置防火墙为 Iptables 并设置空规则

```shell
systemctl stop firewalld && systemctl disable firewalld
yum -y install iptables-services && systemctl start iptables && systemctl enable iptables \
&& iptables -F && service iptables save
```

### 关闭 SELINUX

```shell
swapoff -a && sed -i '/ swap / s/A\(._\)$/#\l/g' /etc/fstab
setenforce 0 && sed -i 's/ASELINUX=._/SELINUX=disabled/' /etc/selinux/config
```

### 调整内核参数，对于 K8S

```shell
cat > kubernetes.conf <<EOF
net.bridge.bridge-nf-call-iptables=l
net.bridge.bridge-nf-call-ip6tables=l
net. ipv4.ip_forward=l
net.ipv4.tcp_tw_recycle=0
vm.swappiness=0 #禁止使用 swap 空间，只有当系统 00M 时才允许使用它
vm. overcommit_memory=l #不检查物理内存是否够用
vm.panic_on_oom=0 # 开启 00M
fs, inotify.max_user_instances=8192
fs, inotify.max_user_watches=1048576
fs.file-max=52706963
fs.nr_open=52706963
net. ipv6.conf.all. disable_ipv6=l
net.netfilter.nf_conntrack_max=2310720
EOF

cp kubernetes.conf /etc/sysctl.d/kubernetes.conf
sysctl -p /etc/sysctl.d/kubernetes.conf
```

### 调整系统时区

```shell
# 设置系统时区为中国/上海
timedatectl set-timezone Asia/Shanghai
# 将当前的UTC时间写入硬件时钟
timedatectl set-local-rtc 0
# 重启依赖于系统时间的服务
systemctl restart rsyslog
systemctl restart crond
```

### 关闭系统不需要服务

```shell
systemctl stop postfix && systemctl disable postfix
```

设置 rsyslogd 和 systemd journald

```shell
mkdir /var/log/journal #持久化保存日志的目录
mkdir /etc/systemd/journald.conf.d
cat > /etc/systemd/journald.conf.d/99-prophet.conf <<EOF
[Journal]
# 持久化保存到磁盘
Storage=persistent
# 压缩历史日志
Compress=yes
SyncIntervalSec=5m
RateLimitInterval=30s
RateLimitBurst=1000
# 最大占用空间10G
SystemMaxllse=10G
# 单日志文件最大200M
SystemMaxFileSize=200M
# 日志保存时间2周
MaxRetentionSec=2week
# 不将日志转发到syslog
ForwardToSyslog=no
EOF
systemctl restart systemd-journald
```

### 升级系统内核为 4.44

CentOS 7.x 系统自带的 3.10.x 内核—些 Bugs, 导致运行的 Docker、Kubernetes 不稳定，例 I 如：rpm-Uvh
httD：〃www.elrepo.org/elrepo-release-7.0-3.el7.elrepo.noarch.rpm

```shell
rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-3.el7.elrepo.noarch.rpm #安装完成后检查/boot/grub2/grub.cfg 中对应内核 menuentry 中是否包含 initrdl6 配置，如果没有，再安装 一次！
yum --enablerepo=elrepo-kernel install -y kernel-lt #设置开机从新内核启动
grub2-set-default 'CentOS Linux (4.4.189-1.el7.elrepo.x86_64) 7 (Core)'
```
