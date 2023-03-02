const net = require("net");

// 回调方式
// const server = net.createServer((socket) => {
//   socket.on("data", () => {
//     socket.write("你好");
//   });
//   socket.on("end", () => {
//     socket.write("断开连接");
//   });
//   socket.write("hello world:\n");
// });
// server.listen(8080);

// 事件监听
const server = net.createServer();
server.on('connection',(socket) => {
  socket.on("data", () => {
    socket.write("你好");
  });
  socket.on("end", () => {
    socket.write("断开连接-server");
  });
  socket.write("hello world:\n");
});
server.listen(8080);

// socket监听
// const server = net.createServer();
// server.on('connection',(socket) => {
//   socket.on("data", () => {
//     socket.write("你好");
//   });
//   socket.on("end", () => {
//     socket.write("断开连接-server");
//   });
//   socket.write("hello world:\n");
// });
// server.listen('/tmp/echo.sock');
//测试代码: nc -U /tmp/echo.sock
