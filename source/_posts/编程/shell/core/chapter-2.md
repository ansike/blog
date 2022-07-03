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
<a href="#xargs">11. xargs 标准输入转换为命令行参数</a>
<a href="#rename">12. rename 重命名文件</a>
<a href="#basename">13. basename 显示文件名或目录名</a>
<a href="#dirname">14. dirname 显示文件或目录路径</a>
<a href="#chattr">15. chattr 改变文件的扩展属性</a>
<a href="#file">16. file 显示文件类型</a>
<a href="#md5sum">17. md5sum 计算和校验文件的 MD5 值</a>
<a href="#chown">18. chown 改变文件或者目录的用户和用户组</a>
<a href="#chmod">19. chmod 改变文件或目录权限</a>
<a href="#umask">20. umask 显示或设置权限掩码</a>

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

###### find 中 exec 和 xargs 区别

1. 查找的结果在 exec 是逐个传递给后面的命令执行，效率略低。在 xargs 是一次性传递给后边的命令执行
2. 文件名有空格，exec 能正常处理，xargs 不能，需要特殊处理

```shell
# 查看区别
find . -type f -exec echo hello {} \;
find . -type f | xargs echo hello

# 文件名有空格时xargs特殊处理
find . -name 'a b' -print0| xargs -0 ls -lh
```

<h3 id="xargs">xargs 标准输入转换为命令行参数</h3>

| 命令 | 作用                                                                        |
| ---- | --------------------------------------------------------------------------- |
| -n   | 每行最大参数数量，可将标准输入的文本话氛围多行，每行 n 个参数，默认空格分割 |
| -i   | 以{}代替前面的结果                                                          |
| -0   | 用 null 代替空格作为分隔符，配合 find 的 print0 选项输出使用                |
| -d   | 自定义分隔符，进行字符串切割                                                |

```shell
# -n
cat a4
# 1
# 2
# 3
# 4 5 6 7 8 9
# 10 11

xargs < a4
# 1 2 3 4 5 6 7 8 9 10 11

xargs -n 3 < a4
# 1 2 3
# 4 5 6
# 7 8 9
# 10 11

# -d
echo splitXsplitXsplit|xargs -d X
echo splitXsplitXsplit|xargs -d X -n2

```

<h3 id="rename">rename 重命名文件</h3>

语法：rename from to file
这个在 Debian 中是不一样的语法

###### 批量修改文件名

```shell
rename 's/a/b/' a*.txt
rename 's/txt/jpg/' *.txt
```

<h3 id="basename">basename 显示文件名或目录名</h3>

语法：basename [file] [后缀]

```shell
basename a/1/t.txt
# t.txt

basename a/1/t.txt .txt
# t
```

<h3 id="dirname">dirname 显示文件或目录路径</h3>
语法：dirname [file]

```shell
dirname a/1/t.txt
# a/1
```

<h3 id="chattr">chattr 改变文件的扩展属性</h3>

功能: 改变文件的扩展熟悉。chmod 知识改变了文件的读、写、执行权限，更底层的属性控制是由 chattr 改变的
语法: chattr [option] [mode] [file]

<b>option</b>

| 命令 | 作用             |
| ---- | ---------------- |
| -R   | 递归更改目录属性 |
| -V   | 显示命令执行过程 |

<b>mode</b>

| 命令 | 作用                                                    |
| ---- | ------------------------------------------------------- |
| +    | 增加参数                                                |
| -    | 减少参数                                                |
| =    | 更新为指定参数                                          |
| A    | 不修改文件的最后访问时间                                |
| a    | 只能向文件中添加数据，不能删除，多用于服务日志          |
| i    | 文件不能被删除改名，写入，新增 (即是是 root 也无法删除) |

可以给文件加锁
```shell
# 只读权限
chattr +a b2.jpg
# 不可更改权限
chattr +i b2.jpg
```


<h3 id="file">file 显示文件类型</h3>

语法: chattr [option] [file]

```shell
file *
# a:       directory
# b5.jpg:  empty
# b6.jpg:  UTF-8 Unicode text
```

<h3 id="md5sum">md5sum 计算和校验文件的MD5值</h3>

语法: md5sum [option] [file]

| 命令     | 作用                                    |
| -------- | --------------------------------------- |
| -b       | 以二进制模式读取文件                    |
| -c       | 从指定文件中读取 MD5 校验值，并进行校验 |
| -t       | 以文本模式读取文件（默认模式）          |
| --quiet  | 验证通过不输出 OK                       |
| --status | 不输出任何信息，通过返回值判断结果      |

```shell
md5sum b6.jpg
# 3425006b2772d4e16740e83218248495  b6.jpg

md5sum b6.jpg > b6.log
cat b6.log
# 3425006b2772d4e16740e83218248495  b6.jpg

md5sum -c b6.log
# b6.jpg: OK
```

<h3 id="chown">chown 改变文件或者目录的用户和用户组</h3>

语法: chown [options] [owner]:[group]] [file]

| 命令 | 作用                       |
| ---- | -------------------------- |
| -R   | 递归更改目录的用户和用户组 |

<h3 id="chmod">19. chmod 改变文件或目录权限</h3>

语法: chown [options] [mode] [file]

| 命令 | 作用                   |
| ---- | ---------------------- |
| -R   | 递归更改目录的所有文件 |

权限说明: -rw-r--r-- 1 platform platform 11 Jul 3 11:01 b6.jpg
一个文件的类型由`-rw-r--r--`进行描述，第一位为文件类型，接下来每 3 位为一组，分别代表用户权限，用户组权限，和其他用户权限

<b>权限说明</b>

| 权限位 | 全称    | 含义         | 对应数字 |
| ------ | ------- | ------------ | -------- |
| r      | read    | 可读权限     | 4        |
| w      | wirte   | 可写权限     | 2        |
| x      | execute | 可执行权限   | 1        |
| -      |         | 没有任何权限 | 0        |

| 命令 | 说明                    |
| ---- | ----------------------- |
| u    | owner/user 文件所属用户 |
| g    | group 文件所属用户组    |
| o    | other 其他用户          |
| a    | 相当于 u,g,o 的总和     |

+,-,= 表示对权限进行操作

<b>权限和数字对应关系</b>
rw- r-- r--
421 400 400
7   4   4
`-rw-r--r--`所以最后权限位对应的数字为`744`，我们在平常的开发中经常会赋予`755`权限，其实就是当前用户有所有权限，用户组和其他用户有只读和执行权限，没有写的权限

```shell
# 给用户增加执行，用户组，其他用户赋予只读权限
chmod u+x,g=r,o=r b2.jpg

# 数字和上边的权限赋值是等价的
chmod 744 b2.jpg
```

<h3 href="#umask">20. umask 显示或设置权限掩码</h3>

功能: 是通过八进制的数值来定义用户创建文件或目录的默认权限
语法: umask [options] [mode]
默认掩码为 022

创建文件的默认最大权限为666
使用umask之后，文件的权限为644

创建文件的默认最大权限为777
使用umask之后，目录的权限为755


