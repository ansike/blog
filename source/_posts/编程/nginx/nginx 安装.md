---
title: nginx 安装
categories: 编程
date:
---

# mac 下 nginx 的安装

```shell
# 安装
brew install nginx

# 查看安装信息
brew info nginx

# nginx: stable 1.21.6 (bottled), HEAD
# HTTP(S) server and reverse proxy, and IMAP/POP3 proxy server
# https://nginx.org/
# /usr/local/Cellar/nginx/1.21.6_1 (26 files, 2.2MB) *
#   Poured from bottle on 2022-09-12 at 16:01:38
# From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/nginx.rb
# License: BSD-2-Clause
# ==> Dependencies
# Required: openssl@1.1 ✔, pcre2 ✔
# ==> Options
# --HEAD
# 	Install HEAD version
# ==> Caveats
# Docroot is: /usr/local/var/www

# The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
# nginx can run without sudo.

# nginx will load all files in /usr/local/etc/nginx/servers/.

# To restart nginx after an upgrade:
#   brew services restart nginx
# Or, if you don't want/need a background service you can just run:
#   /usr/local/opt/nginx/bin/nginx -g daemon off;
# ==> Analytics
# install: 34,533 (30 days), 125,389 (90 days), 464,994 (365 days)
# install-on-request: 34,479 (30 days), 125,159 (90 days), 464,089 (365 days)
# build-error: 1 (30 days)
```

从上文的日志中我们可以看到 当前 nginx 安装的路径（/usr/local/etc/nginx/）和静态服务监听的目录（/usr/local/var/www）
接下来我们使用的部分主要就是着重对 nginx.conf 相关文件做一些简单的配置和在静态目录配置一些预期的文件

**打开 error 和 access 日志**

```
# error 日志
error_log logs/error.log;

# access 日志
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';

access_log  /usr/local/etc/nginx/logs/access.log  main;
```

# nginx 实验

### 实验一 打印 nginx 的 status

借助 nginx 提供的模块`--with-http_stub_status_module` 通过 brew 安装的版本默认有这个模块

我们需要新增一个 server，但是为了保证实验的整洁，我们在`/usr/local/etc/nginx/`新建一个 `nginx.conf.d` 文件夹，将后续实验的配置文件都放到目录中
在`/usr/local/etc/nginx/nginx.conf`的倒数第二行新增一行 include，确保所有的 conf 都能加入到 nginx 的配置中

```
include nginx.conf.d/*.conf;
```

编写 conf 文件，打开 stub_status

```shell
cat >nginx.conf.d/status.conf<<EOF
server {
  listen 8082; # 服务暴露的端口，稍后通过端口访问服务
  location / {
    stub_status on; # 关键在这行
    access_log  off;
  }
}
EOF
nginx -s reload
```

验证 nginx 的状态

```shell
curl http://localhost:8082

# 结果
# Active connections: 1
# server accepts handled requests
#  17 17 71
#  连接数 握手数 请求数
# Reading: 0 Writing: 1 Waiting: 0
```

### 实验二 访问日志轮训切割

1. 在`/usr/local/etc/nginx/`目录下配置创建 shell 文件夹，创建 cut_access.sh 文件，内容如下

```shell
#!/bin/sh
set -e
Dateformat=$(date '+%Y%m%d%H%M%S')
NginxLogDir=/usr/local/etc/nginx/logs
BackupLogDir=/usr/local/etc/nginx/logs/backup
Logname="access"

# 创建备份文件夹
[ -d $BackupLogDir ] || mkdir -p $BackupLogDir

# 进入logs目录
[ -d $NginxLogDir ] && cd $NginxLogDir || exit 1

# 判断是否存在access.log文件
[ -f "${Logname}".log ] && echo 12 || exit 1

# 备份文件
/bin/mv "${Logname}".log "${BackupLogDir}/${Dateformat}_${Logname}".log

# 重启服务，重新生成文件
/usr/local/bin/nginx -s reload

```

2. 设置定时任务

因为还需要定时的备份，所以需要定时任务

```shell
# 查看当前已有的定时任务
crontab -l

# 创建定时任务文件
cat >cron<<EOF
# nginx 日志切割
# 每分钟执行一次任务
*/1 * * * * /bin/bash /usr/local/etc/nginx/shell/cut_access.sh
EOF

# 设置定时任务
crontab cron
```

> 此时观察 backup 目录下的 access 文件即可看到在不断的创建，而且时间间隔正好都是 1 分钟，实际的生成中日志切割不仅仅是时间一个纬度，还有日志文件的大小。

### 实验三
