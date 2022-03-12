function red() {
  console.log('red');
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
}

function light(fn, delay) {
  return () => new Promise((resolve, reject) => {
    fn();
    setTimeout(() => {
      resolve();
    }, delay);
  })
}

const lightRed = light(red, 3000)
const lightGreen = light(green, 2000)
const lightYellow = light(yellow, 1000)

async function travers() {
  lightRed().then(lightGreen).then(lightYellow).then(travers)
}
travers()