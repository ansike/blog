---
title: mysql 基础命令 - delete
categories: 编程
tags:
  - mysql
date: 2022-05-02 11:46:46
---

##### 简单 delete 语句

```sql
-- 删除重复邮箱，保留最小的ID
delete p1 from 
  Person as p1, Person as p2 
where
  p1.email=p2.email and p1.id>p2.id;


```
