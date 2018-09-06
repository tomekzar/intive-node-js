function divide (x, y, callbackFn) {
  setTimeout(() => {
    if (y === 0) {
      callbackFn('Cannot divide with 0')
    } else {
      callbackFn(undefined, x / y)
    }
  }, 5000)
}

divide(10, 2, (err, result) => {
  if (err) {
    throw new Error(err)
  } else {
    console.log(result)
  }
})

console.log('Waiting for the result') 