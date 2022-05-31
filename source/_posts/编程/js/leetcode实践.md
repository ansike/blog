---
title: leetcode实践
categories: 编程
tags: js
date: 2022-04-17 16:24:45
---

该章节只会记录一些工作/生活中能用得到的 leetcode 题解思路

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

2. 最长公共部分（字符串最长子串，718. 最长重复子数组）

```javascript
// 两个数组的最长重复子数组
function findLength(nums1: number[], nums2: number[]): number {
  let maxLen = 0;
  let arr = [];
  const dp = Array.from({ length: nums1.length + 1 }, () =>
    new Array(nums2.length + 1).fill(0)
  );
  for (let i = 1; i <= nums1.length; i++) {
    for (let j = 1; j <= nums2.length; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
      if (dp[i][j] > maxLen) {
        maxLen = dp[i][j];
        arr = nums1.slice(i - maxLen, i);
      }
    }
  }
  console.log(arr);
  return maxLen;
}
```

3. 树的遍历 （前，中，后）（深度优先，按层遍历）

4. 两个数组的交集

5. 大顶堆和小顶堆

6. 数组中查找非偶数对的数(eg:[1,1,2] 查找 2)
   最简单的做饭是利用 map 存每个数出现的次数，最后查找满足条件的数
   还可以利用异或的`自反特性`a^a=0 且 a^0=0

```typescript
function singleNumber(nums: number[]): number {
  let res = 0;
  for (const num of nums) {
    res ^= num;
  }
  return res;
}
```
