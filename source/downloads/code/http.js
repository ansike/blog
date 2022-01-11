const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  
  req.on("end", () => {
    const d =JSON.parse(data);
    console.log(d);
  });
  
  res.end("end");
});

server.listen(8000);
