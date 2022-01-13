// p的状态由p1、p2、p3决定，分成两种情况。

// （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

// （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new Error("promises must be an array");
    }

    let count = 0;
    let result = [];

    promises.forEach((item, index) => {
      count++;
      item.then(
        (res) => {
          result[index] = res;
          count === promises.length && resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};
