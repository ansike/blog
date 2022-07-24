---
title: 练习
categories: 编程
tags: shell
date: 2022-07-05 00:22:22
---

<a href="#word">1. 192. Word Frequency</a>
<a href="#Phone">2. 193. Valid Phone Numbers</a>
<a href="#Transpose">3. 194. Transpose File</a>
<a href="#Tenth">4. 195. Tenth Line</a>

<h3 id="word">1. 192. Word Frequency</h3>
https://leetcode.cn/problems/word-frequency/
涉及命令：tr 字符替换，sort排序及反转，uniq相同行合并，awk 按列输出

```shell
# words.txt 统计文件中的词频，倒叙输出
# the day is sunny the the
# the sunny is is
cat words.txt | tr -s ' ' '\n'|sort|uniq -c|sort -r|awk '{print $2" "$1}'
```

<h3 id="Phone">2. 193. Valid Phone Numbers</h3>

https://leetcode.cn/problems/valid-phone-numbers/

-E 使用扩展的正则表达式，其余语法和常规语法类似

```shell
# 使用扩展正则, 匹配 file 中的有效行（1，3）
# 987-123-4567
# 123 456 7890
# (123) 456-7890
grep -E "([0-9]{3}-|\([0-9]{3}\ ))[0-9]{3}-[0-9]{4}" file
```

<h3 id="Transpose">3. 194. Transpose File</h3>

行列置换
head 显示 文件第一行
wc -w 统计当前的输入的单词数，计算列数
循环当前文件的列
利用 awk 可以直接输出每一行的某一列，再将循环输出的列通过 xargs 进行合并成一行

```shell
# file.txt
# name age
# alice 21
# ryan 30
# =>
# name alice ryan
# age 21 30
column=`cat file.txt|head -n 1|wc -w`
for((i=1;i<=$column;i++)) do
  awk '{print $'''$i'''}' file.txt|xargs
done
```

<h3 id="Tenth">4. 195. Tenth Line</h3>

https://leetcode.cn/problems/tenth-line/

利用了 sed 取行的能力，需要搭配-n（取消 sed 默认输出）一起

```shell
# file.txt
# Line 1
# Line 2
# Line 3
# Line 4
# Line 5
# Line 6
# Line 7
# Line 8
# Line 9
# Line 10
sed -n "10p" file.txt
```
