// resolvePromise函数，处理自己return的promise和默认的promise2的关系
function resolvePromise(promise, tempValue, resolve, reject) {
  // 循环引用报错
  if (promise === tempValue) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  // 防止多次调用
  let called = false;

  // tempValue 不是null，且tempValue是对象或者函数
  if (tempValue !== null && ['object', 'function'].includes(typeof tempValue)) {
    try {
      // A+ 规定
      let then = tempValue.then;

      // 如果then是函数，就默认是promise
      if (typeof then === 'function') {
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(
          tempValue,
          (value) => {
            if (called) return;
            called = true;

            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise, value, resolve, reject);
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        // 直接成功即可
        resolve(tempValue);
      }
    } catch (error) {
      // 也属于失败
      if (called) return;
      called = true;

      // 取then出错了那就不要在继续执行了
      reject(error);
    }
  } else {
    resolve(tempValue);
  }
}

class MyPromise {
  constructor(executor) {
    // 校验executor
    if (typeof executor !== 'function') {
      throw new Error('Promise resolver is not a function');
    }

    this.value = null;
    this.reason = null;
    this.statu = 'pending';
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.statu === 'pending') {
        this.statu = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((cb) => cb(this.value));
      }
    };
    const reject = (reason) => {
      if (this.statu === 'pending') {
        this.statu = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb(this.reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then 方法，里面有两个参数：onFulfilled（成功时 resolve 触发）onFulfilled（失败时 reject 触发）

  // 校验 onFulfilled 和 onFulfilled 是不是函数。是函数就直接运行，不是函数把值变成函数。
  // resolve 函数执行的时候，把 state 的状态由 pending 变为 fulfilled，then 方法里面
  // state 的状态为 fulfilled 则执行 onFulfilled，同时传入 this.value。
  // reject 函数执行的时候，把 state 的状态由 pending 变为 rejected，then 方法里面
  // state 的状态为 rejected则执行 onRejected，同时传入 this.value。

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = (value) => value;
    }
    if (typeof onRejected !== 'function') {
      onRejected = (reason) => reason;
    }

    const tempPromise = new MyPromise((resolve, reject) => {
      if (this.statu === 'pending') {
        // promise 中是异步执行时，status还未改变，先将回调函数缓存起来
        this.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            resolve(onFulfilled(value));
          });
        });
        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            // resolvePromise函数，处理自己return的promise和默认的promise2的关系
            reject(onRejected(reason));
          });
        });
      } else if (this.statu === 'fulfilled') {
        setTimeout(() => {
          const tempValue = onFulfilled(this.value);
          resolvePromise(tempPromise, tempValue, resolve, reject);
        });
      } else if (this.statu === 'rejected') {
        setTimeout(() => {
          reject(onRejected(this.reason));
        });
      }
    });

    return tempPromise;
  }
}

// 测试输出顺序
// console.log(1);
// new MyPromise((resolve,reject)=>{
//     console.log(2);
//     resolve(3);
// })
// .then(
//     value=>console.log(value)
// );
// console.log(4);

// 测试报错捕获
// new MyPromise((resolve, reject) => {
//   throw new Error("随便抛出一个错误");
//   resolve(3);
// }).then(
//   (value) => console.log(value),
//   (reason) => console.log(reason)
// );

// 测试promise异步执行
// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(3);
//   });
// }).then((value) => console.log(value));

// 测试链式调用
// new MyPromise((resolve, reject) => {
//   resolve(3);
// })
//   .then((value) => console.log(value))
//   .then()
//   .then((value) => console.log(value));

// 测试递归调用
// let p = new Promise((resolve) => {
//   resolve(0);
// }).then((data) => p);

// new MyPromise((resolve, reject) => {
//   resolve(3);
// })
//   .then((value) => {
//     return new MyPromise((resolve, reject) => {
//       resolve(1);
//     });
//   })
//   .then((value) => console.log("value", value));

// then 方法链式调用识别 Promise 对象自返回
let promise = new MyPromise((resolve, reject) => {
  resolve('成功');
  // setTimeout(() => {
  //   resolve('成功')
  // }, 2000)
  // reject('失败')
});

let p1 = promise.then((value) => {
  console.log(value);
  return p1;
});

p1.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason.message);
  }
);
