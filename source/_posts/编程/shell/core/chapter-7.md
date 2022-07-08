---
title: 用户管理及用户信息查询命令
categories: 编程
tags: shell
date:
---

<a href="#useradd">1. useradd 创建用户</a>
<a href="#usermod">2. usermod 修改用户信息</a>
<a href="#userdel">3. userdel 删除用户</a>

<h3 id="useradd">1. useradd 创建用户</h3>

语法: useradd [option] [name]

常规添加用户说明

1. 系统首先读取/etc/login.defs（用户定义文件） 和/etc/default/useradd（用户默认配置文件）文件中定义的参数和规则，然后根据预设的规则添加用户。
2. 向/etc/passwd（用户文件） 和/etc/group（组文件） 添加新用户和用户组纪录
3. 向/etc/shadow（用户密码文件） 和/etc/gshadow（组密码文件） 添加密码相关信息
4. 根据/etc/default/useradd 配置的信息建立 home 目录，并将/etc/skel 中所有文件复制到新的 home 目录中

| 参数       | 说明                    | 参数 | 说明                       |
| ---------- | ----------------------- | ---- | -------------------------- |
| -c comment | 新用户 comment          | -d   | 每次登录时使用的 home 目录 |
| -e         | 过期时间                | -m   | 用户目录不存在则自动创建   |
| -G         | 设置多个 group，用,隔开 | -m   | 用户目录不存在则自动创建   |

-D（改变用户的预设值） 添加用户说明
完全可以编辑/etc/default/useradd 来代替

```shell
# 创建新的用户，增加m参数会创建home目录
useradd -m platform
# 设置一下用户的密码
# 之后即可使用密码登录
passwd platform
# 查看设置的密码
cat /etc/shadow | grep platform

# sudo 切换权限
# 设置 platform ALL=(ALL:ALL) ALL
vim /etc/sudoers
```

<h3 id="usermod">2. usermod 修改用户</h3>

功能说明: 用于不同主机之间复制文件。scp 每次是全量完整复制，适合第一次复制，增量复制建议使用 rsync

语法: scp [option] [[user@]host1:]file1 [[user@]host2:]file2

| 参数 | 说明                |
| ---- | ------------------- |
| -c   | comment             |
| -d   | 指定 home           |
| -g   | 修改用户组          |
| -G   | 修改多个用户组      |
| -a   | 追加用户组与 G 连用 |

<h3 id="userdel">3. userdel 删除用户</h3>

语法: userdel [option] [username]

| 参数 | 说明                     |
| ---- | ------------------------ |
| -f   | 强制删除                 |
| -r   | 删除与用户相关的所有文件 |
