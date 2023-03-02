const App = require("./index.js");
const app = new App();

app.use(async (ctx, next) => {
  console.log("middleware 1");
  await next();
});

app.use(async (ctx, next) => {
  console.log("middleware 2");
  await next();
});

app.use(async (ctx) => {
  ctx.res.end('path:\"'+ctx.req.url+"\" hello world");
});
app.listen(4000);
console.log("server start in 4000");
