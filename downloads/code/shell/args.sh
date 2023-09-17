#!/bin/bash

echo $1
echo $2
echo $3

# 执行字符串shell
# -s 从输入流中获取脚本
echo 'echo "this is receive arg $1"' | bash -s firstarg
