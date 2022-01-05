---
title:  wget常用功能
categories: 编程
tags: shell
date: 2021-05-05 22:46:13
---

`Wget - The non-interactive network downloader.`
### 基本使用方式见man wget
`wget [option]... [URL]...`

### 场景一、获取输出到标准输出中赋值给变量
```shell
Var=`wget -O - http://www.baidu.com`
echo $Var
```
-O file
--output-document=file
1. The documents will not be written to the appropriate files, but all will be concatenated together and written to file.
2. If - is used as file, documents will be printed to standard output, disabling link conversion.

### 场景二、获取输出到标准输出，执行安装脚本
```shell
# wget获取shell文件，执行脚本【安装node】
# -O 输出到文件，参数为-标识输出到标准输出
# sh -c执行后方字符串中的命令
sh -c "$(wget -O - https://raw.githubusercontent.com/ansike/study/dev/shell/install-node.sh)"

```