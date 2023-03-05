---
title: typescript方法实现
categories: 编程
tags: js
date: 2023-03-02 00:14:37
---

实现一些常见的 typescript 函数
https://bigfrontend.dev/typescript

```typescript
// ------------------------- map相关
type MyPartial<T> = {
  [key in keyof T]?: T[key]
}

type MyRequired<T> = { [k in keyof T]-?: T[k] }

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

type MyExclude<T, E> = T extends E ? never : T
type MyExtract<T, U> = T extends U ? T : never

type MyNonNullable<T> = T extends undefined | null ? never : T

// ------------------------- 函数相关
// infer 表示待推断类型
type MyParameters<T extends Function> = T extends (...args: infer Arg) => any
  ? Arg
  : never
type MyConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never

type MyReturnType<T extends () => any> = T extends () => infer P ? P : never
type MyInstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer P
  ? P
  : never

type MyThisParameterType<T extends (this: any, ...args: any) => any> =
  T extends (this: infer P, ...args: any) => any ? P : never
type MyOmitThisParameter<T extends (this: any, ...args: any) => any> =
  T extends (this: any, ...args: infer P) => infer K ? (...args: P) => K : never

// ------------------------- 字符串
type FirstChar<T extends string> = T extends `${infer L}${infer R}` ? L : never
type LastChar<T extends string> = T extends `${infer L}${infer R}`
  ? R extends ''
    ? L
    : LastChar<R>
  : never

// ------------------------- Tuple Union
type TupleToUnion<T extends any[]> = T extends [f: infer E, ...rest: infer R]
  ? E | TupleToUnion<R>
  : never
type FirstItem<T extends any[]> = T extends [f: infer E, ...rest: any]
  ? E
  : never

//www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
https: type IsNever<T> = [T] extends [never] ? true : false

type LastItem<T extends any[]> = T extends [f: infer L, ...r: infer R]
  ? R extends []
    ? L
    : LastItem<R>
  : never

// ------------------------- String Tuple
type StringToTuple<T extends string> = T extends `${infer F}${infer R}`
  ? [F, ...StringToTuple<R>]
  : []
type LengthOfTuple<T extends any[]> = T['length']
type LengthOfString<T extends string> = StringToTuple<T>['length']

// ------------------------- Promise
type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never

type ReverseTuple<T extends any[]> = T extends [...f: infer F, l: infer L]
  ? [L, ...ReverseTuple<F>]
  : []
type Flat<T extends any[]> = T extends [infer L, ...infer R]
  ? L extends any[]
    ? [...Flat<L>, ...Flat<R>]
    : [L, ...Flat<R>]
  : []

type IsEmptyType<T> = T extends Record<string, string>
  ? [keyof T] extends [never]
    ? true
    : false
  : false
type Shift<T extends any[]> = T extends [infer L, ...infer R] ? R : []

type IsAny<T> = 0 extends T & 1 ? true : false
type Push<T extends any[], I> = T extends any[] ? [...T, I] : never
type TupleToString<T extends string[]> = T extends [infer L, ...infer R]
  ? L extends string
    ? R extends string[]
      ? `${L}${TupleToString<R>}`
      : L
    : ''
  : ''

// 新增genetic R 记录 T 的内容，当R的长度达到C时停止
type Repeat<T, C extends number, R extends any[] = []> = R['length'] extends C
  ? R
  : Repeat<T, C, [...R, T]>

// When conditional types act on a generic type, they become distributive when given a union type
// [L] extends [A] 是为了防止联合类型的分配，解决 any extends A 可能走true or false
type Filter<T extends any[], A> = T extends [infer L, ...infer R]
  ? [L] extends [A]
    ? [L, ...Filter<R, A>]
    : Filter<R, A>
  : []

// 新增一个genetic array 参数，使用其length属性来做加法计算比较大小
type LargerThan<
  A extends number,
  B extends number,
  C extends any[] = []
> = C['length'] extends A
  ? false
  : C['length'] extends B
  ? true
  : LargerThan<A, B, [...C, any]>

// 因为C从0开始算，所以从LagerThan的角度考虑更简单一点
type SmallerThan<
  A extends number,
  B extends number,
  C extends any[] = []
> = C['length'] extends B
  ? false
  : C['length'] extends A
  ? true
  : SmallerThan<A, B, [...C, any]>
type SmallerThan<
  A extends number,
  B extends number,
  C extends any[] = []
> = C['length'] extends A
  ? C['length'] extends B
    ? false
    : true
  : C['length'] extends B
  ? false
  : SmallerThan<A, B, [...C, any]>

type Add<
  A extends number,
  B extends number,
  T extends any[] = [],
  R extends any[] = []
> = A extends T['length']
  ? B extends R['length']
    ? [...T, ...R]['length']
    : Add<A, B, T, [...R, any]>
  : Add<A, B, [...T, any], R>

// 涉及到计数都可以考虑使用增加一个array generic来解决
type ToNumber<
  T extends string,
  R extends any[] = []
> = `${R['length']}` extends T ? R['length'] : ToNumber<T, [...R, any]>

// https://fettblog.eu/typescript-union-to-intersection/
// 1. 利用union类型默认distributive特性，构建函数union
// 2. 从子集推算父集，自动实现联合类型交叉
type UnionToIntersection<T> = (T extends any ? (a: T) => void : never) extends (
  a: infer R
) => void
  ? R
  : never
type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }>
// {a: string} & {b: string} & {c: string}

// FindIndex，借助equal实现
// 这个equal好理解
type Equal<T, K> = [T] extends [K]
  ? [K] extends [T]
    ? keyof T extends keyof K
      ? keyof K extends keyof T
        ? true
        : false
      : false
    : false
  : false
type FindIndex<T extends any[], E, R extends any[] = []> = T extends [
  infer F,
  ...infer L
]
  ? Equal<E, F> extends true
    ? R['length']
    : FindIndex<L, E, [...R, any]>
  : never

type A = [any, never, 1, '2', true]
type B = FindIndex<A, 1> // 2
type C = FindIndex<A, 3> // never

// Equal的第二种实现
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false

type Trim<T extends string> = T extends ` ${infer L}`
  ? Trim<L>
  : T extends `${infer L} `
  ? Trim<L>
  : T
type A = Trim<'    BFE.dev'> // 'BFE'
type B = Trim<' BFE. dev  '> // 'BFE. dev'
type C = Trim<'  BFE .   dev  '> // 'BFE .   dev'

type ReplaceAll<
  S extends string,
  F extends string,
  T extends string
> = F extends ''
  ? S
  : S extends `${infer L}${F}${infer R}`
  ? `${L}${T}${ReplaceAll<R, F, T>}`
  : S

type A = ReplaceAll<'aba', 'b', ''> // 'aa'
type B = ReplaceAll<'ababbab', 'b', ''> // 'aaa'
type C = ReplaceAll<'ababbba', 'bb', 'b'> // 'ababba'

// ------------------------- slice 函数实现
type LargerEqualThan<
  A extends number,
  B extends number,
  C extends any[] = []
> = C['length'] extends A
  ? C['length'] extends B
    ? true
    : false
  : C['length'] extends B
  ? true
  : LargerEqualThan<A, B, [...C, any]>
type SmallerThan<
  A extends number,
  B extends number,
  C extends any[] = []
> = C['length'] extends B
  ? false
  : C['length'] extends A
  ? true
  : SmallerThan<A, B, [...C, any]>
type Slice<
  A extends any[],
  S extends number = 0,
  E extends number = A['length'],
  T1 extends any[] = [],
  T2 extends any[] = []
> = A extends [infer F, ...infer R]
  ? LargerEqualThan<T1['length'], S> extends true
    ? SmallerThan<T1['length'], E> extends true
      ? Slice<R, S, E, [...T1, any], [...T2, F]>
      : T2
    : Slice<R, S, E, [...T1, any], T2>
  : T2

type A1 = LargerEqualThan<2, 2> // true
type A2 = SmallerThan<1, 2> // true

type A = Slice<[1, 2, 3, 4], 0, 2> // [1, 2]
type B = Slice<[1, 2, 3, 4], 2> // [3, 4]
type C = Slice<[number, boolean, bigint], 2, 5> // [bigint]
type D = Slice<[string, boolean], 0, 1> // [string]
type E = Slice<[number, boolean, bigint], 5, 6> // []

// ------------------------- subtract 函数实现
type LargerEqualThan<
  A extends number,
  B extends number,
  C extends any[] = []
> = C['length'] extends A
  ? C['length'] extends B
    ? true
    : false
  : C['length'] extends B
  ? true
  : LargerEqualThan<A, B, [...C, any]>
type SmallerThan<
  A extends number,
  B extends number,
  C extends any[] = []
> = C['length'] extends B
  ? false
  : C['length'] extends A
  ? true
  : SmallerThan<A, B, [...C, any]>

type Subtract<
  A extends number,
  B extends number,
  R extends any[] = [],
  P extends any[] = []
> = LargerEqualThan<A, B> extends true
  ? LargerEqualThan<R['length'], B> extends true
    ? SmallerThan<R['length'], A> extends true
      ? Subtract<A, B, [...R, any], [...P, any]>
      : P['length']
    : Subtract<A, B, [...R, any], P>
  : never

type A = Subtract<1, 1> // 0
type B = Subtract<10, 3> // 7
type C = Subtract<3, 10> // never

// ------------------------- Multiply 函数实现
type Multiply<
  A extends number,
  B extends number,
  BaseT extends any[] = [],
  CountT extends any[] = [],
  R extends any[] = []
> = CountT['length'] extends B
  ? R['length']
  : BaseT['length'] extends A
  ? Multiply<A, B, [], [...CountT, any], R>
  : Multiply<A, B, [...BaseT, any], CountT, [...R, any]>

type A = Multiply<1, 0> // 0
type B = Multiply<4, 6> // 24

// ------------------------- Divide 函数实现
type Divide<
  A extends number,
  B extends number,
  BaseT extends any[] = [],
  CounT extends any[] = [],
  R extends any[] = []
> = B extends 0
  ? never
  : BaseT['length'] extends B
  ? Divide<A, B, [], [...CounT, any], R>
  : R['length'] extends A
  ? CounT['length']
  : Divide<A, B, [...BaseT, any], CounT, [...R, any]>

type A = Divide<1, 0> // never
type B = Divide<4, 2> // 2
type C = Divide<10, 3> // 3

// ------------------------- assertsNever 函数实现
function assertsNever(arg: never) {
  throw new TypeError(`Missing case ${arg}`)
}

type Value = 'a' | 'b' | 'c'
declare let value: Value

switch (value) {
  case 'a':
    break
  case 'b':
    break
  default:
    assertsNever(value)
    break
}

// ------------------------- 选择排序 函数实现
type Sort<
  T extends number[],
  CounT extends any[] = [],
  CounN extends any[] = [],
  R extends any[] = []
> = R['length'] extends T['length']
  ? R
  : CounT['length'] extends T['length']
  ? Sort<T, [], [...CounN, any], R>
  : CounN['length'] extends T[CounT['length']]
  ? Sort<T, [...CounT, any], CounN, [...R, CounN['length']]>
  : Sort<T, [...CounT, any], CounN, R>

type A = Sort<[100, 9, 20, 0, 0, 55]> // [0, 0, 9, 55, 100]
type B = Sort<[1, 0, 0, 100, 88, 5, 99, 400]> // 会被认为超时

type ExtractNum<
  T extends any[],
  K extends number,
  P extends any[] = []
> = T extends [infer L, ...infer R]
  ? L extends K
    ? ExtractNum<R, K, [...P, L]>
    : ExtractNum<R, K, P>
  : P

type A1 = ExtractNum<[100, 9, 20, 0, 0, 55], 0> // [0, 0]

type Sort<
  T extends number[],
  CounN extends any[] = [],
  R extends any[] = []
> = R['length'] extends T['length']
  ? R
  : ExtractNum<T, CounN['length']>['length'] extends 0
  ? Sort<T, [...CounN, any], R>
  : Sort<T, [...CounN, any], [...R, ...ExtractNum<T, CounN['length']>]>

type A = Sort<[1, 9, 20, 0, 0, 2]> // [0, 0, 9, 55, 100]
type B = Sort<[1, 0, 100, 88, 5, 99, 400]> // [0, 1, 5, 88, 99, 100, 400]

// ------------------------- Capitalize 函数实现
type MyCapitalize<T extends string> = T extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : never
type A = MyCapitalize<'bfe'> // 'Bfe'

// ------------------------- Split 函数实现
type Split<
  S extends any,
  D extends string,
  R extends any[] = []
> = S extends `${infer L}${D}${infer B}` ? Split<B, D, [...R, L]> : [...R, S]

type A = Split<'BFE.dev', '.'> // ['BFE', 'dev']
type B = Split<'bfe.dev', 'e'> // ['bf', '.d', 'v']
type C = Split<'bfe.bfe.bfe', 'bfe'> // ['', '.', '.', '']

// ------------------------- SnakeCase 函数实现 大驼峰=>下划线
type SnakeCase<
  S extends string,
  T extends any[] = [],
  R extends string = ''
> = S extends `${infer L}${infer P}`
  ? T['length'] extends 0
    ? L extends Uppercase<L>
      ? SnakeCase<P, [...T, any], `${Lowercase<L>}`>
      : SnakeCase<P, [...T, any], `${L}`>
    : L extends Uppercase<L>
    ? SnakeCase<P, [...T, any], `${R}_${Lowercase<L>}`>
    : SnakeCase<P, [...T, any], `${R}${L}`>
  : R

type A = SnakeCase<'BigFrontEnd'> // big_front_end

// ------------------------- CamelCase 函数实现
type CamelCase<
  S extends string,
  C extends any[] = [],
  R extends string = ''
> = S extends `${infer L}_${infer P}`
  ? L extends `${infer F}${infer Rest}`
    ? CamelCase<P, [...C, any], `${R}${Uppercase<F>}${Rest}`>
    : R
  : S extends `${infer F}${infer Rest}`
  ? CamelCase<'', [...C, any], `${R}${Uppercase<F>}${Rest}`>
  : R

type A = CamelCase<'big_front_end'> // BigFrontEnd

// ------------------------- StringToNumber 函数实现
type StringToNumber<
  S extends string,
  R extends any[] = []
> = `${R['length']}` extends S ? R['length'] : StringToNumber<S, [...R, any]>

type A = StringToNumber<'12'> // 123

// ------------------------- Abs 函数实现
type StringToNumber<
  S extends string,
  R extends any[] = []
> = S extends `${R['length']}` ? R['length'] : StringToNumber<S, [...R, any]>
type Abs<N extends number> = `${N}` extends `-${infer R}`
  ? StringToNumber<R>
  : N

type A = Abs<-1>
type B = Abs<0>
type C = Abs<1>

// ------------------------- ObjectPaths 函数实现
type ObjectPaths<O extends Record<string, any>> = {
  [K in keyof O]: K extends string
    ? O[K] extends Record<string, any>
      ? `${K}.${ObjectPaths<O[K]>}`
      : K
    : never
}[keyof O]

type Obj = {
  a: {
    b: {
      c: 1
      d: 2
    }
    e: 1
  }
  f: 3
}

type A = ObjectPaths<Obj>
// 'a.b.c' | 'a.b.d' | 'a.e' | 'f'

// ------------------------- DiffKeys 函数实现
type DiffKeys<A extends Record<string, any>, B extends Record<string, any>> =
  | Exclude<keyof A, keyof B>
  | Exclude<keyof B, keyof A>

type A = DiffKeys<{ a: 1; b: 2 }, { b: 1; c: 2 }> // 'a' | 'c'

// ------------------------- MapStringUnionToObjectUnion 函数实现
type MapStringUnionToObjectUnion<U extends string> = U extends any
  ? { value: U }
  : never
type B = MapStringUnionToObjectUnion<'1' | '2'>

// ------------------------- UndefinedToNull 函数实现
type UndefinedToNull<T> = T extends Record<string, any>
  ? {
      [K in keyof T]: UndefinedToNull<T[K]>
    }
  : T extends [infer F, ...infer L]
  ? [UndefinedToNull<F>, ...UndefinedToNull<L>]
  : T extends undefined
  ? null
  : T

type A = UndefinedToNull<string> // string
type B = UndefinedToNull<undefined> // null
type C = UndefinedToNull<[undefined, null]> // [null, null]
type D = UndefinedToNull<{
  a: undefined
  b: [1, undefined]
}> // {a: null, b: [1, null]}
```
