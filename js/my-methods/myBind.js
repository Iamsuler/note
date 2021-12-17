Function.prototype._bind = function (...outerArgs) {
  const context = this;
  const [target, ...outerRest] = outerArgs;

  return function (...innerRest) {
    return context.apply(target, [...outerRest, ...innerRest]);
  };
};
