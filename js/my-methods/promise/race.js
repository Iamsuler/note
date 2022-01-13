// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new Error("promises must be an array");
    }

    promises.forEach((p) => {
      Promise.resolve(p).then(
        (value) => value,
        (reason) => {
          throw reason;
        }
      );
    });
  });
};
