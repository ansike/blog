---
title: 用户管理及用户信息查询命令
categories: 编程
tags: shell
date: 2022-07-09 00:26:25
---

<a href="#useradd">1. useradd 创建用户</a>
<a href="#usermod">2. usermod 修改用户信息</a>
<a href="#userdel">3. userdel 删除用户</a>
<a href="#passwd">4. passwd 修改用户密码</a>
<a href="#su">5. su 切换用户</a>
<a href="#visudo">6. visudo 编辑 sudoers 文件 </a>
<a href="#sudo">7. sudo 以另一个用户身份执行命令</a>
<a href="#id">8. id 显示用户和用户组信息</a>
<a href="#w">9. w，who，users 显示已登陆用户信息</a>
<a href="#whoami">10. whoami 当前登录的用户名</a>
<a href="#last">11. last,lastb,lastlog 最近登录记录</a>

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
| -G         | 设置多个 group，用,隔开 |      |                            |

-D（改变用户的预设值） 添加用户说明
完全可以编辑/etc/default/useradd 来代替

```shell
# 目标创建新的用户，该用户可切换到root进行高权限操作
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

语法: usermod [option] [username]

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

<h3 id="passwd">4. passwd 修改用户密码</h3>

语法: passwd [option] [username]

| 参数    | 说明                       |
| ------- | -------------------------- |
| -k      | 为密码过期的用户更新有效期 |
| -l      | 锁定用户，被锁用户不能登录 |
| -u      | 解除用户锁定               |
| -d      | 删除用户的密码             |
| --stdin | 从标准输入中读取密码       |

```shell
# 一条命令设置用户密码
echo "123456"|passwd --stdin platform

# TODO 批量创建10个用户stu01-stu10,设置8位随机密码，要求不能使用shell的循环，只能使用管道
```

<h3 id="su">5. su 切换用户</h3>

功能说明：切换用户或一指定用户的身份执行命令或程序

语法: su [option] [username]

| 参数        | 说明                             |
| ----------- | -------------------------------- |
| -,-l,-login | 切换用户后初始化 home 及环境变量 |
| -c          | 向 shell 传递单个命令            |

```shell
# 切换到platform且刷新环境变量
su - platform

# 不切换用户，仅使用该用户执行命令
su - platform -c "ls -l ~"
```

<h3 href="visudo">6. visudo 编辑sudoers文件 </h3>

说明：该命令编辑/etc/sudoers 文件，该文件可配置提升用户和用户组权限为 root

```shell
# 用户名 机器=(角色) 可执行命令
[username] ALL(ALL:ALL) ALL
```

> 也可直接编辑 /etc/sudoers 文件

<h3 id="sudo">7. sudo 以另一个用户身份执行命令</h3>

功能说明：使用该命令可以允许普通用户在执行指定命令或程序上拥有超级用户的权限，同时该用户不需要知道 root 的密码，这个授权是通过`/etc/sudoers`管理的

| 参数 | 说明                     |
| ---- | ------------------------ |
| -l   | 列出当前用户可执行的命令 |
| -c   | 向 shell 传递单个命令    |

```shell
# platform 用户本来没有ls /root目录的权限，但是可以通过sudo提升权限
sudo ls /root
# 列出当前用户的sudo配置权限
sudo -l
# Matching Defaults entries for platform on 110:
#     env_reset, mail_badpass,
#     secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

# User platform may run the following commands on 110:
#     (ALL : ALL) ALL
```

**sudo 和 su 的区别**
概念上：su（switch user）是切换用户，sudo（super do）超级用户权限去做。
**实际上二者都有彼此的部分能力**。sudo -i 可以切换到用户，su -c 也可不切换使用其他用户的身份执行命令。不太一样的地方 sudo -i 切换用户输入的是当前用户的密码（如果需要），su 切换则需要目标用户的密码
**注意点**

1. su 切换时默认不切换环境变量，需要手动加`-`去执行切换操作
2. 可用 sudo 命令的用户必须在`/etc/sudoers`中有过合适的配置，且执行时间有限制。但是`sudo -i`可以像 su 一样切换到 root 用户

<h3 id="id">8. id 显示用户和用户组信息</h3>

功能说明：显示真实有效的 UID 和 GID

| 参数 | 说明               |
| ---- | ------------------ |
| -g   | GID                |
| -u   | UID                |
| -n   | 显示名称不显示数字 |

<h3 id="w">9. w，who，users 显示已登陆用户信息</h3>

w 参数

| 参数 | 说明                 |
| ---- | -------------------- |
| -h   | 不显示前两行标题信息 |

who,users 也可以查看当前用户

<h3 id="whoami">10. 当前登录的用户名</h3>

显示已登陆的用户名

<h3 id="last">11. last,lastb,lastlog 最近登录记录</h3>

last: 用户登录列表，从/var/log/wtmp 读取
last: 用户登录失败纪录，从/var/log/btmp 读取
lastlog: 用户最近登录记录，从/var/log/lastlog 读取
