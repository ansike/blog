const net = require("net");

const client = net.connect({ port: 8080 }, () => {
  client.write("hello world:\n");
});

// socket
// const client = net.connect({ path: "/tmp/echo.sock" }, () => {
//   client.write("hello world:\n");
// });
client.on("data", (data) => {
  console.log(data.toString());
  client.end();
});
client.on("end", () => {
  console.log("断开连接");
});
