---
title: leetcode实践
categories: 编程
tags: js
date: 2022-04-17 16:24:45
---

该章节只会记录一些工作/生活中能用得倒的 leetcode 题解思路

1. 整数划分
   leetcode https://leetcode.cn/problems/coin-change/
   一个整数用给定的数组中的数做拆分

最简单的理解方式还是递归的处理整数

```javascript
// 自顶向下 DFS
function coinChange(coins, amount) {
  let min = Number.MAX_SAFE_INTEGER;
  const deal = (left, count) => {
    if (left <= 0) {
      if (left === 0) {
        min = Math.min(min, count);
      }
      return;
    }
    coins.forEach((co) => deal(left - co, count + 1));
  };
  deal(amount, 0);
  return min === Number.MAX_SAFE_INTEGER ? -1 : min;
}

// 自底向上 DP
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
}
```

2.
