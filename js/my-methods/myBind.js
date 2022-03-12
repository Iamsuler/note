Function.prototype._bind = function (...outerArgs) {
  const context = this;
  const [target, ...outerRest] = outerArgs;

  return function (...innerRest) {
    return context.apply(target, [...outerRest, ...innerRest]);
  };
};

const obj1 = { a: 1 };
const obj2 = { a: 2 };
function print() {
  console.log(this.a);
}
const print1 = print._bind(obj1);
print1();
const print2 = print1._bind(obj2);
print2();
