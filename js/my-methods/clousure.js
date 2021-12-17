function repeat(func, times, wait) {
  let timer = null;

  return function (str) {
    timer = setInterval(function () {
      func(str);
      times--;
      if (times === 0) {
        clearInterval(timer);
      }
    }, wait);
  };
}

const repeatFunc = repeat(console.log, 4, 3000);
repeatFunc("hellow world");
