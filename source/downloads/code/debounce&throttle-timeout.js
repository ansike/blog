// 可直接复制到浏览器中使用
function throttle(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      timer = null;
    }, delay);
    console.log(delay);
    fn.apply(this, args);
  };
}

const testFn = () => console.log("test");
const dTestFn = throttle(testFn, 300);

setInterval(() => {
  console.log("100");
  dTestFn();
}, 100);
// 在node和浏览器控制台执行的效果不太一样 
// node中每打印3次100会执行真正的函数,符合delay为300的预期
// 浏览器控制台中每4次100才会执行真正的函数,不符合预期.

// 可直接复制到浏览器中使用
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      return;
    } else {
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}

const testFn = (...args) => console.log("test", args);
const dTestFn = debounce(testFn, 300);
setInterval(() => {
  console.log("200");
  dTestFn(1, 2);
}, 200);
