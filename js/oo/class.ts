interface IAnimal {
  name: string;
}

class Animal {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }

  sayHello() {
    console.log("hello");
  }
}

const cat = new Cat("cat");
