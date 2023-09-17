// 发布订阅
class EventBus {
  constructor() {
    this.events = {};
  }
  on(name, event) {
    // 检查name
    if (typeof event !== "function") {
      throw new Error("event 必须为function");
    }
    this.events[name] = this.events[name] || [];
    this.events[name].push(event);
  }
  emit(name) {
    this.events[name] && this.events[name].forEach((fn) => fn());
  }
  off(name, fn) {
    this.events[name] = this.events[name].filter((item) => item !== fn);
  }
  once(name, fn) {
    const wrapFn = () => {
      fn && fn();
      this.off(name, wrapFn);
    };
    this.on(name, wrapFn);
  }
}
const event = new EventBus();
event.on("pub", () => {
  console.log("a listen pub");
});

event.on("pub", () => {
  console.log("b listen pub");
});

event.once("pub", () => {
  console.log("c listen pub");
});

event.emit("pub");
event.emit("pub");

// a listen pub
// b listen pub
// c listen pub
// a listen pub
// b listen pub

// 观察者模式
// 目标对象
class TargetObj {
  constructor(name) {
    this.name = name;
    this.deps = [];
  }
  change() {
    console.log(`被观察者${this.name}正在发生变动, 通知所有的观察者`);
    this.notify();
  }
  addDep(watcher) {
    this.deps.push(watcher);
  }
  notify() {
    this.deps.forEach((item) => {
      item.update();
    });
  }
}
class Watcher {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(`观察者${this.name}收到变动`);
  }
}

const object = new TargetObj("object");
const watcher1 = new Watcher("watcher1");
const watcher2 = new Watcher("watcher2");
object.addDep(watcher1);
object.addDep(watcher2);

object.change();

// 被观察者object正在发生变动, 通知所有的观察者;
// 观察者watcher1收到变动;
// 观察者watcher2收到变动;
