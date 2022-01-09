Promise.prototype.allSettled = function (promises) {
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
