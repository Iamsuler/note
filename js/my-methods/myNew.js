function myNew(fn, ...args) {
  // 基于fn的原型创建一个新的对象
  const newObj = Object.create(fn.prototype);

  // 添加属性到新创建的newObj上, 并获取fn函数执行的结果.
  const result = fn.apply(newObj, args);

  // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return typeof result === "object" ? result : newObj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.say = function () {
    console.log(this.name);
  };
}

// var p2 = myNew(Person, "biao", 22);
// p2.say();
