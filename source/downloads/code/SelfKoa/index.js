/*
 * @Description: SelfKoa 实现
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2022-04-16 21:47:44
 * @LastEditTime: 2022-04-17 15:49:04
 */
const http = require("http");
const compose = require("./compose.js");

class App {
  stack = [];
  serverInstance = null;
  constructor() {
    this.serverInstance = http.createServer();
  }

  init() {
    const fn = compose(this.stack);
    const dispatch = ({ req, res }) => {
      const ctx = Object.create(null);
      ctx.req = req;
      ctx.res = res;
      return this.dispatch(ctx, fn);
    };
    return dispatch;
  }

  use(handle) {
    if (typeof handle !== "function")
      throw new TypeError("use 中参数必须为function类型");
    this.stack.push(handle);
    return this;
  }

  listen(port) {
    const dispatch = this.init();
    this.serverInstance.on("request", (req, res) => {
      dispatch({ req, res });
    });
    this.serverInstance.listen(port);
  }

  dispatch(ctx, fn) {
    return fn(ctx)
      .then((res) => {
        console.log("use 队列执行完毕", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = App;
