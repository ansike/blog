---
title: mysql 基础命令 - update
categories: 编程
tags:
  - mysql
date: 2022-05-02 11:46:46
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

##### update user password 语句
```sql
ALTER USER 'userName'@'localhost' IDENTIFIED BY 'New-Password-Here';
```

远程调用
```shell
# mysql_remote_execute
mysql_remote_execute "$host" "$port" "$database" "$DB_ROOT_USER" "$DB_ROOT_PASSWORD" <<EOF
  ALTER USER "$userName"@'%' IDENTIFIED BY "$password";
  GRANT ALL PRIVILEGES ON $database.* TO "$username"@'%';
EOF
```