const dgram = require("dgram");

const buffer = Buffer.from("hello world --- ", "utf-8");
const client = dgram.createSocket("udp4");

client.send(buffer, 0, buffer.length, 8080, "localhost", (err, bytes) => {
  client.close();
});

