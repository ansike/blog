#!/bin/bash

HOSTS="hostname1 hostname2"

for host in $HOSTS
do
  expect -c "
    set timeout 5
    spawn ssh root@$host
    expect {
      \"password:\" { send \"23322456\r\" }
      \"yes/no:\" { send \"yes\r\"; exp_continue }
    }
    expect \"*]#\" { send \"uname -a\r\" }
    send \"exit\r\"
    expect eof
  "
done