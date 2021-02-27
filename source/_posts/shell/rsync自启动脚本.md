---
title: 系统自启动rsync服务的方法
---

使用`/etc/init.d/rsyncd {start|stop|restart}`启动,停止,重启

### 分析

1. `rsync`的命令
   rsync --daemon
   pkill rsync
   netstat -lntp | grep 873
2. 实现`/etc/init.d/rsyncd`脚本
3. 通过 chkconfig 实现开机自启动
   注意下方文件中的二行和第三行

##### 主干脚本

执行前该文件需要`chmod +x /etc/init.d/rsyncd`

```shell
#!/bin/bash
# chkconfig: 2345 20 80
# description: Save and restores system entropy poll
[ $# -ne 1 ] && {
  echo "USAGE:$0 {start|stop|restart}"
  exit 1
}

if [ "$1" = "start" ]; then
  rsync --daemon
  sleep 2
  [ `netstat -lntp | grep rsync | wc -l` -gt 0 ] && {
    echo "rsyncd is start."
    exit 0
  }
elif [ "$1" = "stop" ]; then
  killall rsync &>/etc/null
  sleep 2
  [ `netstat -lntp | grep rsync | wc -l` -eq 0 ] && {
    echo "rsyncd is stopped."
    exit 0
  }
elif [ "$1" = "restart" ]; then
  killall rsync
  sleep 1
  killPro=`netstat -lntp | grep rsync | wc -l`
  rsync --daemon
  sleep 1
  startPro=`netstat -lntp | grep rsync | wc -l`
  [ "$killPro" -eq 0 -a "$startPro" -gt 0 ] && {
    echo "rsyncd is restarted."
    exit 0
  }
else
  echo "USAGE:$0 {start|stop|restart}"
  exit 1
fi
```

##### 主干脚本[函数版本]

```shell
#!/bin/bash
# chkconfig: 2345 20 80
# description: Save and restores system entropy poll
. /etc/init.d/functions
function usage() {
  echo "USAGE:$0 {start|stop|restart}"
  exit 1
}

function start() {
  rsync --daemon
  sleep 2
  [ `netstat -lntp | grep rsync | wc -l` -gt 0 ] && {
    action "rsyncd is start." /bin/true
  } || {
    action "rsyncd is start." /bin/false
  }
}

function stop() {
  killall rsync &>/etc/null
  sleep 2
  [ `netstat -lntp | grep rsync | wc -l` -eq 0 ] && {
    action "rsyncd is stopped." /bin/true
  } || {
    action "rsyncd is started." /bin/false
  }
}

function main(){
  [ $# -ne 1 ] && {
    usage
  }
  if [ "$1" = "start" ]; then
    start
  elif [ "$1" = "stop" ]; then
    stop
  elif [ "$1" = "restart" ]; then
    stop
    sleep 1
    start
  else
    usage
  fi
}

main $*
```

##### 加入开机自启动

注意脚本的第二行
`# chkconfig: 2345 20 80`
2345 表示 Linux 运行级别,20 表示开始启动顺序,80 表示脚本停止顺序
应用服务一般考后启动,越早停止越好

```shell
chkconfig --list [命令名] # 如 rsyncd, /etc/init.d/rsyncd
chkconfig --add [命令名] # 添加任务
chkconfig --del [命令名] # 删除任务

chkconfig rsyncd on # 启动
chkconfig rsyncd off # 停止
```

##### kill pkill killall

```shell
ps -ef | grep -v grep | grep rsync
#root       705     1  0 23:29 ?        00:00:00 rsync --daemon

# 比较麻烦需要先查处进程号才能杀死
kill 705

# 没有任何提示杀死[据说有误杀问题]
pkill rsync

# 杀死全部进程,有提示
killall rsync
```
