---
title: mysql 基础命令 - insert
categories: 编程
tags:
  - mysql
date: 2022-10-23 10:13:42
---

示例数据

```sql
create table if not exists `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

INSERT IGNORE INTO `test` VALUES  (1, "test1");
select * from test\G;
-- drop table test;
```

insert 插入操作

### 存在某条数据时不更新且不报错，不存在时插入

```sql
INSERT IGNORE INTO `test` VALUES  (1, "test11");
```

### 存在某条数据时更新，不存时在插入

```sql
BEGIN;
INSERT INTO `test` VALUES  (1, "test11") ON DUPLICATE KEY UPDATE;
COMMIT;
```

### sql中的if语句
```sql
-- platform 中不存在 product 表则把 config 表重命名为 product
BEGIN;
SET @QUERY = IF(
    NOT EXISTS(
      select  TABLE_NAME  from  INFORMATION_SCHEMA.TABLES  where TABLE_SCHEMA ='platform' and  TABLE_NAME = 'product'
    ),
    'ALTER TABLE config RENAME TO product;',
    'DO TRUE;'
  );
PREPARE stmt FROM @QUERY;
EXECUTE stmt;
COMMIT;

-- 创建product表create_time字段
BEGIN;
SET @QUERY = IF(
    NOT EXISTS(
      SELECT * FROM information_schema.columns WHERE table_schema='platform' AND table_name = 'product' AND column_name = 'create_time'
    ),
    'ALTER TABLE product ADD COLUMN create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "创建时间";',
    'DO TRUE;'
  );
PREPARE stmt FROM @QUERY;
EXECUTE stmt;
COMMIT;
```
