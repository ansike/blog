---
title: 正则相关的case
categories: 编程
tags:
  - js
  - 正则
date: 2022-11-26 20:28:28
---

### 循环匹配指定模式

我们对字符串做全局匹配替换时会需要该思想

```javascript
const reg = /{{(\w*)}}/g;
const confMap = {
  AAAA: "1",
  BBBB: "2",
};

let str = `str1={{AAAA}}str2={{BBBB}}`;
let arr = [];
while ((arr = reg.exec(str))) {
  const fullString = arr[0];
  const matchKey = arr[1];
  str = str.replace(fullString, confMap[matchKey]);
  // 这行代码对于该case来说是必须的，因为replace会导致str的长度变短，不做重置的话会漏掉BBBB的case
  reg.lastIndex = reg.lastIndex + (confMap[matchKey].length - fullString);
}
console.log(str);
// str1=1str2=2
```

### 全局匹配中（g）test 不符合预期的 case

需求是要写匹配三个数字的正则，我们很有可能立即会写出以下的正则

> const reg = /^\d{3}$/g;

逻辑其实很简单：^,$ 分别表示开头和结尾，整个字符串从开始到结束都只有 3 个数字。
但是实际的结果却是：

```javascript
const reg = /^\d{3}$/g;
reg.test("123");
// true
reg.test("123");
// false
```

分析之后发现是因为加了`g`的原因。
`g`是全局搜索的意思，增加之后 regexp 实例会增加`lastIndex`的属性，下一次的匹配会从`lastIndex`开始向后匹配，如果匹配不到会把`lastIndex`置为 0。
针对这个例子，reg 刚开始`lastIndex`为 0，第一次 test 能匹配成功 true，成功之后`lastIndex`为 3。下一次匹配从 3 开始时因超过了字符串的最大长度也无法匹配 false，`lastIndex`重置为 0。
