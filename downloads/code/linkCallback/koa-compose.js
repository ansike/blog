/**
 * compose 函数实现
 */
function KoaCompose(handles) {
  if (!Array.isArray(handles)) throw new TypeError("compose must be an array");
  for (let fn of handles) {
    if (typeof fn !== "function")
      throw new TypeError("middleware must be a function");
  }
  return function handle(ctx, next) {
    let index = -1;
    function deal(i) {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      let fn = handles[i];
      if (i === handles.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(
          fn(ctx, function next() {
            deal(i + 1);
          })
        );
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return deal(0);
  };
}

const f1 = async (n, next) => {
  console.log("fn1");
  await next();
  console.log("fn11");
};
const f2 = async (n, next) => {
  console.log("fn2");
  await next();
  console.log("fn22");
};

const fn = KoaCompose([f1, f2]);
fn();