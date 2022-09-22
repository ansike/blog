---
title: Redis加锁的几种实现
categories: 编程
date: 2022-08-14 09:19:18
---

### 为什么 redis 需要加锁？

在开发中可能会遇到一些重复或者并发的请求，这些请求在遇到 redis 类的存储不加限制极有可能导致数据发生错乱。
举个例子：同时有 A(新增数据为[3,4])，B(新增数据为[5,6]) 请求到服务中需要修改 redis 中的数据 [1,2]，此时 A 和 B 拿到 redis 中的数据都是[1,2]，此时如果 A 先修改完成，那后边的 B 就会覆盖 A 的数据，反之 A 会覆盖 B 的修改。但是我们预期是 A 和 B 都要生效，最后的结果应该是 [1,2,3,4,5,6]，此时我们会想到出问题的点是并发的修改数据，那如果 A，B 串行修改数据肯定不会有问题。

其实仔细分析问题：该问题的关键是**并发的获取数据，串行的修改数据**（因为 redis 是不支持并行的修改数据的）。

那我们保证多个请求在获取数据上也是串行即可解决这个问题

假设我们需要修改的 redis 的 key 为 `ONLY_KEY`

### 方案一：标识锁

在 redis 中用一个新的 key 去标识我要去修改的这个 key 是不是正在修改中.如果能获取到则说明是在修改中后续的请求都会被 pending。

```javascript
async function changeOnlyKey(newVals) {
  const key = `ONLY_KEY`;
  const flag_key = `${key}_FLAG`;
  const flag_key_val = `${key}_FLAG}`;
  let flag = false;
  do {
    flag = !!(await getRedisValue(flag_key));
    if (!flag) {
      // 说明当前key没有被锁，直接设置标识符，进行加锁
      await setRedisValue(flag_key, flag_key_val);

      // 执行主流程代码，确保get和set都放在这块儿

      const curVal = await getRedisValue(flag_key, flag_key_val);
      // 删除锁
      await delRedisValue(flag_key);
      // 可以跳出循环
      flag = false;
      continue;
    } else {
      // 说明当前key被锁，正在处理中
      // 加一层sleep避免频繁抢锁
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 100);
      });
    }
  } while (flag);
}
```

为了避免一个服务加锁之后因为服务的问题导致该锁不会被释放，我们可以假设这个 key 已经加上了过期时间 10s。

那这个方案目前有什么问题吗？
有个比较极端的问题：如果在执行第一个请求的过程中该锁过期了，下一个请求获取到了锁，如果此时前一个请求执行完成就会把锁给删除，此时极可能导致**后续的请求快速涌入造成雪崩式的数据错乱**

### 方案二：标识符 + 唯一锁

锁还是采用 redis 标识，但是现在的锁要保证每次请求都是唯一的，只有正确的锁能被正确的请求打开和处理
我们在加锁时设置值唯一，删除锁时获取一下锁的值确保只删除我们自己的锁

```javascript
async function changeOnlyKey(newVals) {
  const key = `ONLY_KEY`;
  const flag_key = `${key}_FLAG`;
  const flag_key_val = `${key}_FLAG_${new Date().getTime()}`;
  let flag = false;
  do {
    flag = !!(await getRedisValue(flag_key));
    if (!flag) {
      // 说明当前key没有被锁，直接设置标识符，进行加锁
      await setRedisValue(flag_key, flag_key_val);

      // 执行主流程代码，确保get和set都放在这块儿

      const curVal = await getRedisValue(flag_key, flag_key_val);
      // 可以跳出循环
      flag = false;
      // 确保要删除的锁是自己加的，避免删除其他请求加的锁
      if (flag_key_val === curVal) {
        // 删除锁
        await delRedisValue(flag_key);
        continue;
      }
    } else {
      // 说明当前key被锁，正在处理中
      // 加一层sleep避免频繁抢锁
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 100);
      });
    }
  } while (flag);
}
```

此时可能会有新的想法冒出来，即使加了唯一锁，前一个请求的锁失效，后一个请求立即进入，此时还是会发生数据错乱的。
这样的想法肯定是对的，所以我们要保证锁的过期时间一定要大于程序执行的时间，但是不能太大了避免一个节点断掉之后其他请求无法被及时处理。

### 方案一：标识符 + 唯一锁 + NX

只是借助 redis 中 NX 的特性做的一个优化
NX 特性：如果当前 key 已经设置过那么再次设置时返回的值为 null
此时可以将一个 getredis 的操作给省略掉

```javascript
async function changeOnlyKey(newVals) {
  const key = `ONLY_KEY`;
  const flag_key = `${key}_FLAG`;
  const flag_key_val = `${key}_FLAG_${new Date().getTime()}`;
  let flag = false;
  do {
    // 设置NX锁，没有设置过会返回true，已经设置过返回false
    flag = !!(await setRedisNXValue(flag_key, flag_key_val));
    if (flag) {
      // 执行主流程代码，确保get和set都放在这块儿

      const curVal = await getRedisNXValue(flag_key);
      // 可以跳出循环
      flag = true;
      // 确保要删除的锁是自己加的，避免删除其他请求加的锁
      if (flag_key_val === curVal) {
        // 删除锁
        await delRedisValue(flag_key);
        continue;
      }
    } else {
      // 说明当前key被锁，正在处理中
      // 加一层sleep避免频繁抢锁
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 100);
      });
    }
  } while (!flag);
}
```
<!-- TODO 真实代码 -->