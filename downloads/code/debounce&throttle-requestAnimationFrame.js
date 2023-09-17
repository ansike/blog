// 可直接复制到浏览器中使用
function throttle(fn, delay) {
  let lastTimestamp = 0;
  let flag = false;
  const resFn = (...args) => {
    if (flag) return;
    const check = () => {
      requestAnimationFrame(() => {
        flag = true;
        if (lastTimestamp && +new Date() - lastTimestamp < delay) {
          return check();
        } else {
          lastTimestamp = +new Date();
        }
        flag = false;
        fn.apply(this, args);
      });
    };
    check();
  };
  return resFn;
}

const testFn = () => console.log("test");
const dTestFn = throttle(testFn, 300);

const timer = setInterval(() => {
  console.log("100");
  dTestFn();
}, 100);

setTimeout(() => {
  clearInterval(timer);
}, 1200);

// 可直接复制到浏览器中使用
function debounce(fn, delay) {
  let lastTimestamp = 0;
  return (...args) => {
    lastTimestamp = +new Date();
    const check = () => {
      requestAnimationFrame(() => {
        if (lastTimestamp && +new Date() - lastTimestamp < delay) {
          check();
          return;
        }
        fn.apply(this, args);
      });
    };
    check();
  };
}

const testFn = (...args) => console.log("test", args);
const dTestFn = debounce(testFn, 300);
setInterval(() => {
  console.log("250");
  dTestFn(1, 2);
}, 250);
