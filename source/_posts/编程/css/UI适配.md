---
title: UI适配
categories: 编程
tags:
  - 手机端
  - PC端
date: 2021-05-05 22:46:13
---

### 手机 H5 页面适配 PC 端
经常先有PC的页面后有H5的页面，现在是有H5的页面后要PC页面进行设置，而且PC页面需要基本和手机页面保持一致。

1. 使用 @media 进行样式重写，重写的内容包括：

- width
- height
- border
- margin
- padding
- font-size
- top, right, bottom, left

```less
@media screen and (min-width: 600px) {
  .login {
    width: 300px;
    padding-bottom: 30px;
    border-radius: 30px;

    .logo {
      width: 30px;
      height: 30px;
      margin: 20px auto 12px;
    }

    .title {
      font-size: 10px;
    }
  }
}

@media screen and (min-width: 1800px) {
  .login {
    width: 200px;
    padding-bottom: 20px;
    border-radius: 10px;

    .logo {
      width: 20px;
      height: 20px;
      margin: 20px auto 6px;
    }

    .title {
      font-size: 8px;
    }
  }
}
```

2. 使用 @media 对模块进行缩放


```javascript
// 判断是否为手机设备
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// 判断是否为PC设备
export function isPcDevice() {
  return !isMobileDevice();
}

// 屏幕尺寸设置 这部分可以自己优雅
export const getSize = (size = document.body.clientWidth) => {
  if (size > 2000) {
    return 0.3
  } else if (size > 1600) {
    return 0.4
  } else if (size > 1200) {
    return 0.6;
  } else {
    return 0.7;
  }
};


if (isPcDevice()) {
  // height 是 resizeClass dom 包含滚动条的高度
  let height = document.querySelector(".resizeClass")?.scrollHeight;
  while (!height) {
    height = document.querySelector(".resizeClass")?.scrollHeight;
  }

  // 将 resizeClass 的滚动条去除
  document.querySelector(".resizeClass").style.height = height + "PX";
  // 计算出新的 #app 的高度 
  // 计算 height 是 resizeClass dom scale之前的高度，把#app设置一样之后才不会有多余的空白
  document.querySelector("#app").style.height = getSize() * height + "PX";
  window.addEventListener("resize", () => {
    window.location.reload();
  });
}
```

```less
@media screen and (min-width: 600px) {
  #app {
    background-color: #ccc;
  }
  .resizeClass {
    // 页面缩放一样的比例
    transform: scale(0.7, 0.7);
    // 页面缩放从顶部
    transform-origin: top;
    // 隐藏滚动条
    overflow-x: hidden;
  }
}

@media screen and (min-width: 1200px) {
  .resizeClass {
    transform: scale(0.6, 0.6);
  }
}

@media screen and (min-width: 1600px) {
  .resizeClass {
    transform: scale(0.4, 0.4);
  }
}

@media screen and (min-width: 2000px) {
  .resizeClass {
    transform: scale(0.3, 0.3);
  }
}
```
