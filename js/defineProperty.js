let obj = {
  name: 'xxx'
}

Object.defineProperty(obj, 'age', {value: 18})

obj.age = 20;

console.log(obj)

console.log(Object.keys(obj))
