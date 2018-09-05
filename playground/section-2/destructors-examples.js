const { property, add } = require('./module-exports-examples')
console.log(property)
console.log(add)

const person = {
  name: 'Tomek',
  age: 29
}

const { name, age } = person
console.log({ name, age })