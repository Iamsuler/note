// class Publisher {
//   topics: Record<string, Function[]>;
//   constructor() {
//     this.topics = {};
//   }

//   subscribe(topic: string, func: Function) {
//     if (!this.topics[topic]) {
//       this.topics[topic] = [];
//     }

//     this.topics[topic].push(func);
//   }

//   publish(topic: string, ...rest: any[]) {
//     if (!this.topics[topic]) {
//       return;
//     }

//     this.topics[topic].forEach((item) => {
//       item(topic, ...rest);
//     });

//     return this;
//   }

//   unsubscribe(topic: string) {
//     delete this.topics[topic];
//   }
// }

// const publisher = new Publisher();
// publisher.subscribe("test", (...rest: any[]) => {
//   console.log(rest.join(","));
// });
// publisher.subscribe("update", (...rest: any[]) => {
//   console.log(rest.join(","));
// });
// publisher.publish("test", "test1", "test2");
// publisher.publish("update", "update1", "update2");

class Pubsub {
  topics: Record<string, Function[]>;
  constructor() {
    this.topics = {};
  }

  subscribe(type: string, cb: Function) {
    const topic = this.topics[type];

    if (!topic) {
      this.topics[type] = [];
    }

    this.topics[type].push(cb);
  }

  notify(type: string, ...rest: any[]) {
    const subscribers = this.topics[type] || [];

    subscribers.forEach((cb) => {
      cb(...rest);
    });
  }
}

class Subscriber {
  name: string;
  context: Pubsub;

  constructor(name: string, context: Pubsub) {
    this.name = name;
    this.context = context;
  }

  subscribe(type: string, cb: Function) {
    this.context.subscribe(type, cb);
  }
}

class Publisher {
  name: string;
  context: Pubsub;

  constructor(name: string, context: Pubsub) {
    this.name = name;
    this.context = context;
  }

  publish(type: string, ...rest: any[]) {
    this.context.notify(type, ...rest);
  }
}

const TYPE_A = "music";
const TYPE_B = "movie";
const TYPE_C = "novel";

const pubsub = new Pubsub();

const publisherA = new Publisher("publisherA", pubsub);
const publisherB = new Publisher("publisherB", pubsub);
const publisherC = new Publisher("publisherC", pubsub);

const subscriberA = new Subscriber("subscriberA", pubsub);
subscriberA.subscribe(TYPE_A, (...rest: any[]) => {
  console.log("subscriberA received", rest.join(","));
});
const subscriberB = new Subscriber("subscriberB", pubsub);
subscriberB.subscribe(TYPE_B, (...rest: any[]) => {
  console.log("subscriberB received", rest.join(","));
});
const subscriberC = new Subscriber("subscriberC", pubsub);
subscriberC.subscribe(TYPE_C, (...rest: any[]) => {
  console.log("subscriberC received", rest.join(","));
});

publisherA.publish(TYPE_A, "we are young", "one world");
publisherA.publish(TYPE_B, "the silicon valley");
publisherB.publish(TYPE_A, "stronger");
publisherC.publish(TYPE_C, "a brief history of time");
