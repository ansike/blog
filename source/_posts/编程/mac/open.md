---
title: open命令
categories: 编程
tags:
  - mac
date: 2022-10-05 10:00:35
---

mac 中可以使用 open 命令打开文件，目录，应用程序等，实现一些便捷的操作。

### 自动打开程序

使用以下命令自动打开 terminal，执行自动登录的脚本

```shell
export HOST="172.17.1.1"; export VEUSER=root; export PASSWORD=xxxx; open -n -a iTerm /Users/ansike/scripts/sshLogin/ssh-login.exp

#-------auto login-------
#!/usr/bin/expect
set ipaddress "$env(HOST)"
set user "$env(VEUSER)"
set passwd "$env(PASSWORD)"

set timeout 30

spawn ssh $user@$ipaddress
expect {
    "*password:" { send "$passwd\r" }
    "yes/no" { send "yes\r";exp_continue }
}
interact
#-------auto login-------
```

> 也可以 apple 自带的 script 去执行 osascript -e 'tell application "Terminal" to do script "expect /Users/ansike/sshLogin/ssh-login.exp"'
