---
title: read 命令
---
### 从标准输入中读取信息

##### 参数
1. -p prompt #提示
2. -t timeout # 超时时间, 单位为s
##### 命令行使用
``` shell
read -p "Pls Input Your Vars: " var1 var2
echo "${var1}, ${var2}"

read -t 3 -p "Pls Input Your Vars: " var3 var4
echo "${var3}, ${var4}"

```
