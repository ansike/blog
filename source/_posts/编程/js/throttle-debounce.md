---
title: 截流和去抖的深入理解结合loads
categories: 编程
tags: js
date: 2021-05-05 17:24:39
---
### 应用场景
**不说应用场景，自己都没有动力往下继续。**
debounce：input框keyup的search事件（等待时间之后只触发一次,若在等待时间内再次触发，则重新计算等待时间）【有可能出现事件一直触发，回调一直不会执行的情况。触发间隔小于延迟间隔】
throttle：监听scroll事件（间隔触发）【在debounce的情况下，事件在等待时间内不断触发，增加maxWait时间即可实现】

### throttle截流

