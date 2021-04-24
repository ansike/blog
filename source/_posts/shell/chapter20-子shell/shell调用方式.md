---
title: shell调用方式
---

### 调用方式分类
1. `fork`方式。`sh xxx.sh` 同步执行所有的shell
2. `exec`方式。`exec xxx.sh` 执行完exec脚本的内容后，父shell剩余的代码不能执行
3. `source`或者`.`方式。`source xxx.sh` 同步执行所有的shell，且能读取子shell中的全部变量
