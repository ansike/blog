---
title: git 相关回滚
categories: 编程
tags:
  - git
date: 
---

在实际的代码开发中会涉及到各种各样的撤销回滚，本文会总结一下我在开发中遇到的各种回滚。

我们知道 git 仓库中有这样的概念: 工作区, 暂存区, 本地仓库, 远程仓库。表示我们当前有关代码存放的空间。
那关于代码文件在这三个空间中涉及的命令分别是：add, commit, push。涉及到回滚操作也和这三个命令相关。

### 工作区回滚（新建文件或编辑文件回滚）

分两种情况

1. 文件已经 git 追踪记录，只是有新的变动，需要回滚

该命令会将你本地工作空间的所有的文件按照当前分支进行检出，相当于是基于当前分支进行了新的 checkout 操作，和最近的 commit 的记录中文件保持一致

```shell
git checkout .
```

2. 新创建的文件，还没有被 git 追踪到

```shell
直接删除文件
rm -f file
```

> 有没有被追踪，可以打印 git status 查看，没有追踪的文件会在 Untracked files: 里

3. 新创建的文件，已经被 git 追踪到

这个会比较麻烦一点，需要从 git 的 cache 中删除掉，然后再删除文件

```shell
git rm -f --cached file
# 当然一个一个删除有点费事儿，可以删除全部缓存，然后继续后续操作，最后记得把之前的文件加入缓存就好
git rm -f --cached .
git add .
```

### 暂存区回滚

表示已经执行 git add 命令了，此时 reset 可以将文件状态返回到工作区

```shell
git reset HEAD file

# 新版本的git建议 2.24.0
git restore --staged file
```

### 本地仓库回滚

表示已经执行 git commit 命令了，此时 reset 可以将文件状态返回上一个或者两个空间
reset 可以追加--hard, --soft, --mixed

```shell
# 撤销到指定commit，保留文件在工作空间
git reset [commitId] --mixed
# 撤销到指定commit，保留文件再暂存区
git reset [commitId] --soft
# 撤销到指定commit，不保留文件
git reset [commitId] --hard
```

### 远程仓库回滚

**非必要，不进行远端仓库回滚!!!**

```shell
# 该操作会造成一个新的commit，新的commit说明了是一次revert操作
# 是对指定commit的一次删除操作，原有commit不会被删除
git revert [commitId]
# 我们还可以对revert的commit再进行revert

# 通过该命令我们可以查看到更多的git信息, 查看HEAD的指向
git reflog
```
