// 原型链模式
// 1. 包含引用类型值得原型会相互污染
// 2. 无法在不影响超类的情况下传递参数
function SuperType() {
  this.superproperty = true;
  this.colors = ["red", "green"];
}

SuperType.prototype.getSuperValue = function () {
  return this.superproperty;
};

function SubType() {
  this.subproperty = false;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

// 必须在替换原型之后
SubType.prototype.getSubValue = function () {
  return this.subproperty;
};

const instance = new SubType();
instance.superproperty = false;
instance.colors.push("yellow");
console.log(instance.getSuperValue());

// const instance2 = new SubType();
// console.log(instance2.colors);
// console.log(instance2.getSuperValue());

// 借用构造函数
// 方法属性都在构造函数中，每个实例都会生成，没有函数复用
function SuperType() {
  this.colors = ["red"];
  // this.getColors = function () {
  //   console.log(this.colors);
  // };
}
SuperType.prototype.getColors = function () {
  console.log(this.colors);
};

function SubType() {
  SuperType.call(this);
}

const instance = new SubType();
instance.colors.push("yellow");
instance.getColors();

const instance2 = new SubType();
instance2.getColors();

// 组合继承（原型+构造函数）
// 1.会调用两次父类构造函数
// function SuperType(name) {
//   this.name = name;
//   this.colors = ["red", "green"];
//   console.log("SuperType is calling");
// }

// SuperType.prototype.sayName = function () {
//   console.log(this.name);
// };

// function SubType(name, age) {
//   SuperType.call(this, name); // 第二次调用SuperType
//   this.age = age;
// }

// SubType.prototype = new SuperType(); // 第一次调用SuperType
// SubType.prototype.constructor = SubType;
// SubType.prototype.sayAge = function () {
//   console.log(this.age);
// };

// const instance = new SubType();
// instance.colors.push("yellow");
// console.log(instance.colors);

// const instance2 = new SubType();
// console.log(instance2.colors);

// 寄生组合式
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "green"];
}

SuperType.prototype.sayColors = function () {
  console.log(this.colors);
};

function SubType(age, name) {
  SuperType.call(this, name);
  this.age = age;
}

SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function () {
  console.log(this.age);
};

const instance = new SubType();
instance.colors.push("yellow");
console.log(instance.colors);

const instance2 = new SubType();
console.log(instance2.colors);
