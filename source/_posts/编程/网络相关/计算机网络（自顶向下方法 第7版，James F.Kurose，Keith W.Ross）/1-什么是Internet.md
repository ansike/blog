---
title: 什么是Internet？
categories: 编程
tags:
  - 网络
date: 2023-05-04 09:51:36
---

来自[中科大郑烇、杨坚全套《计算机网络（自顶向下方法 第7版，James F.Kurose，Keith W.Ross）》课程](https://www.bilibili.com/video/BV1JV411t7ow/?spm_id_from=333.337.search-card.all.click&vd_source=22653c02dfbe0c9c7bb4a200eb87fe4e)


{% asset_img 20230430-181317.jpeg 概述 %}

网路：由节点和边组成（蜘蛛网，神经元网络）

计算机网络：联网的计算机构成的系统。
- 主机节点（电脑，手机，ipad，联网冰箱，机顶盒，web服务器等），数据交换节点（路由器，交换机）
互联网

<a href="#internet">1.1 什么是Internet？</a>
<a href="#edge">1.2 网络边缘</a>
<a href="#core">1.3 网络核心</a>
<a href="#access">1.4 接入网和物理媒体</a>
<a href="#internet&isp">1.5 Internet结构和ISP</a>
<a href="#group">1.6 分组延时、丢失、吞吐量</a>
<a href="#protocol">1.7 协议层次和服务模型</a>
<a href="#history">1.8 历史</a>

<h1 id="internet">什么是Internet？</h1>

- 从具体构成角度看
  - 节点
    - 主机及其上运行的应用程序
    - 路由器、交换机等网络交换设备
  - 边
    - 接入网链路：主机连接到互联网的链路
    - 主干链路：路由器间的链路
  - 协议 对等层实体在通信过程中应该遵循的规则的集合
    - TCP/IP协议簇构成的网络
  - 数以亿计的互联网计算设备
    - 主机=端系统 （host=end system）
    - 运行网络应用程序
  - 通信链路
    - 光纤，同轴电缆，无线电，卫星
    - 传输速率=带宽（bps）
  - 分组交换设备（转发分组 packets）
    - 路由器和交换机
  - 协议控制发送和接受消息（TCP、IP、HTTP、FTP、PPP）
  - Internet（网络的网络）
    - 松散的层次结构，互联的ISP
    - 公共的Internet vs 专用的intranet
  - Internet标准
    - RFC：request for comment
    - IETF：Internet Engineering Task Force
- 从服务的角度看
  - 使用基础设施进行通讯的分布式应用（web，email，分布式游戏，电子商务，社交网络...）
  - 通信设施为apps提供编程接口
    - 将发送和接受数据的apps与互联网连接起来
    - 为app应用提供服务选择，类似于邮政服务：
      - 无连接不可靠服务
      - 面向连接的可靠服务

分布式应用是网络存在的理由

**互联网就是分布式应用以及分布式应用提供通信服务的基础设施**。

<h1 id="edge">网络边缘</h1>

另外一个角度拆解互联网：按组成类型来把互联网分成一个个的子系统
### 网络结构
- 网络边缘
  - 主机
  - 应用程序（客户端和服务器）
- 网络核心
  - 互联着的路由器
  - 网络的网络
- 接入网和物理媒介
  - 有线或者无线通信线路

{% asset_img 20230501-195220.jpeg 概述 %}

### 网络边缘
- 端系统（主机）
  - 运行应用程序
  - 如web，email
  - 在“网络的边缘”
- 客户/服务器模式
  - 客户端向服务器请求，接受服务
  - 如web浏览器/服务器；email客户端/服务器
- 对等（peer-peer）模式
  - 很少，甚至没有专门的服务器
  - 如迅雷，电驴等

采用基础设施的无连接服务


<h1 id="core">1.3 网络核心</h1>

- 电路交换（线路交换）
  - 端到端的资源分配，从源端到目标端的呼叫“call”
  - 通过信令（控制信号）
  - 独享的资源，一般是传统电话
  - 网络资源分片（piece）
    - 频分
    - 时分
    - 波分
  - 线路交换不适合计算机通信
    - 建立时间过长
    - 计算机之间有较多的突发性（有时候才会有通信动作），如果使用线路交换，浪费的时间片较多
- 分组交换 packet switch
  - 以分组为单位存储-转发
    - 网络资源不再分为一个个片，传输时使用全部的带宽
    - 主机之间的传输数据被分为一个个分组
  - 资源共享，按需使用
    - 存储-转发：分组每次移动一跳
      - 在转发之前节点必须收到整个分组
      - 延迟比线路交换要大
      - 增加了排队时间
      <!-- TODO 题目  -->
  - 排队延迟和丢失
    - 如果达到速率 > 输出速率
      - 分组将会排队等待传输
      - 如果路由器的缓存用完了，分组将会丢弃
  - 关键功能
    - 路由 决定分组采用的源到目标的路径
    - 转发 将分组从路由器的输入链路到输出链路
  - 统计多路复用
  - 虚电路和数据报网络

**线路交换 VS 分组交换**


<h1 id="access">1.4 接入网和物理媒体</h1>

**怎样将端系统和边缘路由器连接？**
- 住宅接入网络 modem
  - 调制解调 电话线
  - DSL/ADS
  - 线缆网络
- 单位接入网络（学校，公司）
- 无线接入网络
  - 各无线端系统共享无线接入网络（端系统到无线路由器）通过基站或者叫接入点
    - 无线LANs
      - WIFI 无线路由器
      - 
    - 广域无线接入
      - 3G,4G
  
### 物理媒体
  - 物理链路：在每个传输-接受对，跨越一种物理媒介
  - 媒体类型
    - 导引型媒体：信号沿着固体媒介被引导（如同轴电缆，光线，双绞线）
      - 双绞线（TP）
        - 两根绝缘铜线
          - 5类：100Mbps Ethernet Gbps以太网
          - 6类：10Gbps
      - 同轴电缆
        - 两根铜芯的铜导线
        - 双向
        - 基带电缆
          - 电缆上的一个单带信道
          - Ethernet
        - 宽带电缆
          - 电缆上有多个信道
          - HFC
          - 
      - 光缆
        - 光脉冲，每个脉冲表示一个bit，在玻璃纤维中传输
        - 高速：点到点的高速传输（10Gbps-100Gbps）
        - 低误码率：两个中继器之间可以有很长的距离，不受电磁噪声的干扰
        - 安全
    - 非导引型媒体：信号自由传播（如无线电）
      - 地面微波
      - LAN（WIFI）
      - wide area（蜂窝）
      - 卫星
 
<h1 id="internet&isp">1.5 Internet结构和ISP</h1>

端系统通过接入ISPs（Internet Service Providers）接入到互联网
给定数百万接入ISPs，如何将他们互联到一起？
将每两个ISP直接相连是不可扩展的，需要O(n^2)连接，不可扩展。
现在的解法：将每个接入的ISP都接入全局ISP

内容提供商（Internet Content Provider，Google、Microsoft、Akamai）可能会构建自己的网络，将他们的服务、内容更加靠近端用户，向用户提供更好的服务，减少自己的运营支出。

**ISP是松散的层次模型**
- 中心：第一层ISP，国家或国际覆盖，速率极高
  - 直接与其他第一层ISP相连
  - 与大量的第二层ISP和其他客户网络相连
- 第二层ISP：更小些的（通常是区域性的）ISP
  - 与一个或多个第一层的ISPs，也可能与其他第二层ISP
- 第三层ISP与其他本地ISP
  - 接入网（与端系统最近）

**ISP之间的连接方式**
- POP 高层ISP面向客户网的接入点，涉及费用的结算
  - 如一个底层ISP接入多个高层ISP，多宿（multi home）
- 多等接入：2个ISP对等互接，不涉及费用计算
- IXP：多个对等ISP互通互联，通常不涉及费用结算
- ICP部署自己的专有网络同时和各级ISP相连

<h1 id="group">1.6 分组延时、丢失、吞吐量</h1>


**分组丢失的原因？**
分组到达路由器时如果已经有数据在传输需要等待上一个分组传输完成才能传输新接受到的分组；
当路由器的分组队列溢出时将不会再接受新的分组导致分组的丢弃。

**为什么不把分组调大？**
调大分组之后溢出的可能性会降低，但是服务的响应速度也不会加快，用户无法很快获得响应，用户很快丢失。

**四种分组延迟**
- 节点处理延迟
  - 检查bit级差错
  - 检查分组首部和决定将分组导向何处
- 排队延迟
  - 在输出链路上等待传输的时间
  - 依赖于路由器的拥塞程度
- 传输延时
  - 将分组发送到链路上的时间 L/R
  - R=链路带宽（bps）
  - L=分组长度（bits）
  - 存储转发延迟
- 传播延迟
  - 传播延时=d/s
  - d=物理链路的长度
  - s=在媒体上的传播速度

d(nodal) = d(proc)+d(queue)+d(trans)+d(prop)

流量强度 = La/R
- R = 链路带宽（bps）
- L = 分组长度（bits）
- a = 分组到达队列的平均速率

设计系统时流量强度不能大于1，最好是小于1。

TTL(Time To Live)
RTT(Round Trip Time)

**吞吐量**
在源端到目标端的传输速率（数据量/单位时间）

{% asset_img 20230504-094906.jpeg 分组交换VS电路交换 %}

<h1 id="protocol">1.7 协议层次和服务模型</h1>

**网络是一个复杂的系统**

- 网络功能繁杂：数字信号的物理信号承载、点到点、路由、rdt、进程区分、应用等。
- 现实来看，网络的许多构成元素和设备
  - 主机
  - 路由器
  - 各种媒体的链路
  - 应用
  - 协议
  - 硬件、软件

**层次化方式实现复杂的功能**
- 将网络复杂的功能分成功能明确的层次，每一层实现了其中一个或一组功能，功能中有其上层可以使用的功能；
- 本层协议实体相互交互执行本层的协议动作，目的是实现本层的功能，通过接口为上层提供更好的服务。
- 在实现本层协议的时候，直接利用了下层所提供的服务
- 本层的服务，借助下层服务实现的本层协议实体之间交互带来的新功能（上层可以利用的）+下层所提供的服务

**服务和服务访问点**  
- 服务： 底层实体向上层实体提供他们之间的通信服务
  - 服务用户（service user）
  - 服务提供者（service provider）
- 原语（primitive）：上层使用下层服务的形式，高层使用底层提供的服务，以及底层向高层一个服务都是通过服务访问原语来进行交互的---形式
- 服务访问点SAP（Services Access Point）：上层使用下层提供的服务通过层间的借口---地点
  - 地址（address）：下层的一个实体支撑着上层的多个实体，SAO有标志不同上层实体的作用
  - 可以有不同的实现 队列
  - 例子 传输层的SAP 端口（port）

**服务的类型**
- 面向连接的服务 TCP
- 无连接服务 UDP

**服务和协议**
- 区别：
  - 服务：低层实体向上层实体提供他们之间的通信的能力，是通过原语来操作的，垂直
  - 协议：对等层实体之间在相互的通信的过程中，需要遵循的规则的集合，水平
- 联系
  - 本层协议的实现需要靠下层提供的服务来实现
  - 本层实体通过协议为上层提供更好的服务

**数据单元（DU）**
协议数据单元PDU（protocol Data Unit）

每一层协议数据单元有特殊的称呼
- 应用层 数据单元叫应用报文 message
- 传输层 数据单元叫应用报文段 segment
- 网络层 数据单元叫分组 packet （如果无连接方式：数据报 datagram）
- 链路层 数据单元叫帧 frame
- 物理层 数据单元叫位 bit 

**Internet协议栈**
- 应用层 
  - 为人类用户或者其他应用进程提供网络应用服务
  - FTP、SMTP、HTTP、DNS
- 传输层 
  - 在网络层的基础上细分 为进程到进程，将不可靠的通信编程可靠的通信
  - TCP、UDP
- 网络层 
  - 源主机到目标主机，端到端（E2E）传输分组 不可靠
  - IP、路由协议
- 数据链路层（网卡） 
  - 在相邻两点之间传输以帧为单位的数据
  - 点对点协议PPP、802.11（wifi）、Ethernet
- 物理层 在线路上传输bit


<h1 id="history">1.8 历史</h1>

**早期（1960以前）的计算机网络**
- 线路交换网络
- 线路交换的特性使得其不适合计算机之间的通信
  - 线路建立时间过长
  - 独享方式占用通信资源，不适合突发性很强的计算机之间的通信
  - 可靠性不高，非常不适合军用通信

**1961-1972 早期的分组交换概念**
- 1967:美国高级研究计划研究局考虑ARPAnet
  - kleinrock在MIT的同事
- 1969:第一个ARPAnet节点开始工作，UCLA
  - IMP 接口报文处理机
- 1969年底： 4个节点
- 1972:
  - ARPAnet公众演示
  - 网络控制协议是第一个端系统直接的主机-主机协议
    - NCP协议：相当于传输层和网络层在一起，支持应用开发
  - 第一个e-mail程序（BBN）
  - ARPNet有15个基点
  
**1972-1980 专用网络和网络互联**
- 出现了很多对后来来说重要的网络形式
  - 1970 ALOHAnet 夏威夷上的微波网络
  - 1973 Metcalfe在博士论文中提出了Ethernet
  - ATM网络
  - ALOHAnet，Telenet，Cyclades法国等
- 1970后期，网络体系结构的必要性
  - 专用的体系结构：DECnet，SNA，XNA
  - 标准化的体系结构
- 1974 国际互联的Cerf and Kahn体系结构
  - 网络互联原则 定义了今天的Internet体系结构
    - 极简，自治
    - 尽力而为（best effort）服务模型
    - 无状态的路由器
    - 分布控制
- 1979 ARPAnet的规模在持续增加，体系结构也在酝酿着变化，以支持网络互联和其他目的（性能）需求
  - 节点树木增加，有200个节点

**1980-1990 体系结构变化，网络数量激增，应用丰富**
- 1983: TCP/IP部署，标记日
  - NCP分化成2个层次，TCP/IP，从而出现UDP
  - 覆盖式IP解决网络互联问题
  - 主机设备和网络交换设备分开
- 1982: smtp e-mail协议定义
- 1983: DNS定义，完场域名到IP地址的转换
- 1985: ftp协议定义
- 1988: TCP拥塞控制协议
- 其他网络形式的发展
  - 新的国家级网络：Csnet，BITnet，NSFnet，Minitel
  - 1985年：ISO/OSI提出，时机不对且太繁琐
- 100,000主机连接到网络联邦

**1990-2000's 商业化，Web，新的应用 **
- 1990年代初：NSF对ARPAnet的访问网，双主干，ARPAnet退役
- 1991:NSF放宽了对NSFnet用于商业目的的限制（1995退役）。ASFNET非盈利机构维护，后面叫Internet
- UNIX中TCP/IP的免费捆绑
- 1990年代初：Web
  - hypertext【Bush 1945, Nelson 1960's】
  - HTML, HTTP; Berners-Lee
  - 1994: Mosaic(Netscape, andreesen)
  - 1990年代后期：Web的商业化
- 1990后期-21世纪
  - TCP/IP体系结构的包容性在其上部署应用便捷，出现非常多的应用
  - 新一代杀手级应用（即时讯息，P2P文件共享，社交网络等）更进一步促进互联网的发展
  - 安全问题不断出现和修订（互联网的补丁对策）
  - 2001网络泡沫，使得一些好公司沉淀下来（谷歌，微软，苹果，Yahoo，思科）
  - 主干网的速率达到Gbps

**2005-现在**
- 50亿主机：包括智能手机和平板
- 宽带接入的快速部署
- 高速无线接入无处不在：移动互联时代
  - 4G部署，5G蓄势待发
  - 贷款大，终端性能高，价格便宜，应用不断增多
- 在线社交网络等新型应用的出现
  - Facebook 10亿用户
  - 微信，qq 输十亿用户
- 服务提供商（Google， Microsoft）创建自己的网络
  - 通过自己的专用网络提供对搜索、视频内容和电子邮件的即刻访问
- 电子商务，大学，企业在云中运行他们的服务（Amazon EC2）
- 体系结构酝酿着大的变化，未来网络蠢蠢欲动
