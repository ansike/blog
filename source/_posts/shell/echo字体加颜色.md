---
title: echo字体加颜色
---
### 基础语法
``` shell
echo -e "\E[1;31mmawasd\E[0m"
# 红色的=>mawasd
```
1. `echo -e`可以识别转义字符
2. `\E`可以使用`\033`代替,中间内容就是其作用空间
3. `[1`表示加粗显示
4. `[0m`表示关闭所有属性

详情见`man console_codes`

### 数字匹配demo
``` shell

```
