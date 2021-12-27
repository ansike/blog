---
title: git merge和rebase比较
categories: 编程
tags: 
  - js
  - git
  - merge
  - rebase
date: 2018-02-05 21:46:13
---

## rebase和merge过程
如下，要讲两个分支进行合并，分别在rebase和merge下的差异
```shell
|  \
C   E
|   |
B   D
|  /
A
```
- rebase 变基 D原来的基为A，现在要把其基础变为C
  1. 拿D去和C去比较看是否有冲突的文件。解决冲突之后，变动保存在D的commitId中，D的commitId变化。同理E和D去比较，直至rebase的分支比较完成
  2. 不会生成新的commitId，版本历史在一条直线上
  3. 冲突时，current的是rebase的分支，incoming的是当前分支
```shell
|
E
|
D
|
C
|
B
|
A
```
- merge 
  1. E和C进行比较判断是否有冲突，不会修改原有的commitId
  2. 会生成新的一个commitId：F，该commitId标识为两个分支的合并ID。版本历史不在一条直线上
  3. 冲突时，current的是当前分支，incoming的是merge的分支

```shell
F
|  \
C   E
|   |
B   D
|  /
A
```
