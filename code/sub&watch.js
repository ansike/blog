// 发布订阅
class EventBus {
  constructor() {
    this.events = {};
  }
  on(name, event) {
    if (typeof event !== "function") {
      throw new Error("event 必须为function");
    }
    this.events[name] = this.events[name] || [];
    this.events[name].push(event);
  }
  publish(name) {
    this.events[name] && this.events[name].forEach((fn) => fn());
  }
  off() {}
}
const event = new EventBus();
event.on("pub", () => {
  console.log("a listen pub");
});

event.on("pub", () => {
  console.log("b listen pub");
});

event.publish("pub");

// 观察者模式

// 目标对象
const obj = {
  data: { description: "init" },
};

// 观察者对象

function observe(obj, target, callback) {
  if (!obj.data) {
    obj.data = {};
  }
  Object.defineProperty(obj, target, {
    get() {
      return this.data[target];
    },
    set(val) {
      this.data[target] = val;
      // 通知观察者
      callback && callback(val);
    },
  });
}

observe(obj, "description", (val) => {
  console.log("触发回调", val, obj.description);
});

setTimeout(() => {
  obj.description = "changed";
}, 1000);
