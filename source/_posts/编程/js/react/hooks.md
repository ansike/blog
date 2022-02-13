---
title: hooks中的常见问题
categories: 编程
tags:
  - react
  - js
date: 2021-03-28 10:46:13
---

常用的 hook: useEffect, useState, useRef

常用的功能

<a href="#1">1. 初始化即执行异步任务</a>
<a href="#2">2. UI 交互中异步任务</a>
<a href="#3">3. 初始化即执行异步任务</a>

<h3 id="1">1. 初始化即执行异步任务</h3>
#### 异步任务响应回来之前组建被销毁会报一个 warning

> Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.in Notification

> 问题： 不能在销毁的组建上执行 state 的更新，为了解决这个问题需要在 useEffect 的清理函数中取消所有的订阅和异步任务

解决方案

1. 判断到当前函数已经销毁时不再 set state；
2. 退出执行 clean 时，取消所有订阅和异步任务；

```javascript
// 临时变量禁止接口返回之后重新赋值
useEffect(() => {
  let isAbort = false;
  (async () => {
    const res = await fetch(url);
    // 判断当isAbort为true时不进行赋值操作
    if (res && !isAbort) {
      setState(res);
    }
  })();
  return () => {
    // 此处取消所有的订阅和异步任务
    isAbort = true;
    // unpulish()
  };
}, []);

// 接口级别的取消
useEffect(() => {
  const abortController = new AbortController();
  (async () => {
    const res = await fetch(url, {
      signal: abortController.signal,
    });
    if (res) {
      setState(res);
    }
  })();
  return () => {
    abortController.abort();
  };
}, []);
```

useEffect 使用的注意事项

> 接受两个参数：第一个参数为回调函数；第二个非必传参数为依赖项。
> effect 第一个参数的执行时机受第二个参数影响
> 没有参数时每次 state 发生变化都会执行
> 有参数时监听到 state 变化时执行

<h3 id="2">2. UI 交互中异步任务</h3>
UI交互时发起异步任务，组件销毁时取消异步任务。和第一种case不一样，可能无法在函数调用useEffect的销毁部分清除副作用。
比如此时调用onClick时还触发了其他state的事件导致整个hooks重新执行，此时timer会重新定义，useEffect内部的timer

```javascript
let timer = null;
useEffect(() => {
  return () => {
    timer && clearTimeout(timer);
    timer = null;
  };
}, []);
const onClick = () => {
  timer = setTimeout(() => {
    setState(val);
  }, 5000);
};
```

2. useState 更新为异步更新，即调用完 set 方法后无法立即获取到更新后的值
