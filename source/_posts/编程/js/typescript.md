---
title: typescript方法实现
categories: 编程
tags: js
date: 2023-03-02 00:14:37
---

实现一些常见的typescript函数

```typescript
// ------------------------- map相关
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

// ------------------------- union相关
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

// ------------------------- 函数相关
// infer 表示待推断类型
type MyParameters<T extends Function> = T extends (...args: infer Arg) => any ? Arg : never
type MyConstructorParameters<T extends (new (...args: any) => any)> = T extends (new (...args: infer P) => any) ? P : never

type MyReturnType<T extends () => any> = T extends () => infer P ? P : never
type MyInstanceType<T extends (new (...args: any) => any)> = T extends (new (...args: any) => infer P) ? P : never

type MyThisParameterType<T extends (this: any, ...args: any) => any> = T extends (this: infer P, ...args: any) => any ? P : never;
type MyOmitThisParameter<T extends (this: any, ...args: any) => any> = T extends (this: any, ...args: infer P) => infer K ? (...args: P) => K : never

// ------------------------- 字符串
type FirstChar<T extends string> = T extends `${infer L}${infer R}` ? L : never
type LastChar<T extends string> = T extends `${infer L}${infer R}` ? R extends '' ? L : LastChar<R> : never;

// ------------------------- Tuple Union
type TupleToUnion<T extends any[]> = T extends [f: infer E, ...rest: infer R] ? E | TupleToUnion<R> : never;
type FirstItem<T extends any[]> = T extends [f: infer E, ...rest: any] ? E : never;

https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
type IsNever<T> = [T] extends [never] ? true : false;

type LastItem<T extends any[]> = T extends [f: infer L, ...r: infer R] ? R extends [] ? L : LastItem<R> : never;

// ------------------------- String Tuple
type StringToTuple<T extends string> = T extends `${infer F}${infer R}` ? [F, ...StringToTuple<R>] : [];
type LengthOfTuple<T extends any[]> = T["length"]
type LengthOfString<T extends string> = StringToTuple<T>["length"];

// ------------------------- Promise
type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer P> ? P : never;

type ReverseTuple<T extends any[]> = T extends [...f: infer F, l: infer L] ? [L, ...ReverseTuple<F>] : []
type Flat<T extends any[]> = T extends [infer L, ...infer R] ? L extends any[] ? [...Flat<L>, ...Flat<R>] : [L, ...Flat<R>]: [];

type IsEmptyType<T> = T extends Record<string, string> ? [keyof T] extends [never] ? true : false : false
type Shift<T extends any[]> = T extends [infer L, ...infer R] ? R : [];

type IsAny<T> = 0 extends (T & 1) ? true : false;
type Push<T extends any[], I> = T extends any[] ? [...T, I] : never;
type TupleToString<T extends string[]> = T extends [infer L, ...infer R] ? L extends string ? R extends string[] ? `${L}${TupleToString<R>}` : L : '' : ''
```