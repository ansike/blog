---
title: typescript方法实现
categories: 编程
tags: js
date: 2021-05-05 22:46:13
---

实现一些常见的typescript函数

```typescript

type MyPartial<T> = {
  [key in keyof T]?: T[key]
}

type MyRequired<T> = {[k in keyof T]-?: T[k]}

type MyReadonly<T> = { readonly [k in keyof T]: T[k] }

type MyRecord<K extends number | string | symbol, V> = {
  [k in K]: V
}

type MyPick<T, K extends keyof T> = {
  [k in K]: T[k]
}

// K extends keyof any K【可以是任意的】
// k in keyof T as k extends K ? never : k 【k存在于T中，但是不存在K中，大致逻辑是 k in keyof (T as (k extends K ? never : k))】
type MyOmit<T, K extends keyof any> = {
  [k in keyof T as k extends K ? never : k]: T[k]
}
// 思路二
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

type MyExclude<T, E> = T extends E ? never : T;
type MyExtract<T, U> = T extends U ? T : never;

type MyNonNullable<T> = T extends undefined | null ? never : T;

// infer 表示待推断类型
type MyParameters<T extends Function> = T extends (...args: infer Arg) => any ? Arg : never
```