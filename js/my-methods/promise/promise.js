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

    const resolve = (value) => {
      if (this.status !== PENDING) {
        return;
      }

      this.status = FULFILLED;
      this.value = value;
    };

    const reject = (reason) => {
      if (this.status !== PENDING) {
        return;
      }

      this.status = REJECTED;
      this.reason = reason;
    };

    executor(resolve, reject);
  }

  then(successCallback, failCallback) {
    if (this.status === FULFILLED) {
      successCallback(this.value);
    } else if (this.status === REJECTED) {
      failCallback(this.reason);
    }
  }
}

let promise = new MyPromise((resolve, reject) => {
  resolve('成功');
  // reject('失败');
});

promise.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);
