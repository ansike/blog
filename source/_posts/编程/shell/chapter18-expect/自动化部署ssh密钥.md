---
title: expect相关
categories: 编程
tags: shell
date: 
---

#### expect常用命令
```shell

```

#### 自动化部署ssh密钥
1. 生成密钥
```shell
# 生成专有密钥
# ssh-keygen -t rsa -f ~/.ssh/id_rsa_expect.pub -P ""
publicKey=~/.ssh/id_rsa_expect.pub
```
2. 书写expect文件,执行的单元文件
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

3. 开发shell脚本循环执行expect脚本
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