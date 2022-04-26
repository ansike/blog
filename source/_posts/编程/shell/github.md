---
title: github访问
categories: 编程
tags: git
date: 2021-05-05 22:46:13
---

### 因为墙的缘故经常连接不上github
设置这些host, host可以从这个站点 https://ipaddress.com/ 去查
```shell
cat <<EOF>>/etc/hosts
140.82.113.3    github.com
185.199.108.153 assets-cdn.github.com
199.232.69.194  github.global.ssl.fastly.net
EOF
```