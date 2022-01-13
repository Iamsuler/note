class Publisher {
  topics: Record<string, Function[]>;
  constructor() {
    this.topics = {};
  }

  subscribe(topic: string, func: Function) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    this.topics[topic].push(func);
  }

  publish(topic: string, ...rest: any[]) {
    if (!this.topics[topic]) {
      return;
    }

    this.topics[topic].forEach((item) => {
      item(topic, ...rest);
    });

    return this;
  }

  unsubscribe(topic: string) {
    delete this.topics[topic];
  }
}

const publisher = new Publisher();
publisher.subscribe("test", (...rest: any[]) => {
  console.log(rest.join(","));
});
publisher.subscribe("update", (...rest: any[]) => {
  console.log(rest.join(","));
});
publisher.publish("test", "test1", "test2");
publisher.publish("update", "update1", "update2");
