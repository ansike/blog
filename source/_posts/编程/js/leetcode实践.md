---
title: leetcode实践
categories: 编程
tags: js
date: 2022-05-26 23:09:34
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

7. 设计哈希映射
没有一个 map 能完全存储所有的映射关系，需要一种方式来实现有限的资源做无限的事儿（理论上）。
   横向上无法扩展太多，可以从纵向考虑，对象+链表的方法
   
  >1. 选择一个最大的 BASE 值，作为取于的数
  >2. 创建结构化的数据结构(data)存储所有的 key，长度为（BASE）
  >3. 每次新增一个 key，都需要 key%BASE，然后再 data[key%BASE]中存储对应的链表，在链表上存储 hash 冲突的 key

```typescript
class MyHashMap {
  BASE = 679;
  data = Array.from({ length: this.BASE }, () => []);
  constructor() {}

  put(key: number, value: number): void {
    const idx = this.hash(key);
    for (const ele of this.data[idx]) {
      if (key === ele[0]) {
        ele[1] = value;
        return;
      }
    }
    this.data[idx].push([key, value]);
  }

  get(key: number): number {
    const idx = this.hash(key);
    for (const ele of this.data[idx]) {
      if (key === ele[0]) {
        return ele[1];
      }
    }
    return -1;
  }

  remove(key: number): void {
    const idx = this.hash(key);
    this.data[idx] = this.data[idx].filter((it) => it[0] !== key);
  }

  hash(key: number): number {
    return key % this.BASE;
  }
}
```

8. 数组相关
和为 K 的子数组
```typescript
function subarraySum(nums: number[], k: number): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        for (let j = i; j>=0; j--) { 
            sum+=nums[j];
            if(sum === k){
                count++;
            }
        }
    }
    return count;
};
```
9. 数据结构实现

链表实现：https://leetcode.cn/problems/design-linked-list/
MyHashMap

10. 前缀和
给定一个数组，根据前`i-1`项的和就可以很快的计算出第`i`项的和

子数组和等于K
https://leetcode.cn/problems/subarray-sum-equals-k/
```javascript
// 1. 前缀和+hash表
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    const map = new Map();
    // 初始赋值为0，count += 时计算会简单一点
    map.set(0, 1);
    let count = 0;
    let preSum = 0;
    for (const it of nums) {
        preSum += it;
        // 前n项中 k=preSum-key的个数
        // 如果preSum===k，count可以取到1
        const key = preSum - k;
        if (map.has(key)) {
            count += map.get(key);
        }
        // 维护前缀和的map
        if (map.has(preSum)) {
            map.set(preSum, map.get(preSum) + 1)
        } else {
            map.set(preSum, 1)
        }
    }
    return count;
};


// 2. 双层循环，遍历每一项
```
