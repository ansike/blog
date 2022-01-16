---
title: grep
categories: 编程
tags:
  - shell
  - grep
date: 2022-01-10 22:46:13
---

### 说明:

从文本文件或管道数据流中筛选匹配的行及数据

### 语法格式:

grep [options] [pattern] [FILE]

### SYNOPSIS

| 参数选项                          | 说明                                 |
| --------------------------------- | ------------------------------------ |
| -v (--invert-match)               | 输出的行没有匹配到任何正则(反转输出) |
| -n (--line-number)                | 展示行号,从 1 开始. 在-cLlq 下会失效 |
| -i (--ignore-case)                | 不区分大小写,默认区分大小写          |
| -c (--count)                      | 仅输出匹配行的数量                   |
| -E (--extended-regexp)            | 强制 grep 使用 egrep                 |
| --color=['never‘,’always‘,’auto'] | 标记匹配到的文本                     |
| -w (--word-regexp)                | 只匹配过滤的单词                     |
| -o (--only-matching)              | 只打印匹配的部分                     |

### Detail

```shell
# test file > 为覆盖, >>为追加
echo "test1\ntest2\ntest3" > test.txt

# -v
grep -v "test1" test.txt
# test2
# test3

# -n
grep -n "test1" test.txt
# 1:test1

# -i
grep -i "TEst1" test.txt
# test1

# -c
grep -c "test" test.txt
# 3

# -E
grep -E "t.*t[0-2]" test.txt
# test1
# test2

# --color auto|always 匹配后为红色, never没有颜色

# -w
grep -w "test" test.txt
# 没有匹配到单词, 因为文件中没有test的单词

# -o
grep -o "t.*t" test.txt
# test
# test
# test
```

### 实战

```shell
# 字符串中获取版本号
echo '{"version": "1.0.0.1"}' | grep -Eo "([0-9].)+[0-9]"
```
