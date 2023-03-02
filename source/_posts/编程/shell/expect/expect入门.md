---
title: expect入门
categories: 编程
tags: expect
date: 2022-10-04 16:11:29
---

### expect 是什么？

是一种的脚本语言，是用来进行自动化控制和测试的工具。
主要和交互式软件（telnet，ssh，ftp，passwd）一起使用

mac 安装 expect

```shell
brew install expect
```

### 自动登录脚本

{% include_code ssh-login lang:sh expect/ssh-login.exp %}

以上的脚本只需要一键即可自动登录到对应的机器上

```shell
# 注意密码中有$时需要进行转义
./ssh-login.ex 172.17.1.1 "as\$xxx"
```

### scp 自动拷贝

{% include_code scp lang:sh expect/scp.exp %}

### 一次性执行脚本

登陆机器创建文件夹
{% include_code once-ssh lang:sh expect/once-ssh.exp %}

### 批量执行脚本

批量登陆机器执行`uname -a`命令
{% include_code batch-login lang:sh expect/batch-login.sh %}

### expect 主要命令

spawn 新建一个进程，这个进程的交互由 expect 控制
expect 等待接受进程返回的字符串，直到超时时间，根据规则决定下一步操作
send 发送字符串给 expect 控制的进程
set 设定变量为某个值
exp_continue 重新执行 expect 命令分支
[lindex $argv 0] 获取 expect 脚本的第 1 个参数
[lindex $argv 1] 获取 expect 脚本的第 2 个参数
set timeout -1 设置超时方式为永远等待
set timeout 30 设置超时时间为 30 秒
interact 将脚本的控制权交给用户，用户可继续输入命令
expect eof 等待 spawn 进程结束后退出信号 eof
