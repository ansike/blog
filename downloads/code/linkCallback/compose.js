const compose = (arr) => {
  return arr.reduce((prev, cur) => {
    return (...args) => {
      return prev(cur(...args));
    };
  });
};

const f1 = (n) => {
  console.log(n);
  return n + 1;
};
const f2 = (n) => {
  console.log(n);
  return n + 1;
};
const fn = compose([f1, f2]);
fn(1);
