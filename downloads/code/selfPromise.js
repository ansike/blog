class SelfPromise {
  status = "Pending";
  resolveFns = [];
  rejectFns = [];
  constructor(cb) {
    cb && cb(this.resolve.bind(this), this.reject.bind(this));
  }
  then(resolveFn, rejectFn) {
    resolveFn && this.resolveFns.push(resolveFn);
    rejectFn && this.rejectFns.push(rejectFn);
    return this;
  }
  resolve(val) {
    if (this.status !== "Pending") return;
    this.status = "FullFiled";
    while (this.resolveFns.length) {
      const fn = this.resolveFns.pop();
      fn.call(this, val);
    }
  }
  reject(val) {
    if (this.status !== "Pending") return;
    this.status = "Rejected";
    while (this.rejectFns.length) {
      const fn = this.rejectFns.pop();
      fn.call(this, val);
    }
  }
}

new SelfPromise((resolve, reject) => {
  setTimeout(() => {
    reject(false);
    //   resolve(true);
  }, 1000);
})
  .then(
    (res) => {
      console.log("resolve1", res);
    },
    (reject) => {
      console.log("reject1", reject);
    }
  )
  .then(
    (res) => {
      console.log("resolve2", res);
    },
    (reject) => {
      console.log("reject2", reject);
    }
  );
