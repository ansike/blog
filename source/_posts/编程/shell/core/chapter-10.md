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
<a href="#arp">5. arp 管理系统的 arp 缓存</a>
<a href="#ip">6. ip 网络配置工具</a>
<a href="#netstat">7. netstat 查看网络状态</a>
<a href="#ss">8. ss 查看网络状态</a>
<a href="#ping">9. ping 测试主机之间网络的连通性</a>
<a href="#traceroute">10. traceroute 追踪数据传输协议路由状况</a>
<a href="#arping">11. arping 发送 arp 请求</a>
<a href="#nc">12. nc 多功能网络工具</a>
<a href="#ssh">13. ssh 安全登录远程主机</a>
<a href="#wget">14. wget 命令行下载工具</a>
<a href="#nslookup">15. nslookup 域名查询工具</a>
<a href="#dig">16. dig 域名查询工具</a>
<a href="#host">17. host 域名查询工具</a>
<a href="#nmap">18. nmap 网络探测工具和安全/端口扫描器</a>
<a href="#tcpdump">19. tcpdump 监听网络流量</a>

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

route add -net 192.168.49.0/24 dev eth0
route del -net 192.168.49.0/24 dev eth0
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

<h3 id="arp">5. arp 管理系统的arp缓存</h3>

功能说明: 用于操作本机的 arp 缓存区。
arp（address resolution protocl）地址解析协议。根据 IP 地址获取物理地址（MAC 地址）

语法: arp [option]

| 参数                 | 说明                          |
| -------------------- | ----------------------------- |
| -n                   | 显示数字 IP 地址              |
| -s <主机> <MAC 地址> | 设置主机 IP 和 MAC 地址的映射 |
| -d <主机>            | 删除指定主机的 arp            |
| -i <接口>            | 指定网络接口                  |
| -v                   | 显示详细的缓存条目            |

<h3 id="ip">6. ip 网络配置工具</h3>

功能说明: 用于显示或管理 Linux 系统的路由、网络设备、策略路由和隧道

语法: ip [option] [object] [command]

| 参数     | 说明                                                                                                                                                                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -s       | 输出更详细的信息                                                                                                                                                                                                                                                     |
| -r       | 显示主机时，不使用 IP 地址，使用域名                                                                                                                                                                                                                                 |
| 网络对象 | link 网络设备 <br /> address IP 地址 <br /> addrlabel 协议地址管理标签 <br /> neighbour arp 或 ndisc 缓存表 <br /> route 路由表 <br /> rule 策略路由表 <br /> maddress 多播地址 <br /> mroute 多播路由缓存表 <br /> tunnel IP 隧道 <br /> xfrm IPsec 协议框架 <br /> |

<h3 id="netstat">7. netstat 查看网络状态</h3>

功能说明: 查看本机网络的连接状态、运行短裤和路由表信息。

语法: netstat [option]

| 参数   | 说明                                           |
| ------ | ---------------------------------------------- |
| -r     | 显示路由表，和 route，ip route 类似            |
| -g     | 显示多播群组成员，和 ip maddr 类似             |
| -i     | 显示网络接口信息，和 ip -s link 类似           |
| -s     | 显示各协议的统计信息                           |
| -n     | 显示数字形式的地址而不是解析主机，端口，用户名 |
| -a     | 显示处于监听和非监听的 socket 信息             |
| -A     | 显示指定网络类型的网络连接状态                 |
| -c <n> | 每隔 n 秒刷新一次                              |
| -l     | 仅显示 listen 的网络                           |
| -t     | 显示所有 TCP                                   |
| -u     | 显示所有 UDP                                   |
| -p     | 显示 socket 所属进程的 PID 和名称              |

```shell
# 显示所有连接信息
netstat -an
# 显示所有listen状态的TCP,UDP 的进程号和进程名
netstat -lntup
# 显示路由表
netstat -rn

# 统计各个状态的网络连接个数
netstat -n|awk '/^tcp/ {++array[$NF]} END {for(key in array) print key, array[key]}'
```

<h3 id="ss">8. ss 查看网络状态</h3>

功能说明: 类似并将取代 netstat 的工具，查看网络状态信息，包括 TCP，UDP 连接，端口等。ss 属于 iproute 包

语法: ss [option] [filter]

| 参数 | 说明                        | 参数 | 说明                    |
| ---- | --------------------------- | ---- | ----------------------- |
| -n   | 显示 IP 地址不进行 DNS 解析 | -s   | 显示 socket 使用统计    |
| -r   | 尝试显示数字 IP 和端口      | -4   | 仅显示 IPv4 的 socket   |
| -a   | 显示所有 socket 连接        | -6   | 仅显示 IPv6 的 socket   |
| -l   | 显示监听所有 socket         | -0   | 仅显示 PACKET 的 socket |
| -o   | 显示计时器信息              | -t   | 仅显示 TCP 的 socket    |
| -e   | 显示详细的 socket 信息      | -u   | 仅显示 UDP 的 socket    |
| -m   | 显示 socket 的内存使用情况  | -d   | 仅显示 DCCP 的 socket   |
| -p   | 显示使用 socket 的进程      | -w   | 仅显示 RAW 的 socket    |
| -i   | 显示 TCP 内部信息           | -x   | 仅显示 Unix 的 socket   |

```shell
# 显示所有socket
ss -an
# 显示所有listen状态的TCP,UDP 的进程号和进程名
ss -lntup
```

<h3 id="ping">9. ping 测试主机之间网络的连通性</h3>

功能说明: 测试主机之前网路的连通性。指定 ping 命令会使用 ICMP 传输协议，发出要求回应的信息，若远端主机没有为你，就会回应该信息，因而可得知该主机运作正常。

语法: ping [option] [destination]

| 参数            | 说明                                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| -c <n>          | 指定 ICMP 报文的次数。否则会一直发报文                                            |
| -i <时间间隔>   | 相邻两次报文的时间间隔，默认时间间隔位 1s                                         |
| -n              | 不查询主机名，直接显示 IP                                                         |
| -q              | 只显示命令开始时的信息和运行结束时的统计信息。忽略命令运行过程中的输出信息        |
| -s <数据包大小> | 设置发送数据包的大小，默认为 56 字节加 8 字节的 ICMP 头，一共是 64 字节的 ICMP 包 |
| -t <生存期>     | 设置 TTL (time to life) ICMP 经过的路由器数目值                                   |
| -w 截止时间     | 超过截止时间推出 ping                                                             |
| -W 超时时间     | 等待响应的超时时间                                                                |

```shell
# 显示所有socket
ss -an
# 显示所有listen状态的TCP,UDP 的进程号和进程名
ss -lntup
```

<h3 id="traceroute">10. traceroute 追踪数据传输协议路由状况</h3>

功能说明: 显示网络数据包传输到指定主机的路径信息，追踪数据传输路由状况。

语法: traceroute [option] [host] [packet_len]

| 参数   | 说明                         |
| ------ | ---------------------------- |
| -q <n> | 每一跳的探测包数量。默认是 3 |
| -I     | 使用 ICMP ECHO 探测，即 ping |
| -n     | 直接使用 IP 地址而不是主机名 |
| -m     | 设置最大的跳数，默认位 30    |

```shell
# traceroute默认使用的是UDP，性能不是很好
traceroute -n www.bytedance.com
# 可以使用ICMP协议
traceroute -In www.bytedance.com
```

<h3 id="arping">11. arping 发送 arp 请求</h3>

功能说明: 用于发送 arp 请求到一个相邻主机的工具，检查局域网内的所有设备的硬件地址。

语法: arping [option]

| 参数          | 说明                                                   |
| ------------- | ------------------------------------------------------ |
| -c <n>        | 发送指定次数的 arp 报文后退出                          |
| -f            | 收到第一个应答报文时立即退出。用户判断目标主机是否存在 |
| -I 网络接口   | 指定网络接口发送 arp 报文                              |
| -w <截止时间> | 设置命令截止时间                                       |
| -s source     | 设定 arping 发送的 arp 数据包中的源地址                |

<h3 id="nc">12. nc 多功能网络工具</h3>

功能说明: 是一个简单、可靠、强大的网络工具，它可以建立 TCP 连接，发送 UDP 数据包，监听任意的 TCP 和 UDP 端口，进行端口扫描，处理 IPv4 和 IPv6 数据包。

语法: nc [option]

| 参数 | 说明                                       |
| ---- | ------------------------------------------ |
| -l   | 监听指定端口，然后一直等待网络连接         |
| -z   | 扫描时不发送任何数据                       |
| -v   | 显示详细输出                               |
| -w   | 设置超市时间，对-l 失效                    |
| -p   | 指定 nc 使用的端口，不能和-l 一起使用      |
| -u   | 使用 UDP，默认是 TCP 连接                  |
| -s   | 指定发送数据的源 IP 地址，适用于多网卡主机 |

```shell
# 监听80端口并打印详细信息
nc -lv 80

# 端口扫描
nc -zv 10.227.77.100 20-9000

```

<h3 id="ssh">13. ssh 安全登录远程主机</h3>

语法: ssh [option] [user@]hostname [command]

| 参数 | 说明                                               |
| ---- | -------------------------------------------------- |
| -p   | 指定 ssh 登录的端口，默认为 22                     |
| -t   | 强制分配伪终端，可在远程机器上执行任何全屏幕的程序 |
| -v   | 调试模式                                           |

```shell
# 登录机器执行命令
ssh 10.227.77.110 "free -m"
```

<h3 id="wget">14. wget 命令行下载工具</h3>

功能说明: 从网络上下载资源。
支持断点续传
支持 FTP 和 HTTP
支持代理服务器
非常稳定且有很强的适应性

语法: wget [option] [url]

| 参数                          | 说明                   |
| ----------------------------- | ---------------------- |
| -o                            | 将命令的结果写入文件中 |
| -O                            | 指定文件名下载文件     |
| --limit-rate                  | 限速下载               |
| -b                            | 转入后台执行           |
| -c                            | 断点续传               |
| --user-agent                  | 指定客户端标志         |
| -q                            | 关闭下载时的输出       |
| --tries=number                | 重试次数               |
| --spider                      | 模拟爬虫访问           |
| -T seconds/ --timeout=seconds | 超时时间               |

```shell
# 监控网站的URL是否正常
wget -q -T 3 --tries=1 --spider www.baidu.com
echo $?
```

<h3 id="nslookup">15. nslookup 域名查询工具</h3>

语法: nslookup [option] [name] [server]

nslookup 有两种模式
交互模式: 用户可以向域名服务器查询各类主机，域名信息，或者输出域名中的主机列表
非交互模式:这个一个主机或域名仅仅获取特定的名称或所需信息

直接输入 nslookup，会直接进入交互模式，此时 nslookup 会连接到默认的域名服务器(即/etc/resolv/conf 的第一个 DNS 地址)
也支持选定不同的 dns 服务器，将第一个参数设置为`-`，第二个参数位连接的域名服务器主机名或 IP 地址

**交互模式**

| 参数                | 说明                                                                                                                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| exit                | 退出                                                                                                                                                                                                                                          |
| server <域名服务器> | 指定解析域名的服务器地址                                                                                                                                                                                                                      |
| set key=value       | 设置查询关键字（域名属性）。<br /> all 域名的所有信息<br /> domain=name 指定查询的域名<br /> port=n 指定域名服务器的端口<br /> type=s 指定域名查询的类型（A,HINFO,PTR,NS,MX）<br /> retry=n 查询重试的次数<br /> timeout=n 指定查询的超时时间 |

**非交互模式**

| 参数     | 说明           |
| -------- | -------------- |
| -timeout | 超时时间       |
| -query   | 域名查询的类型 |

```shell
cat /etc/resolve.conf
# nameserver 10.225.109.xx

nslookup
# > www.baidu.com   #输入查询的域名
# Server:         10.225.85.109       #默认DNS服务
# Address:        10.225.85.109#53    #DNS的IP和端口

# Non-authoritative answer:           #说明本域名服务器的应答是从其他域名服务器查询到的信息
# Name:   www.baidu.com
# Address: 10.15.63.90                #域名对应的IP

# 非交互式查询
nslookup www.baidu.com 223.5.5.5
```

<h3 id="dig">16. dig 域名查询工具</h3>

功能说明: 常用的域名查询工具，测试域名系统的工作是否正常

语法: dig [option]

| 参数            | 说明                                                     |
| --------------- | -------------------------------------------------------- |
| @<DNS 服务地址> | 指定域名解析的域名服务器                                 |
| -x              | 反向域名解析                                             |
| -t              | 指定要查询的 DNS 数据类型，如 A、MAX 和 PTR 等。默认位 A |
| -b              | 指定使用本机的哪个 IP 地址像域名服务器发送域名查询请求   |
| -p              | 指定域名服务器使用的端口号。默认使用 UDP 协议的 53 端口  |
| +trace          | 从根域开始查询结果                                       |
| +nocmd          | 不输出 dig 的版本信息                                    |
| +short          | 仅输出最精简的 CNAME 信息和 A 纪录                       |
| +nocomment      | 不输出 dig 的详情注视信息                                |
| +nostat         | 不输出最后的统计信息                                     |

```shell
# 查询指定域名的IP
dig www.baidu.com
# 使用@指定查询的DNS服务器,域名解析成IP的完整过程
dig @233.5.5.5 www.baidu.com +trace
# 反向域名解析
dig -x 10.15.63.90
# 只展示精简信息
dig +short www.baidu.com
```

<h3 id="host">17. host 域名查询工具</h3>

语法: host [option]

| 参数 | 说明                |
| ---- | ------------------- |
| -a   | 显示详细的 DNS 信息 |
| -t   | 指定查询域名信息    |

```shell
# 查询指定域名的IP
host www.baidu.com
```

<h3 id="nmap">18. nmap 网络探测工具和安全/端口扫描器</h3>

功能说明: nmap（Network Mapper）网络探测和安全审核工具。可以发现网络上有哪些主机，主机提供了说明服务（程序名称和版本号），并探测操作系统的类型和版本信息。

语法: nmap [scan type] [option] [target specification]

| 参数          | 说明                                                   |
| ------------- | ------------------------------------------------------ |
| -sS           | TCP 同步扫描（TCP SYN）                                |
| -sT           | TCP 连接扫描                                           |
| -sn           | 不进行端口扫描，只检查主机正在进行。                   |
| -sU           | 扫描 UDP 端口                                          |
| -Pn           | 只扫描，不 ping 主机                                   |
| -PS           | 使用 SYN 包对目标主机进行扫描                          |
| -PU           | 使用 UPD ping 扫描端口                                 |
| -O            | 激活对 TCP/IP 指纹特征扫描，获得远程主机的操作系统类型 |
| -v            | 显示扫描过程中的详细信息                               |
| -S <IP>       | 设置扫描的源 IP 地址                                   |
| -g port       | 设置扫描的源端口                                       |
| -p            | 指定扫描的端口                                         |
| -n            | 不进行 DNS 解析                                        |
| --exclude     | 排除指定主机                                           |
| --excludefile | 排除指定文件中的主机                                   |

```shell
# 扫描10-100端口的服务
nmap -p 10-100 127.0.0.1
# 扫描局域网内所有IP
nmap 192.168.0.0/24

# 不扫描端口
nmap -sn 192.168.0.0/24
nmap -sn 192.168.0.0-10
```

<h3 id="tcpdump">19. tcpdump 监听网络流量</h3>

功能说明: 截获网络数据包的包分析工具。可以将网络中传送额度数据包的“头”完全截获下来以提供分析。它支持网络层、协议、主机、端口等的过滤，支持与、或、非逻辑语句协助过滤有效信息。
tcpdump 需要吧网卡切换到混杂模式（promiscuoums mode），需要 root

语法: tcpdump [option] [expression]

| 参数        | 说明                           |
| ----------- | ------------------------------ |
| -c <n>      | 接收到指定的数据包数目之后退出 |
| -i <string> | 指定网络接口                   |
| -n          | 不进行 DNS 解析                |
| -nn         | 不将协议和端口数字转换成名字   |
| -q          | 以快速输出的方式运行           |
| -v          | 以详细的信息输出               |

```shell
# 精简模式输出 5条之后退出
tcpdump -q -c 5

# 监听指定主机收到和发送的数据包
tcpdump -n host 10.0.0.1
# 监听指定主机发出发送的数据包
tcpdump -n src 10.0.0.1
# 监听指定主机发出收到的数据包
tcpdump -n dst 10.0.0.1

# 监听指定端口的数据包
tcpdump -nn port 22

# 监听指定协议的数据包
tcpdump -n arp
tcpdump -n icmp

# 获取主机10.0.0.12与所有（初10.0.0.1）主机的ip数据包
tcpdump -n ip host 10.0.0.12 and ! 10.0.0.1
```

**利用 tcpdump 抓包详解 tcp/ip 连接和断开过程**

tcp 数据传递：三次握手，数据传输，四次挥手断开
tcp 状态表示：

- SYN（同步序列编号，Synchronize Sequence Numbers）该标志仅在三次握手建立 TCP 连接时有效。表示建立一个新的 TCP 连接
- ACK（确认编号，Acknowledgement Number）是对tcp请求的确认标志，提示对端系统已经成功接受了所有的数据
- FIN（结束标志，FINISH）用来结束一个TCP会话。但对应端口仍然吹雨一个开放状态，准备接受后续数据。

```shell
# 抓取由本地发起的发往本地端口位80的包
tcpdump -n -i lo0 -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'

# 测试本地回环请求的时候需要将网络设备指向lo回环地址，否则捕获不到请求
tcpdump port 8080 -i lo
# tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
# listening on lo, link-type EN10MB (Ethernet), capture size 262144 bytes
# ==================== 三次握手
# 00:28:42.855941 IP localhost.35438 > localhost.http-alt: Flags [S], seq 533327284, win 43690, options [mss 65495,sackOK,TS val 2383381400 ecr 0,nop,wscale 10], length 0
# 00:28:42.855962 IP localhost.http-alt > localhost.35438: Flags [S.], seq 919993390, ack 533327285, win 43690, options [mss 65495,sackOK,TS val 2383381400 ecr 2383381400,nop,wscale 10], length 0
# 00:28:42.855977 IP localhost.35438 > localhost.http-alt: Flags [.], ack 1, win 43, options [nop,nop,TS val 2383381400 ecr 2383381400], length 0
# ====================
# 00:28:42.856037 IP localhost.35438 > localhost.http-alt: Flags [P.], seq 1:79, ack 1, win 43, options [nop,nop,TS val 2383381400 ecr 2383381400], length 78: HTTP: GET / HTTP/1.1
# 00:28:42.878630 IP localhost.http-alt > localhost.35438: Flags [.], seq 1:22017, ack 79, win 43, options [nop,nop,TS val 2383381423 ecr 2383381400], length 22016: HTTP: HTTP/1.1 200 OK
# 00:28:42.878669 IP localhost.35438 > localhost.http-alt: Flags [.], ack 22017, win 171, options [nop,nop,TS val 2383381423 ecr 2383381423], length 0
# 00:28:42.878735 IP localhost.http-alt > localhost.35438: Flags [P.], seq 22017:76311, ack 79, win 43, options [nop,nop,TS val 2383381423 ecr 2383381423], length 54294: HTTP
# 00:28:42.878751 IP localhost.35438 > localhost.http-alt: Flags [.], ack 76311, win 299, options [nop,nop,TS val 2383381423 ecr 2383381423], length 0
# 00:28:42.882932 IP localhost.35438 > localhost.http-alt: Flags [F.], seq 79, ack 76311, win 299, options [nop,nop,TS val 2383381427 ecr 2383381423], length 0
# 00:28:42.884174 IP localhost.http-alt > localhost.35438: Flags [F.], seq 76311, ack 80, win 43, options [nop,nop,TS val 2383381428 ecr 2383381427], length 0
# 00:28:42.884191 IP localhost.35438 > localhost.http-alt: Flags [.], ack 76312, win 299, options [nop,nop,TS val 2383381428 ecr 2383381428], length 0
```