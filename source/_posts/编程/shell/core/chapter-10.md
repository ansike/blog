---
title: 网络命令
categories: 编程
tags: shell
date: 
---

<a href="#ifconfig">1. ifconfig 配置或显示网络接口信息</a>
<a href="#ifup">2. ifup 激活网络接口</a>
<a href="#ifdown">3. ifdown 禁用网络接口</a>
<a href="#route">4. route 显示或管理路由表</a>

<h3 id="ifconfig">1. ifconfig 配置或显示网络接口信息</h3>

语法: ifconfig [interface] [option]

| 参数 | 说明                                       |
| ---- | ------------------------------------------ |
| -a   | 显示所有的王阔接口信息，包括活动和非活动的 |
| up   | 激活指定的网络接口                         |
| down | 关闭指定的网络接口                         |
| hw   | 设置网络的物理地址（MAC 地址）             |

```shell
# 显示所有的网卡
ifconfig

# 查看网卡详情
ifconfig eth0
```

<h3 id="ifup">2. ifup 激活网络接口</h3>

语法: ifup [iface]

<h3 id="ifdown">3. ifdown 禁用网络接口</h3>

语法: ifdown [iface]

<h3 id="route">4. route 显示或管理路由表</h3>

功能说明：显示或管理 Linux 系统的路由表，route 命令设置的路由主要是静态路由

语法: route [option]

| 参数       | 说明                                            |
| ---------- | ----------------------------------------------- |
| -n         | 直接使用 IP 地址，不进行 DNS 解析               |
| -ee        | 显示更详细的路由信息                            |
| add        | 添加路由信息                                    |
| del        | 删除路由信息                                    |
| target     | 指定目标网络或主机，可以用 ip 地址或主机/网络名 |
| -net       | 到一个网络的路由，后面接的是一个网络号地址      |
| -host      | 到一个主机的路由，后面接的是一个主机的地址      |
| netmask NM | 为添加的路由指定网络掩码                        |
| gw GW      | 为发往目标网络/主机的任何分组指定网关           |
| dev If     | 指定那个网络设备出去，后面接网络设备名，如 eth0 |

```shell
route
# Kernel IP routing table
# Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
# default         n227-076-001.by 0.0.0.0         UG    0      0        0 eth0
# 10.227.76.0     0.0.0.0         255.255.252.0   U     0      0        0 eth0
```

字段说明

- Destination： 网络号
- Gateway：连出网关地址，网络是通过该 IP 连出去的。如果都是 0，表示路由是通过主机传送出去的。如果有 IP 显示，表示路由必须通过 IP 才能连接出去
- Genmask：子网掩码（netmask），网络号和子网掩码组成一个完整的网络。
- Flags：路由标记信息
  - U(route is up)
  - H(target is host)
  - R(reinstate route for dynamic routing)
  - G(use gateway)
  - M(modified from routing daemon or redirect)
  - D(dynamically installed by daemin or redirect)
  - !(reject route)
- Metric：需要经历几个网络节点（hops）才能到达路由的目标网络地址
- Ref：参考此路由规则的数目
- Use：有几个转送数据包参考到了此路由规则
- Iface：路由对应的网络设备接口


```shell
# 为默认网关，所有没被处理的请求都会走到默认网关
# 0.0.0.0         10.227.76.1     0.0.0.0         UG    0      0        0 eth0
# 删除默认网关
route del default
# 添加默认网关
route add default gw 10.0.0.2
route dad -net 0.0.0.0 netmask 0.0.0.0 gw 10.0.0.2
```