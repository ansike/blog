---
title: linux信号及trap
categories: 编程
tags: shell
date: 2021-05-11 09:14:00
---

运行 shell 脚本时,按下 ctrl+C 程序就会立即终止运行.ctrl+C 就会发出一个 linux 信号,通知 shell 进程终止运行.
某些情况下我们并不希望 shell 脚本在运行时被信号终端,此时可以使用屏蔽信号的手段.
简单说:linux 信号是由一个整数构成的异步消息. 可以由某个进程发给其他进程,也可以由用户按下特定键由系统发给某个进程.

#### 系统支持的各种信号

```shell
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
 6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
16) SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP
21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ
26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO       30) SIGPWR
31) SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
63) SIGRTMAX-1  64) SIGRTMAX

```

#### 使用 tap 控制信号

用途: 程序被中断时完成清理工作, 或者屏蔽用户非法输入

```shell
# 监听ctrl+c信号
trap "echo hello" INT # trap "echo hello" 2
# 取消监听所有ctrl+c信号
trap "" INT # trap "" 2
# 恢复监听ctrl+c信号
trap ":" INT # trap ":" 2
```
