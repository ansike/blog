---
title: 监控Nginx和Mysql服务是否正常,如果未启动则启动相应服务
categories: 编程
tags:
date: 2021-02-21 00:12:35

---

> 环境：CentOS Linux release 8.1.1911 (Core)
> 软件：
>
> > mysql Ver 8.0.21 for Linux on x86_64 (Source distribution),
> > nginx version: nginx/1.14.1

## 一、问题分析

1. 怎么判断服务是否正常运行
2. 启动相应的服务

### 1.1、判断服务正常运行

1. 通过查询服务监听端口

- 本地端口查询常见命令：netstat,ss,lsof
- 远程端口查询常见命令：telnet,nmap,nc

2. 查询服务启动进程

- ps -ef | grep nginx | wc -l
- ps -ef | grep mysql | wc -l

3. 访问服务提供的能力

- web 服务可以直接使用 wget 或者 curl 访问
  > 判断执行返回值$?
  > 返回特殊字符
  > 跟进 http 响应头
- mysql 可以连接客户端，根据返回值或返回内容判断
- 命令解析
  > 1.netstat -lntp # 查询网络服务中（状态为监听【l:listen】，端口保持数字【n:numberic】，TCP 服务【t:tcp】，展示服务进程名称【p:process】）的服务
  > 2.ss -lntp # 和上方的参数含义一致，注意 n 是必须的，否则会被泛解析成 service name
  > 3.lsof -i -n -P # i 监听的文件，-n[numberic]这个是禁止 host 转换为 host name 和上边两个不一样，-P 禁止转换端口
- Tips：对端口和进程进行判断时，先通过 grep 过滤端口和进程，然后通过`wc -l`转换为行数进行判断。如果确实想采用取值的办法最好转换为字符串进行比较

### 1.2、启动相应的服务

1. `nginx` 直接启动 `man nginx` 查看命令
2. `systemctl start mysqld.service`
   > mysql 是客户端程序，mysqld 是服务端程序。这就是为什么要启动 mysql 服务，需要启动的是 mysqld 而不是 mysql。且 mysqld 启动的后就可以用 mysql 连接了。

## 二、Nginx 服务监听

1. 端口号判断
```shell
# 通过端口号比较
# 该方法在服务未启动，端口不存在会报错
[ "`netstat -lnt | grep 80 | awk -F "[ :]+" 'NR==1 {print $5}'`" -eq "80" ] && {
  echo "Nginx is running."
} || {
  echo "Nginx is stopped."
  # 启动nginx
  nginx
}

# netstat通过行数判断【推荐】
[ `netstat -lntp | grep 80 | wc -l` -gt 0 ] && {
  echo "Nginx is running."
} || {
  echo "Nginx is stopped."
  # 启动nginx
  nginx
}

# ss通过行数判断【推荐】
[ `ss -lntp | grep 80 | wc -l` -gt 0 ] && {
  echo "Nginx is running."
} || {
  echo "Nginx is stopped."
  # 启动nginx
  nginx
}

# lsof通过行数判断【推荐】
# [ `lsof -i -n -P | grep 80 | wc -l` -gt 0 ] && {
[ `lsof -i:80 -n -P | wc -l` -gt 0 ] && {
  echo "Nginx is running."
} || {
  echo "Nginx is stopped."
  # 启动nginx
  nginx
}

# 通过telnet判断连接状态
# echo的作用是关闭连接，不输出错误
[ `echo "" | telnet www.baidu.com 80 2>/dev/null | grep Connected | wc -l` -gt 0 ] && {   echo "服务状态：success"; }

# 通过nmap扫描到的`open`判断服务状态
# 如果为filtered说明包过滤阻止探测报文到达端口。服务不一定没有启动，可能有防火墙
[ `nmap www.baidu.com -p 80 | grep open | wc -l` -gt 0 ] && {
  echo "服务状态：success"
}

# 通过nc扫描结果判断服务状态
nc -w 2 www.baidu.com 80
[ $? -eq 0 ] && {
  echo "服务状态：success"
}

```

2. 进程判断
- 通过这种方式去grep进程时一定要注意把当前命令从结果中排除，添加`| grep -v grep |`管道，否则会拿到grep进程包含服务名称的查找
```shell
# ps通过行数判断【推荐】
[ `ps -ef | grep -v grep | grep nginx | wc -l` -gt 0 ] && {
  echo "Nginx is running."
} || {
  echo "Nginx is stopped."
  # 启动nginx
  nginx
}
```
3. 访问服务提供的能力
```shell
curl http://www.baidu.com &>/dev/null --connect-timeout 1
echo $? # 0

# 将com换成con
curl http://www.baidu.con &>/dev/null --connect-timeout 1
echo $? # 非0
# wget 类似

# 根据http状态码去判断
curl -I www.baidu.com -o /dev/null -s -w "%{http_code}\n" # 200
```
## 三、Mysql 服务监听
mysql的判断和nginx类似，以下备注会减少
1. 端口号判断
```shell
# 本地端口查询
[ "`netstat -lnt | grep 3306 | awk -F "[ :]+" 'NR==1 {print $5}'`" -eq "3306" ] && {
  echo "Mysql is running."
} || {
  echo "Mysql is stopped."
  # 启动Mysql
  systemctl start mysqld
}

[ `netstat -lnt | grep 3306 | wc -l` -gt 1 ] && {
  echo "Mysql is running."
} || {
  echo "Mysql is stopped."
  # 启动Mysql
  systemctl start mysqld
}

[ `ss -lnt | grep 3306 | wc -l` -gt 1 ] && {
  echo "Mysql is running."
} || {
  echo "Mysql is stopped."
  # 启动Mysql
  systemctl start mysqld
}

# [ `ss -i:3306 -n -P | wc -l` -gt 1 ] && {
[ `ss -i -n -P | grep 3306 | wc -l` -gt 1 ] && {
  echo "Mysql is running."
} || {
  echo "Mysql is stopped."
  # 启动Mysql
  systemctl start mysqld
}

# 远程端口查询
[ `echo "" | telnet 127.0.0.1 3306 2>/dev/null | grep Connected | wc -l` -gt 0 ] && {   echo "服务状态：success"; }
[ `nmap 127.0.0.1 -p 3006 | grep open | wc -l` -gt 0 ] && {
  echo "服务状态：success"
}

# 通过nc扫描结果判断服务状态
nc -w 2 127.0.0.1 3006
[ $? -eq 0 ] && {
  echo "服务状态：success"
}
```

2. 进程判断
```shell
# ps通过行数判断【推荐】
[ `ps -ef | grep -v grep | grep mysqld | wc -l` -gt 0 ] && {
  echo "mysqld is running."
} || {
  echo "mysqld is stopped."
  # 启动mysql服务
  systemctl start mysqld
}
```

3. 服务判断
使用mysql客户端连接mysqld服务判断