---
title: mysql 基础命令 - select
categories: 编程
tags:
  - mysql
date: 2021-05-05 22:46:13
---

##### 数据库查询语句
>谓词相关 =, (!=|<>), >, <
``` sql
-- 等于   查询所有type等于1的name
selct name from lists where type=1;

-- 不等于   查询所有type不等于1的name
selct name from lists where type!=1 or type is null;
selct name from lists where type<>1 or type is null;
/**
为什么type!=1不能包含所有情况呢？
因为sql比较的三值逻辑 -- ture, false, unkonwn。
1.任何值与null做比较结果都是unknown；
2.where只会输出为true的部分；
所以遇到type=null时会比较结果为unknown，此时会丢弃该结果。

sql提供了is null 和 is not null做null的特殊判断
*/

-- 查找A中所有不存在于B表的数据
-- not in
select Name as Customers from Customers where Id not in (
    select CustomerId from Orders
);
-- left join
select Name as Customers from Customers left join Orders on Customers.Id=Orders.CustomerId where Orders.Id is null ;
/*
将Orders左联Customers，以Customers.Id=Orders.CustomerId，此时会生成一个临时表，过滤临时表中Orders.Id为null的即为所求的数据
*/

```
