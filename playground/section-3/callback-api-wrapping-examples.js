const divide = (x, y, callbackFn) => {
  setTimeout(() => {
    if (y === 0) {
      callbackFn('Cannot divide with 0')
    } else {
      callbackFn(undefined, x / y)
    }
  }, 5000)
}

const divideWrapped = (x, y) => new Promise((resolve, reject) => {
  divide(x, y, (err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  })
})

divideWrapped(10, 0)
  .then(console.log)
  .catch(err => console.log(`Error: ${err}`))

console.log('Waiting for the result')  