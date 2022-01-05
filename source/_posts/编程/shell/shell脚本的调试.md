---
title: shell脚本的调试
categories: 编程
tags: shell
date: 2021-05-05 22:46:13
---

1. shell脚本的错误提示一般都不是很准确（eg:缺少一个双引号通常会提示下一行或者几行报错，因为缺少引号后shell认为后几行进行了调用）
2. windows开发的shell脚本通常不能直接在linux中运行，需要进行格式化。dos2unix
3. echo 是最好的调试手段
4. sh [options] xxx.sh
* 1. -n 不会执行脚本，仅检查脚本的正确性
* 2. -v 先输出脚本内容，再执行脚本，如有错误，输出错误信息
* 3. -x 执行脚本及内容显示到屏幕上
5. set -[n|v|x] 在脚本中作用和sh一致