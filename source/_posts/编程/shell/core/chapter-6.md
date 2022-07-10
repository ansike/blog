---
title: 打包同步文件
categories: 编程
tags: shell
date: 2022-07-08 22:44:48
---

<a href="#tar">1. tar 打包备份</a>
<a href="#scp">2. scp 远程复制文件</a>
<a href="#rsync">3. rsync 文件同步工具</a>

<h3 id="tar">1. tar 打包备份</h3>

语法: tar [option] [file]

<b>option</b>

| 参数              | 说明                    | 参数 | 说明                         |
| ----------------- | ----------------------- | ---- | ---------------------------- |
| -z                | gzip 压缩或解压         | -c   | 创建新的 tar 包              |
| -v                | 显示执行过程            | -f   | 指定压缩文件的名字           |
| -t                | 不解压查看 tar 包的内容 | -p   | 保持文件的原有属性           |
| -x                | 解开 tar 包             | -C   | 指定解压的目录路径           |
| --exclude=PATTERN | 排除目录                | -h   | 打包软连接指向大的真实源文件 |

```shell
# 创建tar包，且gzip压缩
tar -czvf www.tar.gz temp/

# 不解压查看tar包
tar -tzvf www.tar.gz

# 解压tar包，解压方式为gzip
tar -xzvf www.tar.gz
```

<h3 id="scp">2. scp 远程复制文件</h3>

功能说明: 用于不同主机之间复制文件。scp 每次是全量完整复制，适合第一次复制，增量复制建议使用 rsync

语法: scp [option] [[user@]host1:]file1 [[user@]host2:]file2

| 参数    | 说明               |
| ------- | ------------------ |
| -C      | 压缩传输           |
| -I      | 指定传输占用的带宽 |
| -P port | 指定传输端口号     |
| -q      | 不显示传输进度条   |
| -r      | 递归复制整个目录   |

<h3 id="rsync">3. rsync 文件同步工具</h3>

语法: rsync [option] [SRC] [DEST]

| 参数 | 说明                                     |
| ---- | ---------------------------------------- |
| -v   | 详细模式输出                             |
| -z   | 压缩传输                                 |
| -a   | 递归方式保持文件所有属性，相当于 rtopgDI |
| -r   | 目录递归                                 |
| -n   | 传输测试                                 |

```shell
# 一般都以avz的参数传递
rsync -avz 10.227.77.10:~/xxx aaa
```
