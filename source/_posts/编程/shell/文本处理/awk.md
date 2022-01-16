---
title: awk
categories: 编程
tags:
  - shell
  - awk
date: 2022-01-12 22:46:13
---

awk [options] 'pattern {action}' [FILE]

### 常用功能

| 序号 | 常用功能             | 说明                                                                                           |
| ---- | -------------------- | ---------------------------------------------------------------------------------------------- |
| 1    | 指定分隔符显示某几列 | awk -F "GET \| HTTP" '{print $2}' access.log 直接取出 url 显示出日志文件的 url 这列            |
| 2    | 取出想要的内容       | awk `'$6~/Failed/{print $11}'` /var/log/secure 分析生产环境中谁在破解用户的密码                |
| 3    | 显示某个范围内的文件 | awk 'NR\==20,NR\==30' filename 显示 20-30 行内容                                               |
| 4    | 统计和计算           | awk '{sum+=$0}END{print sum}' filename 计算总和                                                |
| 5    | 数组计算和去重       | awk '{array[$1]++}END {for(key in array)print key,array[key]}' access.log 对日志进行统计和计数 |

### 选项说明

| 参数选项 | 说明                          |
| -------- | ----------------------------- |
| -F       | 指定字段分隔符                |
| -v       | 定义或修改一个 awk 内部的变量 |

NR 表示行号
\$0 表示整行内容
\$1-\$n 表示某列
\$NF 表示最后一列

### Detail

```shell
# 测试文件
cat /etc/passwd

# 打印指定行和行号
cat -n /etc/passwd | awk "NR==2"
cat /etc/passwd | awk '{print NR,$0}'
awk '{print NR,$0}' /etc/passwd

# 打印第1,3,最后列
awk -F ":" '{print $1,$3,$NF}' /etc/passwd

# 替换文本内容 /sbin/nologin => /bin/bash
# gsub函数语法 gsub("替换对象","替换成什么内容","哪一列"),使用$0或者不写是整行替换
awk '{gsub("/sbin/nologin","/bin/bash",$0);print $0}' /etc/passwd
```

### 实战

```shell
# 字符串中获取版本号
echo '{"version": "1.0.0.1"}'|awk -F "\"" '{print $4}'

# 取出网卡中对应的ip地址(具体打印具体对待)
ifconfig en0 | awk -F "\ " 'NR==4{print $2}'
```
