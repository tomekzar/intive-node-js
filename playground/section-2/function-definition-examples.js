const add = (x, y) => x + y
function anotherAdd (x, y) {
  return x + y
}

console.log(add(1, 2))
console.log(anotherAdd(1, 2))

const person = {
  age: 20,
  birthday: () => {
    // console.log(this)
    return this.age++
  }
}

const anotherPerson = {
  age: 20,
  birthday: function () {
    return this.age++
  }
}

console.log(person.birthday())
console.log(anotherPerson.birthday())
