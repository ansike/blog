---
title: webpack的构建流程
categories: 编程
tags: 
  - js
  - 工程化
  - webpack
date: 2022-01-08 17:04:57
---

1. 获取配置. 从命令行或者配置文件中
2. 执行编译. 执行webpack方法, 产生一个compiler对象
3. 读取入口文件. 根据第一步骤中的entry读取入口文件
4. 解析文件. 此时会根据配置中的loader解析处理文件
5. 递归编译. 根据入口文件中文件的引用以及引用文件的引用,递归的处理所有文件
6. 编译优化. 如一些commonchunck提取, cssmodule合并, 文件压缩等plugin可以在编译的整个生命周期监听webpack抛出的事件做优化操作
7. emit文件. 根据编译中的moudle组合成chunk即引用路径,准备输出文件
8. 写入本地系统. 将内存中的文件按照目录位置关系写入本地硬盘
