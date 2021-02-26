---
title: shell中的函数
---

### 语法

```shell
# 标准写法
function fn1(){
  echo 222
}
a=$(fn1)

# 简化写法1, 函数名右的空格必须
function fn2 {
  # 返回值当成是该函数的执行退出值
  return 221
}
fn2
b=$?

# 简化写法2
fn3 () {
  echo "fn3-3 参数个数:$#,分别是 $1,$2"
}

c=$(fn3 a b)

echo "$a,$b,$c"

#fn1 arg1 arg2 ..
fn1

```
#### 执行说明
1. 执行时函数名之前的function和之后的小括号都不需要
2. 函数的定义必须在执行之前
3. 函数执行时会和脚本共用变量
4. 函数中的return和exit类似,会直接退出函数.如果脚本开头设置了`set -e`的话尽量不要使用return或者使用`set +e`包裹一下,否则也会因为函数返回非0而直接退出脚本
5. return的返回值必须是数字,返回的值会当成当前命令执行的返回值,该返回值只能是数字
6. 函数放在独立文件中时需要使用`source`或者`.`进行加载
7. 函数执行时,父脚本的参数临时被函数参数掩盖或者隐藏
