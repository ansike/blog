---
title: expect相关
categories: 编程
tags: shell
date: 2022-08-01 23:33:02
---

#### expect 常用命令

```shell

```

#### 自动化部署 ssh 密钥

1. 生成密钥

```shell
# 生成专有密钥
# ssh-keygen -t rsa -f ~/.ssh/id_rsa_expect.pub -P ""
publicKey=~/.ssh/id_rsa_expect.pub
```

2. 书写 expect 文件,执行的单元文件

```shell
#!/bin/usr/expect
if { $argc != 2 } {
  send_user "usage: expect publicKeyPath,host \n"
  exit
}

# define vars
set file [lindex $argv 0]
set host [lindex $argv 1]
set password "Ask.2222"

# start exec command
spawn ssh-copy-id -i $file "root@$host"
expect {
  "yes/no" {send "yes\r";exp_continue}
  "*password" {send "$password\r"}
}
expect eof
```

3. 开发 shell 脚本循环执行 expect 脚本

```shell
#!/bin/bash
hosts=(
  47.98.143.211
)
for host in $hosts
do
  expect expect.exp ~/.ssh/id_rsa_expect.pub $host
done
```
