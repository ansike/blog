---
title: shell中curl使用
categories: 编程
tags:
  - curl
  - shell
date: 2021-05-05 22:46:13
---

### curl 请求中数据中使用变量

```shell
# 参数为数字时直接使用单引号包裹变量即可
# 参数为字符串时使用双引号包裹单引号，再包裹变量

a='test'
b=2
curl -X GET -H "content-type: application/json" -H "x:a" http://localhost:8000 --data-raw '{"a":"'"$a"'","b":'$b'}'

# 启动以下node服务，打印如下
# /
# GET
# {
#   host: 'localhost:8000',
#   'user-agent': 'curl/7.77.0',
#   accept: '*/*',
#   'content-type': 'application/json',
#   x: 'a',
#   'content-length': '18'
# }
# { a: 'test', b: 2 }
```
{% include_code lang:javascript http.js %}

