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
