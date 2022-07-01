---
title: sed
categories: 编程
tags:
  - shell
  - sed
date: 2022-01-16 09:41:34
---

### 说明:

sed 是 Stream Editor 字符流编辑器
是操作,过滤,转换文本内容的强大工具.常用功能包括对文件实现快速的增删改查,其中查询功能中最常用的是过滤(过滤指定字符串)和取行(取出指定行)

### 语法格式

sed [options] [内置命令字符] [FILE]

### SYNOPSIS

| 参数选项 | 说明                                         |
| -------- | -------------------------------------------- |
| -n       | 取消默认 sed 的输出,常与 sed 内置命令 p 连用 |
| -i       | 直接修改文件内容而不是输出到终端             |
| -r (-E)  | 使用扩展正则                                 |
| -e       | 增加多脚本                                   |

| 内置命令字符          | 说明                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| a (append)            | 追加文本,在指定行后添加一行或多行文本                                                                                  |
| d (delete)            | 删除匹配行的文本                                                                                                       |
| i (insert)            | 在指定行前添加一行或多行文本                                                                                           |
| p (print)             | 打印匹配行的内容,与参数选项`-n`一起                                                                                    |
| s/regexp/replacement/ | 匹配 regexp 部分的内容,用 replacement 替换 regexp 匹配的内容. replacement 部分可以使用特殊字符&和\1-\9, 最后可以加 g,p |

### Detail

```shell
# 准备输出字符串到test2.txt
cat >test2.txt<<EOF
1,test1,CE
2,test2,CT
3,test3,CO
4,test4,CF
5,test5,CT
EOF
# 最后输入EOF回车结束


# a (mac中命令不一致)
sed "2a 21,test21,cc" test2.txt

# d 删除一行
sed "2d" test2.txt
# 删除多行
sed "2,3d" test2.txt

# i
sed "2i 11,test11,s" test2.txt

# i
sed "2i 11,test11,s" test2.txt

# p 只打印某行内容与-n连用
sed -n "2p" test2.txt

# s/regexp/replacement/ 替换文本内容
sed "s#t2#t2new#g" test2.txt
sed "s/t2/t2new/g" test2.txt


```

### 实战

```shell
# 字符串中获取版本号
echo '{"version": "1.0.0.1"}' | sed -E "s/.*\"(([0-9].)*[0-9])\".*/\1/g"
```
