---
title:  cat相关
categories: 编程
tags: 
  - shell
  - cat
date: 2022-02-10 23:49:44
---

### cat 在命令行中输入文本
```shell
# 给a.txt输入文案 'xxxx'，会直接覆盖原有内容
cat <<EOF> a.txt
xxx
EOF

# 给a.txt追加 'xxxx'，不会覆盖，只是追加
cat <<EOF>> a.txt
xxx
EOF
```
