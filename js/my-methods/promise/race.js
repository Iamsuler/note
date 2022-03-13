// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new Error("promises must be an array");
    }

    promises.forEach((p) => {
      Promise.resolve(p).then(
        (value) => resolve(value),
        (reason) => reject(reason)
      );
    });
  });
};

// test
let p1 = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 2000)
})
let p2 = () =>  new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2)
  }, 1000)
})

Promise.race([p1(), p2()]).then(res => {
  console.log('res', res)
}).catch(err => {
  console.log('err', err)
})
