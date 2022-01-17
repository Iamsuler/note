/**
 * 1. Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
 * 2. Promise 中有三种状态 分别为 成功 fulfilled 失败 rejected 等待 pending
 *    pending -> fulilled
 *    pending -> rejected
 *    一旦状态确定就不可更改
 * 3. resolve 和 reject 函数是用来 更改状态的
 *    resolve: fulilled
 *    reject: rejected
 * 4. then 方法内部做的事情就是判断状态 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败的回调函数
 * 5. then 成功回调有一个参数 表示成功后的值  失败有一个参数 表示失败原因
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.successCallback = [];
    this.failCallback = [];

    const resolve = (value) => {
      if (this.status !== PENDING) {
        return;
      }

      this.status = FULFILLED;
      this.value = value;

      while (this.successCallback.length) {
        this.successCallback.shift()(this.value);
      }
    };

    const reject = (reason) => {
      if (this.status !== PENDING) {
        return;
      }

      this.status = REJECTED;
      this.reason = reason;

      while (this.failCallback.length) {
        this.failCallback.shift()(this.reason);
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(successCallback, failCallback) {
    if (typeof successCallback !== 'function') {
      successCallback = (value) => value;
    }
    if (typeof failCallback !== 'function') {
      failCallback = (reason) => reason;
    }
    const tempPromise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = successCallback(this.value);
            // 判断x 的值是普通值 还是 promise 对象
            // 如果是普通值 直接调用 resolve
            // 如果是 promise 对象 查看promise 对象返回的结果
            // 在根据promise 对象返回结果 决定调用 resolve 还是 调用 reject
            resolvePromise(tempPromise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = failCallback(this.reason);
            resolvePromise(tempPromise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else {
        // 等待
        // 将成功回调和失败回调 存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              const x = successCallback(this.value);
              resolvePromise(tempPromise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              const x = failCallback(this.reason);
              resolvePromise(tempPromise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });

    return tempPromise;
  }
}
function resolvePromise(tempPromise, x, resolve, reject) {
  if (tempPromise === x) {
    return reject(new TypeError('循环调用错误！'));
  }
  if (x instanceof MyPromise) {
    // promise 对象
    // x.then(value=>resolve(value), reason=>reject(reason))
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

// 测试核心方法
// let promise = new MyPromise((resolve, reject) => {
//   resolve('成功');
//   // reject('失败');
// });

// promise.then(
//   (value) => {
//     console.log(value);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );

// 测试异步
// let promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('成功');
//   }, 2000);
//   // reject('失败')
// });

// promise.then(
//   (value) => {
//     console.log(value);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );

// then多次调用
// promise.then(
//   (value) => {
//     console.log(value);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );
// promise.then(
//   (value) => {
//     console.log(value);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );

// 链式调用
// let promise = new MyPromise((resolve, reject) => {
//   resolve('成功');
//   // setTimeout(() => {
//   //   resolve('成功')
//   // }, 2000)
//   // reject('失败')
// });

// function other() {
//   return new MyPromise((resolve, reject) => {
//     resolve('other');
//   });
// }

// promise
//   .then((value) => {
//     console.log(value);
//     return other();
//   })
//   .then((value) => {
//     console.log(value);
//   });

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

// 捕获错误及 then 链式调用其他状态代码补充
