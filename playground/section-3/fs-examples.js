const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'data', 'sample.txt')

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.log(`Read error: ${err}`)
    process.exit(1)
  }

  const updatedData = `${data} updated`
  fs.writeFile(filePath, updatedData, 'utf8', (err, data) => {
    if (err) {
      console.log(`Write error: ${err}`)
      process.exit(1)
    }

    console.log('Successfully updated the file')
  })
})