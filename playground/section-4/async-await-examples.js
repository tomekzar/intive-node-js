const divide = (x, y) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (y === 0) {
      reject('Cannot divide with 0')
    } else {
      resolve(x / y)  
    }
  }, 3000)
})

const multiply = (x, y) => Promise.resolve(x * y)

const combine = async (x, y) => {
  const divisionResult = await divide(x, y)
  const multiplicationResult = await multiply(divisionResult, 5)
  return multiplicationResult + 1
}

combine(10, 2)
  .then(console.log)
  .catch(err => console.log(`Error: ${err}`))

console.log('Waiting for the result')  