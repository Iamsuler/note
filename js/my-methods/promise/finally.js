// finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

Promise.prototype.finally = function (cb) {
  return this.then(
    (res) => {
      return Promise.resolve(cb()).then(() => res);
    },
    (err) => {
      return Promise.resolve(cb()).then(() => {
        throw err;
      });
    }
  );
};
