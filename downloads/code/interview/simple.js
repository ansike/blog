//1、 使用递归 非递归方式遍历出data 里面所有的name,得到一个names 数组
console.log(
  "================**** 使用递归 非递归方式遍历出data ****====================="
);
const data1 = [
  {
    name: "中国",
    children: [
      {
        name: "教第三节课",
      },
      {
        name: "教呼呼",
        children: [
          {
            name: "大一",
            children: [
              {
                name: "课程1",
                children: [
                  {
                    name: "1231",
                  },
                  {
                    name: "121",
                  },
                ],
              },
              {
                name: "课程3",
                children: [
                  {
                    name: "1233",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "活动",
        children: null,
      },
    ],
  },
];

function recursiveData(data) {
  const res = [];
  data.forEach((element) => {
    if (element.name) {
      res.push(element.name);
    }
    if (Array.isArray(element.children)) {
      res.push(...recursiveData(element.children));
    }
  });
  return res;
}

console.log(recursiveData(data1));

function notRecursiveData(data) {
  const res = [];
  let stack = [data];
  while (stack.length) {
    const tempStack = [];
    while (stack.length) {
      const curArr = stack.pop();
      curArr.forEach((element) => {
        if (element.name) {
          res.push(element.name);
        }
        if (Array.isArray(element.children)) {
          tempStack.push(element.children);
        }
      });
    }
    stack = tempStack;
  }
  return res;
}
console.log(notRecursiveData(data1));

// /**
//  * 实现一个方法，可以实现异步串行，函数返回一个promise，所有异步执行成功promise resolve, 有一个失败直接promise reject
//  */
console.log("================**** 实现异步串行 ****=====================");

const promise1 = () =>
  new Promise((resolve) => setTimeout(resolve.bind(this, 10), 1000));
const promise2 = () =>
  new Promise((resolve) => setTimeout(resolve.bind(this, 10), 2000));
const promise3 = () =>
  new Promise((resolve) => setTimeout(resolve.bind(this, 10), 3000));
/**
 * 返回一个promise
 * @param promises 一个Promise数组
 * @return Promsie
 */
function pipe(promises = []) {
  return new Promise(async (resolve, reject) => {
    try {
      let res;
      for (const pro of promises) {
        res = await pro();
      }
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}
function pipe(promises = []) {
  const res = promises.reduce((prev, cur) => {
    return prev.then(cur);
  }, Promise.resolve());
  return res;
}
pipe([promise1, promise2, promise3]).then((args) => console.log(args));
/**
 * 请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能，如
 */
console.log("================**** Events模块 ****=====================");

class Events {
  constructor() {
    this.map = {};
  }

  on(methodName, fn, ...arg) {
    if (this.map[methodName]) {
      this.map[methodName].push({ fn, arg });
    } else {
      this.map[methodName] = [{ fn, arg }];
    }
  }

  fire(methodName, ...arg) {
    this.map[methodName].forEach((item) => {
      item.fn.apply(null, item.arg.concat(arg));
    });
  }

  off(methodName, fn) {
    this.map[methodName] = this.map[methodName].filter((item) => {
      return item.fn !== fn;
    });
  }

  once(methodName, fn) {
    let reFn = () => {
      fn.call(null);
      this.off(methodName, reFn);
    };
    this.on(methodName, reFn);
  }
}

const fn1 = (...args) => console.log("I want sleep1", ...args);
const fn2 = (...args) => console.log("I want sleep2", ...args);
const event = new Events();
event.on("sleep", fn1, 1, 2, 3);
event.on("sleep", fn2, 1, 2, 3);
event.fire("sleep", 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off("sleep", fn1);
event.once("sleep", () => console.log("I want sleep"));
event.fire("sleep");
// */

// /**
//  * 获取两个数组的差集 const a =[1,2,3] const b = [3,4,5] ==>差集[1,2,4,5]
//  */
console.log("================**** 数组的差集 ****=====================");

const fn = (arr1, arr2) => {
  const temp = arr1.filter((it) => arr2.includes(it));
  return Array.from(new Set([...arr1, ...arr2])).filter(
    (it) => !temp.includes(it)
  );
};

console.log("差集：", fn([1, 2, 3], [3, 4, 5]));
// /**
//  * 函数节流的实现
//  */
console.log("================**** 函数节流 ****=====================");

function debounce(fn, timeout) {
  let timer = null;
  return function (...arg) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.call(this, ...arg);
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}

const deFn = debounce((a) => {
  console.log("dfFn log", a);
}, 1000);
deFn(1);
deFn(2);
setTimeout(() => {
  deFn(3);
}, 1200);

/**
 * jsonp的实现
 * 返回一个promise 请求成功resolve 失败reject
 */
console.log("================**** jsonp promise实现 ****=====================");
// 关键是promise的提升
let globalResolve;
const callback = (d) => {
  globalResolve(d);
};
function jsonp(url, data) {
  return new Promise((resolve, reject) => {
    const newUrl = `${url}?callback=${callback}`;
    globalResolve = resolve;
    const dom = document.createElement("script");
    dom.src = src;
    dom.error = reject;
    document.body.appendChild(dom);
  });
}

/**
 * 二分查找
 */

/**
 *  对象的深拷贝
 */
console.log("================**** 对象的深拷贝 ****=====================");

function deepClone(data){
  if(typeof data !== 'object' || data === null){
    return data;
  }
  let res = Array.isArray(data) ? [] : {};
  for(let key in data){
  	res[key] = data[key];
  }
  return res;
}
console.log(deepClone({a:1,b:[{a:1},3]}))

/**
 * 匈牙利命名字符串和驼峰命名字符串互相转换
 * 说明：
 *  1. 将字符串匈牙利命名字符串(例如：person_first_name)转成驼峰命名字符串(例如：personFirstName)
 *  2. 将驼峰命名的字符串(例如：personFirstName)转成匈牙利命名字符串(例如：person_first_name)
 *  3. 字符长度不限
 * 示例：
 *  const str1 = 'person_first_name';
 *  parseStrToCamelCase(str1); // 返回 'personFirstName'
 *
 *  const str2 = 'personFirstName';
 *  parseStrToHungarianNotation(str2); // 返回 'person_first_name'
 */
console.log("================**** 驼峰和下划线字符串转换 ****=====================");

function parseStrToCamelCase(str1){
  return str1.replace(/\_([a-z])/g, ($0, $1) => $1.toUpperCase());
};
console.log(parseStrToCamelCase("person_first_name"));

function parseStrToHungarianNotation(str1){
  return str1.replace(/([A-Z])/g, "_$1").toLowerCase()
};
console.log(parseStrToHungarianNotation("personFirstName"));