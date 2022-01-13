// ES2020 引入了Promise.allSettled()方法，用来确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫做”Settled“，包含了”fulfilled“和”rejected“两种情况。

Promise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new Error("promises must be an array");
    }

    let result = [];
    let unSettledPromiseCount = promises.length;

    promises.forEach((item, index) => {
      item.then(
        (value) => {
          unSettledPromiseCount--;
          result[index] = {
            status: "fulfilled",
            value,
          };

          if (unSettledPromiseCount === 0) {
            resolve(result);
          }
        },
        (reason) => {
          unSettledPromiseCount--;
          result[index] = {
            status: "rejected",
            reason,
          };

          if (unSettledPromiseCount === 0) {
            resolve(result);
          }
        }
      );
    });
  });
};
