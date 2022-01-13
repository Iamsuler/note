// 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

Promise.any = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new Error("promises must be an array");
    }

    let result = [];
    let unSettledPromiseCount = promises.length;

    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          unSettledPromiseCount--;
          result[index] = reason;

          if (unSettledPromiseCount === 0) {
            reject(result);
          }
        }
      );
    });
  });
};
