---
title: 子shell产生途径及特点
---
#### 产生的途径
1. 带"&"提交后台作业【异步模式】。能使用本地变量
2. 使用管道功能。能使用本地变量
3. 使用"()"功能。能使用本地变量
4. 通过调用外部的shell脚本产生子shell，子shell中仅能使用父shell中的环境变量，不能使用本地变量

#### 测试shell

1. 使用&后台执行
```shell
#/bin/bash
parent_var="Parent"
# 输出父shell同级，BASH_SUBSHELL为系统环境变量
echo "Shell start: ParentShell: Level: $BASH_SUBSHELL"
{
  echo "SubShell Level: $BASH_SUBSHELL"
  sub_var="SUb"
  echo "parent_var=$parent_var"
  sleep 2
  echo "SubShell is over"
} &

sleep 1
echo "ParentShell start again"
echo "Shell start: ParentShell: Level: $BASH_SUBSHELL"
if [ -z $sub_var ]
then
  echo "sub_var is not defined in parent shell"
else
  echo "sub_var is defined $sub_var in parent shell"
fi
```


2. 使用管道
```shell
#/bin/bash
parent_var="Parent"
# 输出父shell同级，BASH_SUBSHELL为系统环境变量
echo "Shell start: ParentShell: Level: $BASH_SUBSHELL"
echo "管道" | {
  echo "SubShell Level: $BASH_SUBSHELL"
  sub_var="SUb"
  echo "parent_var=$parent_var"
  sleep 2
  echo "SubShell is over"
}

sleep 1
echo "ParentShell start again"
echo "Shell start: ParentShell: Level: $BASH_SUBSHELL"
if [ -z $sub_var ]
then
  echo "sub_var is not defined in parent shell"
else
  echo "sub_var is defined $sub_var in parent shell"
fi
```

3. 使用()功能
```shell
#/bin/bash
parent_var="Parent"
# 输出父shell同级，BASH_SUBSHELL为系统环境变量
echo "Shell start: ParentShell: Level: $BASH_SUBSHELL"
(
  echo "SubShell Level: $BASH_SUBSHELL"
  sub_var="SUb"
  echo "parent_var=$parent_var"
  sleep 2
  echo "SubShell is over"
)

sleep 1
echo "ParentShell start again"
echo "Shell start: ParentShell: Level: $BASH_SUBSHELL"
if [ -z $sub_var ]
then
  echo "sub_var is not defined in parent shell"
else
  echo "sub_var is defined $sub_var in parent shell"
fi
```

4. 调用外部shell
```shell
#/bin/bash
parent_var="Parent"
# 输出父shell同级，BASH_SUBSHELL为系统环境变量
echo "Shell start: ParentShell: Level: $BASH_SUBSHELL"
sh ./subshell.sh
sleep 1
echo "ParentShell start again"
echo "Shell start: ParentShell: Level: $BASH_SUBSHELL"
if [ -z $sub_var ]
then
  echo "sub_var is not defined in parent shell"
else
  echo "sub_var is defined $sub_var in parent shell"
fi
```

subshell
```shell
#/bin/bash
echo "SubShell Level: $BASH_SUBSHELL"
sub_var="SUb"
echo "parent_var=$parent_var"
sleep 2
echo "SubShell is over"
```

#### 总结
1. 父shell不能使用子shell中的变量，子shell可以使用父shell中的变量。注意区分局部变量和环境变量
2. 管道,(),{}&都会生成子shell，注意变量使用避坑。
