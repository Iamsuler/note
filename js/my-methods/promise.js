class MyPromise {
  constructor(executor) {
    // 校验executor
    if (typeof executor !== "function") {
      throw new Error("Promise resolver is not a function");
    }

    this.value = nulll;
    this.reason = null;
    this.statu = "pending";

    const resolve = (value) => {
      if (this.statu === "pending") {
        this.statu = "fulfilled";
        this.value = value;
      }
    };
    const reject = (reason) => {
      if (this.statu === "pending") {
        this.statu = "rejected";
        this.reason = reason;
      }
    };

    executor(resolve, reject);
  }

  // then 方法，里面有两个参数：onFulfilled（成功时 resolve 触发）onFulfilled（失败时 reject 触发）

  // 校验 onFulfilled 和 onFulfilled 是不是函数。是函数就直接运行，不是函数把值变成函数。
  // resolve 函数执行的时候，把 state 的状态由 pending 变为 fulfilled，then 方法里面
  // state 的状态为 fulfilled 则执行 onFulfilled，同时传入 this.value。
  // reject 函数执行的时候，把 state 的状态由 pending 变为 rejected，then 方法里面
  // state 的状态为 rejected则执行 onRejected，同时传入 this.value。

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      onFulfilled = (value) => value;
    }
    if (typeof onRejected !== "function") {
      onRejected = (reason) => reason;
    }

    if (this.statu === "fulfilled") {
      onFulfilled(this.value);
    } else if (this.statu === "rejected") {
      onRejected(this.reason);
    }
  }
}
