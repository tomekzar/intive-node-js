const EventEmitter = require('events');

class CustomEmitter extends EventEmitter {}

const synchronousEmitter = new CustomEmitter();
synchronousEmitter.on('add', (x, y) => {
  console.log(x + y)
})

synchronousEmitter.emit('add', 1, 2)
synchronousEmitter.emit('add', 1, 3)
synchronousEmitter.emit('add', 1, 4)

console.log('Synchronous')

const asynchronousEmitter = new CustomEmitter()
asynchronousEmitter.on('add', (x, y) => {
  setImmediate(() => console.log(x + y))
})

asynchronousEmitter.emit('add', 1, 2)
asynchronousEmitter.emit('add', 1, 3)
asynchronousEmitter.emit('add', 1, 4)

console.log('Asynchronous')