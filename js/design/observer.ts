class Observer {
  uptate(message: string) {
    console.log(message);
  }
}

class Subject {
  observers: Observer[];
  constructor() {
    this.observers = [];
  }

  add(observer: Observer) {
    this.observers.push(observer);
  }

  get size(): number {
    return this.observers.length;
  }

  notify(message: string) {
    this.observers.forEach((observer) => {
      observer.uptate(message);
    });
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.add(observer1);
subject.add(observer2);
console.log(subject.size);
subject.notify("update");
