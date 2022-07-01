---
title: mysql 基础命令 - update
categories: 编程
tags:
  - mysql
date: 2021-05-05 22:46:13
---

##### 简单 update 语句

```sql
-- 更换性别 case when
update Salary
  set sex =
    case sex
      when "m" then "f"
      else "m"
    end;

-- 更换性别 if
update Salary
  set sex = if(sex='m', 'f', 'm');
  
-- 奇淫巧计
update Salary set sex = char(ascii('m')+ascii('f')-ascii(sex));
```
