---
title: statefulset
categories: 编程
tags:
  - k8s
date: 
---

### 为什么需要statefulset
1. 唯一：网络标识是唯一的
2. 稳定：使用pvc，持久的存储数据
3. 有序：有序的部署，扩展，更新，删除

需要headless service负责网络标识

