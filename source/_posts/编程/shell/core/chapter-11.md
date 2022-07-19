---
title: 系统管理命令
categories: 编程
tags: shell
date: 2022-07-19 10:12:41
---

<a href="#lsof">1. lsof 查看进程打开的文件</a>
<a href="#free">2. free 查看系统内存信息</a>
<a href="#iftop">3. iftop 动态显示网络接口流量信息 </a>
<a href="#vmstat">4. vmstat 虚拟内存统计 </a>
<a href="#mptat">5. CPU 信息统计 </a>
<a href="#iostat">6. iostat I/O 信息统计 </a>
<a href="#sar">7. sar 收集系统信息 </a>

<h3 id="lsof">1. lsof 查看进程打开的文件</h3>

功能说明: lsof(list open file),列举系统中已被打开的文件，通过该命令可以根据文件找到对应的进程信息，也可以通过进程信息找到进程打开的文件。

语法: lsof [option]

| 参数        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| -c <进程名> | 显示指定进程名打开的文件                                     |
| -p <进程号> | 显示指定进程号打开的文件                                     |
| -i          | 通过监听指定的协议，端口和主机等信息，显示符合条件的进程信息 |
| -u          | 显示指定用户使用的文件                                       |
| -U          | 显示所有 socket 文件                                         |

```shell
# 通过文件找到对应的进程
lsof /usr/local/bin/node
# COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF       NODE NAME
# node    44052 root  txt    REG    1,4 80181216 8635790507 /usr/local/bin/node
```

COMMAND 进程的名称
FD 文件描述符
TYPE 文件类型 REG 为普通文件
DEVICE 磁盘名称
SIZE/OFF 文件的大小
NODE 索引节点

```shell
# 通过指定进程名查找
lsof -c node
# COMMAND   PID USER   FD     TYPE             DEVICE SIZE/OFF       NODE NAME
# node    44052 root  cwd      DIR                1,4      512 8598690206 /private/var/root
# node    44052 root  txt      REG                1,4 80181216 8635790507 /usr/local/bin/node

# 通过指定进程号查找
lsof -p 44052
# ...

# lsof -i可查看所有的进程进行
# 监听指定协议，端口，主机等信息
lsof -i [46] [protocol] [@hostname] [:service|port]
```

46: IPv4 IPv6
protocol:传输协议可以是 TCP 或 UDP
hostname: 主机名称或 IP 地址
service: 进程的服务名，eg: NFS,SSH,FTP 等

<h3 id="free">2. free 查看系统内存信息</h3>

功能说明: 用于显示系统内存状态，具体包括系统物理内存，虚拟内存，共享内存和系统缓存。

语法: free [option]

| 参数          | 说明                                   |
| ------------- | -------------------------------------- |
| -b            | 以 byte 为单位显示内存使用情况         |
| -m            | 以 MB 为单位显示内存使用情况           |
| -k            | 以 KB 为单位显示内存使用情况(默认)     |
| -h            | 以 人类可读形式显示内存使用情况        |
| -t            | 显示内存总和列                         |
| -s <间隔秒数> | 根据间隔的秒数，持续显示内存的使用情况 |
| -o            | 不显示系统缓存区列                     |

```shell
free -h
#               total        used        free      shared  buff/cache   available
# Mem:            15G        1.8G        3.2G        158M         10G         13G
# Swap:            0B          0B          0B
```

buff 为写入数据缓存区
cache 为读取数据缓存区

<h3 id="iftop">3. iftop 动态显示网络接口流量信息 </h3>

功能说明: 实时流量监控工具，用于监听 TCP/IP 连接

语法: iftop [option]

| 参数 | 说明                             |
| ---- | -------------------------------- |
| -i   | 指定网卡                         |
| -n   | 不进行 DNS 解析                  |
| -N   | 不解析端口为服务名               |
| -B   | 以 byte 为单位显示               |
| -P   | 显示端口                         |
| -p   | 设定网卡为混杂模式，监听所有网卡 |

```shell
iftop -nNBP
```

<h3 id="vmstat">4. vmstat 虚拟内存统计 </h3>

功能说明: vmstat（virtual memory statistics）虚拟内存统计。可以对操作系统的内存信息，进程状态和 CPU 活动等进行监视。

语法: vmstat [option] [delay [count]]

| 参数 | 说明                                      |
| ---- | ----------------------------------------- |
| -a   | 显示活跃和非活跃内存                      |
| -f   | 显示从系统启动至今的 fork 进程数量        |
| -m   | 显示 slab 信息                            |
| -s   | 显示内存相关统计信息及多种系统活动数量    |
| -d   | 显示磁盘相关统计信息                      |
| -p   | 显示指定磁盘分区统计信息                  |
| -S   | 使用指定单位（k,K,m,M）显示，默认单位为 K |

```shell
# 显示虚拟内存的使用情况
vmstat
# procs -----------memory----------    ---swap-- -----io---- -system--  ------cpu-----
#  r  b   swpd   free     buff   cache   si   so    bi    bo   in   cs  us sy id wa st
#  1  0      0 3109456 1263540 8944292    0    0     1    40    0    1   1  2 96  1  0
# 每5s更新一次，6次后停止输出
vmstat 5 6
# 内存使用信息
vmstat -s
# 磁盘的读写
vmstat -d
```

- procs
  - r 表示正在运行和等待 CPU 时间片的进程数
  - b 表示正在等待资源的进程数
- memory
  - swpd 使用虚拟内存的大小
  - free 当前空闲的物理内存数量
  - buff 表示 buffs 的内存数量
  - cache cache 的内存数量
- swap
  - si (swap in) 磁盘调入内存
  - so (swap out) 内存调入磁盘
- io
  - bi 读磁盘
  - bo 写磁盘
- system
  - in 每秒设备中断数
  - cs 每秒产生的上下文切换次数
- cpu
  - us 用户进程消耗 CPU 时间百分比
  - sy 系统进程消耗 CPU 时间百分比
  - id CPU 所在空闲时间的百分比
  - wa I/O 等待所占用的 CPU 时间百分比
  - st 虚拟机占用的 CPU 时间的百分比

<h3 id="mptat">5. CPU 信息统计 </h3>

功能说明: mpstat (multiprocessor statistics) 实时系统监控工具。在多 CPU 系统里，还能查看特定 CPU 的信息。对比 vmstat 只能查看系统的整体情况

语法: mpstat [option] [delay [count]]

| 参数 | 说明                                                                     |
| ---- | ------------------------------------------------------------------------ |
| -P   | 指定 CPU 编号，eg: -P 0 第一个 CPU，-P 1 第二个 CPU，-P ALL 表示所有 CPU |

```shell
mpstat
# Linux 4.14.81.bm.15-amd64 (110)         07/19/2022      _x86_64_        (8 CPU)

# 09:11:39 PM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
# 09:11:39 PM  all    1.46    0.00    2.08    0.51    0.00    0.04    0.13    0.00    0.00   95.77
# 每5s更新一次 打印6次
mpstat 5 6
# 显示第一个CPU的信息
mpstat -P 0
```

%user 用户进程消耗 CPU 时间百分比
%nice 改变过优先级的进程占用 CPU 的百分比
%sys 系统消耗 CPU 时间百分比
%iowait IO 等待占用 CPU 时间百分比
%irq 硬终端占用的 CPU 时间百分比
%soft 软终端占用的 CPU 时间百分比
%steal 虚拟机强制 CPU 等待的时间百分比
%guest 虚拟机占用 CPU 时间的百分比
%idle CPU 处在空闲状态的时间百分比

<h3 id="iostat">6. iostat I/O 信息统计 </h3>

功能说明: 对系统的磁盘 I/O 操作进行监视。主要是显示磁盘读写操作的统计信息，同时也会给出 CPU 的使用情况。

语法: iostat [option] [delay [count]]

| 参数      | 说明                                       |
| --------- | ------------------------------------------ |
| -c        | 显示 CPU 的使用情况                        |
| -d        | 显示磁盘的使用情况                         |
| -k        | 以 KB 为单位显示数据                       |
| -m        | 以 MB 为单位显示数据                       |
| -n        | 显示 NFS 的使用情况                        |
| -p device | 指定统计的磁盘设备名称，默认位所有磁盘设备 |
| -x        | 显示扩展信息                               |

```shell
# 默认显示CPU和磁盘信息
iostat
# Linux 4.14.81.bm.15-amd64 (110)         07/19/2022      _x86_64_        (8 CPU)

# avg-cpu:  %user   %nice %system %iowait  %steal   %idle
#            1.46    0.00    2.12    0.51    0.13   95.77

# Device:            tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
# sdb              28.83         4.99       205.52   42707225 1759200540
# scd0              0.00         0.01         0.00      84420          0
# sda              13.16         1.73       144.61   14802182 1237880482
# 每5s更新一次 打印6次
iostat 5 6
# 显示第一个CPU的信息
iostat -P 0
```

<h3 id="sar">7. sar 收集系统信息 </h3>

功能说明: 全面的获取系统的 CPU，运行对列，磁盘 I/O，分页（交换区），内存，CPU 中断和网络等性能数据。

语法: sar [option] [delay [count]]

| 参数        | 说明                                              |
| ----------- | ------------------------------------------------- |
| -A          | 显示系统所有资源设备（CPU，内存，磁盘）的运行状况 |
| -u          | 显示 CPU 的使用情况                               |
| -r          | 显示内存的使用情况                                |
| -d          | 显示磁盘的使用情况                                |
| -n keyword  | 网络的运行状态                                    |
| -o filename | 命令以二进制形式存放在文件中                      |

```shell
# 第一次运行该，命令可能会报错：无法打开 /var/log/sa/sa17 执行一下命令即可
sar -o 17
sar -u
sar -r
sar -d
sar -n DEV
```
