---
title:  wget常用功能
---

`Wget - The non-interactive network downloader.`
### 基本使用方式见man wget
`wget [option]... [URL]...`

### 场景一、获取输出到标准输出中赋值给变量
```shell
Var=`wget -O - http://www.baidu.com`m
echo $Var
```
-O file
--output-document=file
1. The documents will not be written to the appropriate files, but all will be concatenated together and written to file.
2. If - is used as file, documents will be printed to standard output, disabling link conversion.
