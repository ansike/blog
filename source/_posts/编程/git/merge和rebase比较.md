---
title: git merge和rebase比较
categories: 编程
tags: 
  - js
  - git
  - merge
  - rebase
date: 2022-08-02 22:10:51
---

## rebase和merge过程
如下，要将开发分支合入主干分支，比较在rebase和merge下的差异
```shell
# master dev
|  \
C   E
|   |
B   D
|  /
A
```


#### rebase 变基 将原来的基由A变为C
  1. 过程: 取消dev分支D, E的commit临时保存为patch,将B, C commit 放到dev分支中. 最后将D,E依次合入dev分支.
  2. 特点: 版本历史在一条直线上, 不会生成新的commitId, 新基之上原有的commitId都会改变.
  3. 冲突时current和incoming判断: current的是rebase的分支(master分支代码)，incoming的是当前分支(dev分支代码). 
```shell
# 在dev rebase master分支, 之后提mr合入master
git rebase master
# 图形
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
#### merge 合并 将开发分支的commit并入主干分支
  1. 过程: E和C进行比较判断是否有冲突，不会修改原有的commitId.
  2. 特点: 版本历史不在一条直线上, 会生成新的一个commitId：F，该commitId标识为两个分支的合并ID, 原有的commitId不变.
  3. 冲突时current和incoming判断: current的是当前分支(master)，incoming的是merge的分支(dev)

```shell
# 在master直接merge dev分支
git merge dev

# 图形
F
|  \
C   E
|   |
B   D
|  /
A
```


#### 不要在公共分支rebase

#### 问题
1. 在上述rebase冲突解决时`current的是rebase的分支(master分支代码)，incoming的是当前分支(dev分支代码)`不符合直观预期. 
直观来看dev rebase的master, current应该是dev的代码,毕竟是在dev分支,但实际不是. 原因其实在rebase的过程已经说明. 冲突的发生的时机: master分支的新增的commit已全部进入dev分支, dev原有的commit开始patch到dev分支上. 所以此时可以不恰当的理解为dev的commit在往master的上合并,但是记住当前还在dev分支.

