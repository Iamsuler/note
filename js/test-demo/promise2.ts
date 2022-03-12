// Promise.resolve(2)
//   .then((res) => {
//     console.log(res);
//     return 2;
//   })
//   .catch((err) => {
//     console.log(err);
//     return 3;
//   })
//   .then((res) => {
//     console.log(res);
//   });

// const promise = new Promise<void>((resolve, reject) => {
//   console.log(1);
//   resolve();
//   console.log(2);
// });
// promise.then(() => {
//   console.log(3);
// });
// console.log(4);

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("success");
//   }, 1000);
// });
// const promise2 = promise1.then((res) => {
//   throw new Error("Error");
// });

// console.log("promise1: ", promise1);
// console.log("promise2: ", promise2);

// setTimeout(() => {
//   console.log("promise1: ", promise1);
//   console.log("promise2: ", promise2);
// }, 2000);

// setTimeout(() => {
//   console.log(5);
// }, 0);

// new Promise((resolve) => {
//   console.log(1);
//   Promise.resolve().then(() => {
//     console.log(4);
//   });
//   resolve(3);
// }).then((res) => {
//   console.log(res);
// });

// console.log(2);

// const promise = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("once");
//     resolve("success");
//   }, 1000);
// });
// const start = new Date().getTime();

// promise.then((res) => {
//   console.log(res, new Date().getTime() - start);
// });
// promise.then((res) => {
//   console.log(res, new Date().getTime() - start);
// });

// Promise.resolve()
//   .then(() => {
//     // throw new Error("error");
//     return new Error("error");
//   })
//   .then((res) => {
//     console.log("then: " + res);
//   })
//   .catch((err) => {
//     console.log("catch: " + err);
//   });

// const promise = Promise.resolve().then(() => {
//   return promise;
// });

// promise.catch(console.error);

// Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);

// Promise.reject()
//   .then(
//     (res) => {
//       throw new Error("error");
//     },
//     (err) => {
//       console.log("fail: ", err);
//     }
//   )
//   .catch((e) => {
//     console.log("catch: ", e);
//   });
async function async2() {
  console.log(2);
}
async function async1() {
  console.log(1);
  await async2();
  console.log(3);
}
Promise.resolve().then(() => {
  console.log(4);
});
setTimeout(() => {
  console.log(5);
}, 0);

async1();
console.log(6);

// 1, 2, 6, 4, 3, 5
