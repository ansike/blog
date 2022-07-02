---
title: 命令行简介
categories: 编程
tags: shell
date: 2021-05-05 22:46:13
---

<a href="#cd">1. cd 切换目录</a>
<a href="#mkdir">2. mkdir 创建目录</a>
<a href="#touch">3. touch 创建空文件或改变文件时间戳属性</a>
<a href="#ls">4. ls 显示目录下内容及相关属性</a>
<a href="#cp">5. cp 复制文件或目录</a>
<a href="#mv">6. mv 移动或重命名文件</a>
<a href="#rm">7. rm 删除目录或文件</a>
<a href="#rmdir">8. rmdir 删除空目录</a>
<a href="#ln">9. ln 硬链接和软链接</a>
<a href="#find">10. find 查找目录下的文件</a>

<h3 id="cd">cd 切换目录</h3>

| 命令  | 作用                         |
| ----- | ---------------------------- |
| cd -  | 回到上次所在的目录（OLDPWD） |
| cd ～ | 回到 HOME 目录               |
| cd .. | 上级目录                     |

<h3 id="cd">mkdir 创建目录</h3>

| 命令 | 作用         |
| ---- | ------------ |
| -p   | 递归创建目录 |
| -m   | 设置权限     |
| -v   | 显示创建过程 |

###### 实战 1 同时创建多个多级目录及多级子目录。

如:同时创建 a/1/1_1,a/1/1_2,a/2/2_1,a/2/2_2 等

```shell
mkdir -p a/{1,2}/{1_1,2_2}
tree a
# a
# ├── 1
# │   ├── 1_1
# │   └── 2_2
# └── 2
#     ├── 1_1
#     └── 2_2
```

###### 实战 2 克隆目录结构

```shell
tree -fid --noreport a > temp.txt
cat temp.txt
# a
# a/1
# a/1/1_1
# a/1/2_2
# a/2
# a/2/1_1
# a/2/2_2
cd b
mv ../temp.txt a.txt
mkdir -pv `cat a.txt`
# mkdir: created directory 'a'
# mkdir: created directory 'a/1'
# mkdir: created directory 'a/1/1_1'
# mkdir: created directory 'a/1/2_2'
# mkdir: created directory 'a/2'
# mkdir: created directory 'a/2/1_1'
# mkdir: created directory 'a/2/2_2'
```

<h3 id="touch">3. touch 创建空文件或改变文件时间戳属性</h3>
linux中一切皆文件，touch也能修改目录的时间戳
| 命令 | 作用         |
| ---- | ------------ |
| -a | 只更改文件的最后访问时间 |
| -m | 只更改文件的最后修改时间 |

###### 批量创建多个文件

```shell
touch a{1..5}
# -rw-r--r-- 1 ansike ansike    0 Jul  1 20:00 a1
# -rw-r--r-- 1 ansike ansike    0 Jul  1 20:00 a2
# -rw-r--r-- 1 ansike ansike    0 Jul  1 20:00 a3
# -rw-r--r-- 1 ansike ansike    0 Jul  1 20:00 a4
# -rw-r--r-- 1 ansike ansike    0 Jul  1 20:00 a5
```

###### 修改文件时间属性

```shell
# 查看命令
stat a1
#   File: a1
#   Size: 0               Blocks: 0          IO Block: 4096   regular empty file
# Device: 810h/2064d      Inode: 21500461    Links: 1
# Access: (0644/-rw-r--r--)  Uid: ( 1001/  ansike)   Gid: ( 1001/  ansike)
# Access: 2022-07-01 20:00:00.872227631 +0800
# Modify: 2022-07-01 20:00:00.872227631 +0800
# Change: 2022-07-01 20:00:00.872227631 +0800
#  Birth: -
touch -a a1
# Access和Change时间都发生了变化
# Access: 2022-07-01 20:02:38.352475849 +0800
# Modify: 2022-07-01 20:00:00.872227631 +0800
# Change: 2022-07-01 20:02:38.352475849 +0800

touch -m a2
# Modify和Change时间都发生了变化
# Access: 2022-07-01 20:00:00.872227631 +0800
# Modify: 2022-07-01 20:05:35.116754462 +0800
# Change: 2022-07-01 20:05:35.116754462 +0800
```

所以对于文件的任何修改都会影响 Change 的值

<h3 id="ls">ls 显示目录下内容及相关属性</h3>

| 命令         | 作用                                                                                |
| ------------ | ----------------------------------------------------------------------------------- |
| -a           | 显示目录下所有文件，包括`.`字符开始的隐藏文件                                       |
| -A           | 显示目录下所有文件，包括隐藏文件，不包括`.`,`..`这两个目录                          |
| -l           | 使用长格式列出文件和目录信息                                                        |
| -t           | 根据修改时间排序，默认为文件名排序                                                  |
| -r           | 倒序排列                                                                            |
| -h           | 以人类可读信息展示文件或者目录大小(搭配-l 使用)                                     |
| -S           | 根据文件大小排序                                                                    |
| --time       | 默认为修改时间（Modify Time），可以改为 atime（Access Time）或 ctime（Change Time） |
| --time-style | 按特定规则展示时间（long-iso 最好,full-iso,iso,locale）                             |

###### 查看目录所有的文件或者文件夹

```shell
# 递归查看所有的目录
ls -RF | grep /

# 递归查看所有的文件
ls -RF | grep -v /
```

###### 查找最近修改过的文件

```shell
# 以长格式形式展示，按照修改时间倒序排列，最后一个即是最近修改的文件
ls -lrt
# 使用tail优化定位
ls -lrt|tail -f
```

###### 删除 inode 节点垃圾

```shell
ls|xargs rm -f
```

<h3 id="cp">cp 复制文件或目录</h3>

| 命令 | 作用                                               |
| ---- | -------------------------------------------------- |
| -r   | 递归复制目录及所有子文件                           |
| -i   | 覆盖文件前需要用户确认                             |
| -p   | 保留源文件的所有者和权限及时间信息                 |
| -d   | 如果源文件是符号连接，仅复制符号连接本身，保留指向 |
| -a   | 是 p,d,r 命令的总和                                |

###### 文件快速备份

```shell
# 我们经常会这么备份
cp /etc/mysql/my.cnf /etc/mysql/my.cnf.back
# 借助bash对大括号的展开操作，可以很简单的写
cp /etc/mysql/my.cnf{,.back}
```

<h3 id="mv">mv 移动或重命名文件</h3>

| 命令 | 作用                                                                  |
| ---- | --------------------------------------------------------------------- |
| -f   | 目标文件存在，覆盖文件前不需要用户确认                                |
| -i   | 目标文件存在，覆盖文件前需要用户确认                                  |
| -n   | 不覆盖已存在的文件                                                    |
| -t   | 适用与多个源文件到一个目标目录的情况，和 cp -t 一样，目标在前，源在后 |
| -u   | 仅源文件比目标文件新，或者目标文件不存在是才进行移动                  |

<h3 id="rm">rm 删除目录或文件</h3>

| 命令 | 作用                                   |
| ---- | -------------------------------------- |
| -f   | 强制删除                               |
| -i   | 删除前需确认                           |
| -r   | 递归删除目录及内容                     |
| -I   | 删除超过三个文件或者递归删除前要求确认 |

<h3 id="rmdir">rmdir 删除空目录</h3>

| 命令 | 作用           |
| ---- | -------------- |
| -p   | 递归删除空目录 |
| -v   | 显示执行过程   |

<h3 id="ln">ln 硬链接和软链接</h3>

创建文件间的联系。

| 命令 | 作用       |
| ---- | ---------- |
| -    | 创建硬链接 |
| -s   | 创建软链接 |

硬链接（hard link）：生成的是普通文件（-字符）

1. inode：具有相同的 inode 节点多个文件互为硬链接文件
2. 内容：硬链接相当于文件的另外一个入口
3. 删除结果：删除硬链接文件或者源文件，文件实体未被删除。只有所有硬链接都被删除之后才能被删除。可以使用硬链接来防止重要文件误删

软链接（symbolic link）：生成的是符号链接文件（1 类型）

1. inode：类似于 windows 里的快捷方式，inode 和源文件不一样
2. 内容区别：里面存放的是源文件的路径，指向源文件实体
3. 删除结果：删除源文件，软链接失效

有关目录

1. 目录不可以创建硬链接（因目录可以跨文件系统，但硬链接需要相同的 inode），可以创建软链接。
2. 每个目录下都有两个硬链接'.','..'，指向当前目录和上级目录
3. 在父目录创建子目录会导致父目录的硬链接数加 1

<h3 id="find">find 查找目录下的文件</h3>
语法格式：find   [<b>选项</b> -H,-L,-P] &nbsp;&nbsp;&nbsp;[<b>路径</b>] &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  [<b>操作语句</b> 参数｜限定条件｜执行动作]

操作语句（expression）部分

###### options 模块

| 命令              | 作用                                                                           |
| ----------------- | ------------------------------------------------------------------------------ |
| -depth            | 从最深的子目录开始查找                                                         |
| -maxDepths levels | 查找的最大目录级数， levels 为自然数                                           |
| -regextype type   | 改变正则表达式的模式。默认为 emacs，还有 posix-awk，posix-basic，posix-egrep， |

> Posix: Portable Operating System Interface for UNIX

###### tests 模块

| 命令                   | 作用                                                                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| -mtime [-n \| n \| +n] | 以修改时间来查找，-n 天内｜ n 天｜ +n 天以前                                                                                                  |
| -name                  | 文件名查找，只支持\*,？,[]等特殊通配符                                                                                                        |
| -regextype type        | 改变正则表达式的模式。默认为 emacs，还有 posix-awk，posix-basic，posix-egrep，                                                                |
| -regex                 | 正则表达式                                                                                                                                    |
| -iregex                | 不区分大小写正则表达式                                                                                                                        |
| -type                  | 查找某一类型文件: <br />b(块设备文件)，c(字符设备文件)，d(目录)，p（管道文件），l（符号链接文件），f（普通文件），s（socket 文件），D（door） |

###### actions 模块

| 命令    | 作用                      |
| ------- | ------------------------- |
| -delete | 将查找出的文件删除        |
| -exec   | 执行参数给出的 shell 命令 |
| -prune  | 不在指定目录中查找        |

###### oprators 逻辑运算符

| 命令 | 作用 |
| ---- | ---- |
| !    | 取反 |
| -a   | 交集 |
| -o   | 并集 |

###### 实战示例

```shell
# 查找一天内修改过的文件和目录
find . -mtime -1

# 查找一天内的所有txt
find . -mtime -1 -name '*.txt'

# 查找所有的目录
find . -type d

# 查找所有的文件
find . ! -type d

# 排除某个目录
find ./ -path "./a/1" -prune -o -print

# 排除多个目录
find . \( -path './a/1/1_1' -o -path './a/2/2_2' \) -prune -o -print

# 查找n天前的文件并删除
find . -mtime +2 -delete
find . -mtime 1 -exec rm {} \;

# 查找所有的文件并以长模式展开
find . -type f -exec ls -l {} \;
find . -type f|xargs ls -l

# 将所有的a*文件内容中的this替换成that
find . -type f -name "a*" -exec sed -i "s#this#that#g" {} \;
find . -type f -name "a*" | xargs sed -i "s#that#this#g"

# 删除一个目录下的所有文件，保留一个指定文件
find . -type f -cmin -4 ! -name "b9" -exec rm -f {} \;
```

###### 服务数据注入

```shell
# 在www目录被注入了恶意弹窗
find . -type f | xargs sed -i "s#<script>alert('xxx')</script>##g"

find . -type f | xargs sed -i "/*alert('xxx')*/d"
```