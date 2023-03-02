---
title: 隧道代理-https
categories: 编程
tags:
  - 基础概念
date: 2022-01-08 21:40:45
---
以下需要创建https的整数，参考[创建证书跳转](https://www.jianshu.com/p/d600bd2ef440)

1. 请求方发起connect请求
2. 代理方监听到connect请求后，尝试建立一个请求方到目标服务的tcp连接
3. 请求方和目标服务进行TLS握手
4. 验证通过之后TCP连接建立成功，随后代理方进行无脑传递数据

#### 目标服务
```javascript
var https = require('https');
var net = require('net');

const server = https.createServer((req, res) => {
	console.log('start server');
	connectRequest(res);
});
```

#### 代理服务
```javascript
const https = require('https');
const fs = require('fs');
const net = require('net');

// create tunnel
function connect(cReq, clientSock) {
	console.log('connect');
	var serverSock = net
		// 注意此处的隧道不近可以当前服务建立，也可以和任意服务简历，如果和其他服务建立之后，之后的数据通信将不会通过该服务
		.connect('8001', '127.0.0.1', function() {
		// .connect('8888', '127.0.0.1', function() {
			console.log('connect:8001');
			clientSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
			clientSock.write('这是一段文本');
			serverSock.pipe(clientSock);
		})
		.on('error', function(e) {
			clientSock.end();
		});
	clientSock.pipe(serverSock);
}

var options = {
	key: fs.readFileSync('./server.key'),
	cert: fs.readFileSync('./server.crt')
};

const server = https.createServer(options);
server.on('connect', connect);
server.listen(8888, '127.0.0.1', () => {
	console.log('服务8888开始启动');
});

```

##### 验证tunnel的服务
```javascript
var https = require('https');

var options = {
	hostname: '127.0.0.1',
	port: 8888,
	path: '/',
	method: 'CONNECT'
};

//禁用证书验证，不然自签名的证书无法建立 TLS 连接
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var req = https.request(options);

req.on('connect', function(res, socket) {
	console.log('connect');
	socket.write('GET / HTTP/1.1\r\n' + 'Host: 127.0.0.1\r\n' + 'Connection: Close\r\n' + '\r\n');

	socket.on('data', function(chunk) {
		console.log(chunk.toString());
	});

	socket.on('end', function() {
		console.log('socket end.');
	});
});

req.end();
```
控制台打印
```(node:27498) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
connect
这是一段文本
HTTP/1.1 200 OK
Date: Sat, 22 May 2021 14:10:42 GMT
Connection: close
Transfer-Encoding: chunked

68f
-----BEGIN RSA PRIVATE KEY-----
xxx,删除无用信息
-----END RSA PRIVATE KEY-----


0


socket end.
