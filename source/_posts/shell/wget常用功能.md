---
title:  wget常用功能
---

`Wget - The non-interactive network downloader.`
### 基本使用方式见man wget
`wget [option]... [URL]...`

### 场景一、获取输出到标准输出中赋值给变量
```shell
Var=`wget -O - http://www.baidu.com`
echo $Var

# 获取远程shell的内容，执行脚本【安装node】
sh -c "$(wget -O- https://raw.githubusercontent.com/ansike/study/dev/shell/install-node.sh)"

```
-O file
--output-document=file
1. The documents will not be written to the appropriate files, but all will be concatenated together and written to file.
2. If - is used as file, documents will be printed to standard output, disabling link conversion.
