---
title: case应用及实践
---


### 基础语法
``` shell
case "$var" in
  "[值1]")
    # 指令1
    ;;
  "[值2]")
    # 指令2
    ;;
  *)
    # 默认指令
    ;;
esac
```

### 数字匹配demo
``` shell
read -p "请输入数字:" var
case "$var" in
  1)
    echo "匹配到1,输出1"
    ;;
  2)
    echo "匹配到2,输出2"
    ;;
  [3-9])
    echo "匹配到${var},输出${var}"
    ;;
  *)
    echo "进入默认项,只能输入[1-9]的数字"
    ;;
esac
```
