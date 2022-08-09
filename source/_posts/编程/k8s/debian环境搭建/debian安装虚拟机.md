---
title: debian安装虚拟机
categories: 编程
tags:
  - debian
  - virtualbox
date: 2022-08-10 00:00:50
---

因为之前 mac 上安装过 virtualbox 所以在 debian 上安装时还是选择了 virtualbox

### debian 安装 virtualbox

```shell
# 下载oracle_vbox_2016的公钥，为后续apt下载 virtualbox铺路
wget -O- https://www.virtualbox.org/download/oracle_vbox_2016.asc | sudo gpg --dearmor --yes --output /usr/share/keyrings/oracle-virtualbox-2016.gpg
# 更新apt
sudo apt-get update
# 安装virtualbox
sudo apt install virtualbox
# 检查版本，VBoxManage为virtualbox的命令行管理工具
VBoxManage -v
5.2.24_Debianr128122
```

### 在 virtualbox 中创建虚拟机

```shell
VBoxManage createvm --name UbuntuRDHome --register
# 列出所有的虚拟机
VBoxManage list vms
```

### 设置虚拟机网络

确保虚拟机可以访问主机网络

一个 nat 网卡，一个 hostonly 网卡

### 创建多台虚拟机

虚拟机之间可以互相访问
