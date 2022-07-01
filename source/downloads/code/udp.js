const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log(`server got:${msg} from ${rinfo.address}:${rinfo.port}`);
});
server.on("listening", () => {
  const rinfo = server.address();
  console.log(`server listening ${rinfo.address}:${rinfo.port}`);
});

server.bind(8080);
