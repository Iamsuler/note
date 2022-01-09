Promise.prototype.all = function (promises) {
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
