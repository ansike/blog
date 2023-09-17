let Target = null;
class Watcher {
  constructor(vm, getter) {
    this.vm = vm;
    this.getter = getter;
    this.value = this.get();
  }
  get() {
    Target = this;
    const val = this.getter.call(this.vm);
    Target = null;
    return val;
  }
  update() {
    this.value = this.get();
  }
}
class SelfVue {
  constructor({ data, computed }) {
    this.data = data;
    this.computed = computed;
    this.initData(data);
    this.initComputed(computed);
  }
  initData(data) {
    Object.keys(data).forEach((key) => {
      this.defineReactive(key, data[key]);
    });
  }
  initComputed(computed) {
    Object.keys(computed).forEach((key) => {
      const watcher = new Watcher(this, computed[key]);
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return watcher.value;
        },
      });
    });
  }

  defineReactive(key, val) {
    const deps = [];
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (Target) {
          deps.push(Target);
        }
        return val;
      },
      set(newVal) {
        val = newVal;
        deps.forEach((watcher) => {
          watcher.update();
        });
      },
    });
  }
}

const instance = new SelfVue({
  data: {
    firstName: "first",
    lastName: "last",
  },
  computed: {
    fullname() {
      return this.firstName + "-" + this.lastName;
    },
  },
});

console.log("firstName: ", instance.firstName);
console.log("lastName: ", instance.lastName);
console.log("fullname: ", instance.fullname);
console.log("=====================分割线========================");
instance.firstName = "firstName";
console.log("firstName: ", instance.firstName);
console.log("fullname: ", instance.fullname);
instance.lastName = "lastName";
console.log("lastName: ", instance.lastName);
console.log("fullname: ", instance.fullname);

// VM1479:76 firstName:  first
// VM1479:77 lastName:  last
// VM1479:78 fullname:  first-last
// VM1479:79 =====================分割线========================
// VM1479:81 firstName:  firstName
// VM1479:82 fullname:  firstName-last
// VM1479:84 lastName:  lastName
// VM1479:85 fullname:  firstName-lastName