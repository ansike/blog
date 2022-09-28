---
title: cron & crontab
categories: 编程
tags: shell
date: 2021-05-05 22:46:13
---

### cron 和 crontab 关系

cron 是定时任务的实现。cron 包括两部分：crond（守护进程），crontab （工具）。
用户通过 crontab 编写的任务交给 crond 进行周期性的执行。

### crontab 基础语法

{minute} {hour} {day-of-month} {month} {day-of-week} {full-path-to-shell-script|command}

- minute: 区间为 0 – 59
- hour: 区间为 0 – 23
- day-of-month: 区间为 0 – 31
- month: 区间为 1 – 12. 1 是 1 月. 12 是 12 月
- Day-of-week: 区间为 0 – 7. 周日可以是 0 或 7

1. 每天执行一次kinit
```shell
# 创建cron文件
cat > kinit.cron <<EOF
# kinit 定时任务
* 10 * * * kinit
EOF

# 设置cron任务制定用户执行
sudo crontab -u ansike kinit.cron
```