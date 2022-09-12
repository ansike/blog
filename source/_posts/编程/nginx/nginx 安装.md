---
title: nginx 安装
categories: 编程
date: 2022-06-20 23:37:39
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
# Reading: 0 Writing: 1 Waiting: 0
```
