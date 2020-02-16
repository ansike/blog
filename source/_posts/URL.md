---
title: URL constructor
---


## Quick Start
以前我们要对地址栏中的URL地址进行分析处理，需要自己进行字符串分析,有了URL构造函数之后就不需要了。


### demo （修改|设置)query的一个参数
```javascript
const url = "https://www.baidu.com/wordpress/?a=1"
const urlObj = new URL(url)
urlObj.searchParams.set("a", 2);
console.log(urlObj.href); //https://www.baidu.com/wordpress/?a=2
```

### constructor
``` javascript
/**
 * params：（url）相对地址或者绝对地址，如果是绝对地址的时候会忽略base参数
 * params：（base）基地址，默认为空字符串
 * 注意：如果参数无法组合成完整的url地址，则会报TypeError错误
 * return 一个人 URL实例
 */  
new URL(url [,base]) 
```

### Attributes

1. hash
2. host
3. hostname
4. href
5. origin       常用
6. password
7. username
8. pathname
9. port
10. protocol     eg:http:
11. search
12. searchParams 返回一个URLSearchParams对象，可以调用URLSearchParams对象的各种方法，对查询，设置字符串进行非常方便的处理。以下会重点说这个对象 


### Function

1. toString()   返回完整的URL地址，只能输出不能修改值
2. toJSON       目前看是一样的（有变动再修改）

### Static Function

1. URL.createObjectURL(object). **将对象变成一个唯一的blob URL，参数可以是File，Blob，MediaSource对象**
2. URL.revokeObjectURL(objectURL);**撤销上一个API创建的URL对象**

eg:使用Ajax请求一个跨域图片避免canvas跨域生成问题的时候可以使用这两个静态方法：
``` javascript
var xhr = new XMLHttpRequest();
xhr.onload = function () {
    var url = URL.createObjectURL(this.response);
    var img = new Image();
    img.onload = function () {
        // 此时你就可以使用canvas对img为所欲为了
        // ... code ...
        // 图片用完后记得释放内存
        URL.revokeObjectURL(url);
    };
    img.src = url;
};
xhr.open('GET', url, true);
xhr.responseType = 'blob';
xhr.send();
```


