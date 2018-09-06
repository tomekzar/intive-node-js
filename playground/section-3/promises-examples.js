const divide = (x, y) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (y === 0) {
      reject('Cannot divide with 0')
    } else {
      resolve(x / y)  
    }
  }, 5000)
})

const multiply = (x, y) => Promise.resolve(x * y)

divide(10, 2)
  .then(console.log)
  .catch(err => console.log(`Error: ${err}`))

console.log('Waiting for the result')  

divide(10, 0)
  .then(result => multiply(result, 3))
  .then(console.log)
  .catch(err => console.log(`Error: ${err}`))
