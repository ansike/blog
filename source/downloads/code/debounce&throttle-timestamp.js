// 可直接复制到浏览器中使用
function throttle(fn, delay) {
  let lastTimestamp = 0;
  return (...args) => {
    if (lastTimestamp && +new Date() - lastTimestamp < delay) {
      return;
    } else {
      lastTimestamp = +new Date();
    }
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

// 可直接复制到浏览器中使用
function debounce(fn, delay) {
  let lastTimestamp = 0;
  return (...args) => {
    if (lastTimestamp && +new Date() - lastTimestamp < delay) {
      lastTimestamp = +new Date();
      return;
    } else if (lastTimestamp) {
      fn.apply(this, args);
    } else {
      lastTimestamp = +new Date();
    }
  };
}

const testFn = (...args) => console.log("test", args);
const dTestFn = debounce(testFn, 300);
setInterval(() => {
  console.log("200");
  dTestFn(1, 2);
}, 200);
