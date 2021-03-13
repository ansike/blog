---
title:  tar常用功能
---

`Wget - The non-interactive network downloader.`
### 基本使用方式见man wget
`wget [option]... [URL]...`

### 场景一、压缩
```shell
tar -cvzf a.gz.tar a
```
### 场景二、解压
```shell
tar -xvzf a.gz.tar

# 解压到指定目录
tar -xvzf a.gz.tar -C path
```
### 场景三、查看
```shell
tar -tvzf a.gz.tar
```

-c: create 创建
-v: verbose 详细信息
-z: gzip压缩
-f file: 生成的文件，也可以像wget一样指定`-`输出到`stdout`中
-t: list备份内容