function add(...rest) {
  const args = [...rest];

  function _adder(...inRest) {
    args.push(...inRest);

    return _adder;
  }

  _adder.toString = function () {
    return args.reduce((a, b) => a + b, 0);
  };

  return _adder;
}

console.log(1 + add(1)(2)(3));

function currying(fn, cb) {
  return function (...inRest) {
    return fn.call(null, cb, ...inRest);
  };
}

function square(i) {
  return i * i;
}
function dubble(i) {
  return i * 2;
}
function map(handler, list) {
  return list.map(handler);
}

var mapSQ = currying(map, square);
console.log(mapSQ([1, 2, 3, 4, 5]));
console.log(mapSQ([6, 7, 8, 9, 10]));

var mapDB = currying(map, dubble);
console.log(mapDB([1, 2, 3, 4, 5]));
console.log(mapDB([6, 7, 8, 9, 10]));
