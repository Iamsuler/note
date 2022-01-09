Promise.prototype.any = function (promises) {
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
