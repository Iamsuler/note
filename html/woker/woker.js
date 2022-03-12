let i = 0;

function timeCount() {
  i++;

  self.postMessage(i);

  setTimeout(timeCount, 500);
}

self.addEventListener('message', (message) => {
  console.log(message.data);
})

timeCount();