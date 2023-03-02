// 捕获 js error
function handleWindowError() {
  // 暂存一下之前的onerror，稍后执行
  const _oldWindowError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    console.log("self", message, source, lineno, colno, error);
    if (_oldWindowError && typeof _oldWindowError === "function") {
      _oldWindowError.call(window, message, source, lineno, colno, error);
    }
  };
}

// 捕获静态资源 error
function handleResourceError() {
  window.addEventListener(
    "error",
    (e) => {
      // 避免重复捕获js error
      const target = e.target || e.srcElement;
      const isElementTarget =
        target instanceof HTMLScriptElement ||
        target instanceof HTMLLinkElement ||
        target instanceof HTMLImageElement;
      if (!isElementTarget) return;
      console.log("self addEventListener", e.target.src);
      console.log("self addEventListener", e.target.href);
    },
    true
  );
}

// 捕获接口请求 error
function handleAjaxError() {
  if (window.location.protocol === "file:") return;
  // 监听XHR
  const _handleEvent = (event) => {
    console.log("self", event);
  };

  // 代理 XMLHttpRequest send 事件
  if (window.XMLHttpRequest) {
    const oldSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function send() {
      this.addEventListener('error', _handleEvent); // 失败
      // this.addEventListener('load', _handleEvent);  // 完成
      this.addEventListener('abort', _handleEvent); // 取消
      // 代理 onreadystatechange 事件
      const _oldStateChange = this.onreadystatechange;
      this.onreadystatechange = function onreadystatechange(event) {
        // 上报错误
        if (this.readyState === XMLHttpRequest.DONE && this.status !== 200) {
          _handleEvent(event);
        }
        _oldStateChange && _oldStateChange.apply(this, arguments);
      };
      oldSend && oldSend.apply(this, arguments);
    };
  }

  // 监听Fetch
  if (window.fetch) {
    const oldFetch = window.fetch;
    window.fetch = function fetch() {
      return (
        oldFetch
          .apply(this, arguments)
          .then((res) => {
            // 上报错误
            if (!res.ok) {
              throw 'asd';
              _handleEvent(res);
            }
            return res;
          })
          // 上报错误
          .catch((e) => {
            _handleEvent(e);
            throw e;
          })
      );
    };
  }
}

// 捕获 promise 没有被catch异常
function handleRejectPromise() {
  window.addEventListener("unhandledrejection", (e) => {
    console.log("self", e);
  });
}

// 捕获 console.error
function handleConsoleError() {
  const _oldConsoleError = window.console.error;
  window.console.error = function error() {
    console.log("self", ...arguments);
    _oldConsoleError.apply(this, arguments);
  };
}
