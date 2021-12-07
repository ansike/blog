---
title: canvas 基础特性
categories: 编程
tags: canvas
date: 2021-05-05 22:46:13
---
### 对象创建
```javascript
// HTML
<canvas id="canvas"></canvas>

//JS
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

```
### canvas元素的属性和方法
**1. 属性**
- width
- height

**2. 方法**
- 1. getContext(contextId: "2d", options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;
  2. getContext(contextId: "bitmaprenderer", options?: ImageBitmapRenderingContextSettings):mageBitmapRenderingContext | null;
  3. getContext(contextId: "webgl", options?: WebGLContextAttributes): WebGLRenderingContext | null;
  4. getContext(contextId: "webgl2", options?: WebGLContextAttributes): WebGL2RenderingContext | null;
  5. getContext(contextId: string, options?: any): RenderingContext | null;
// 返回绘图环境对象
- toDataURL(type?: string, quality?: any): string; // 返回数据地址，可以直接给img的src赋值
- toBlob(callback: BlobCallback, type?: string, quality?: any): void; // 返回表示图像文件的blob，可以将该blob做文件上传使用
- transferControlToOffscreen(): OffscreenCanvas;