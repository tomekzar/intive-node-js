const { argv } = require('yargs')

const { list, create, update, remove } = require('./repository')

const result = handleCommand()
console.log(result)

function handleCommand () {
  const { command, id, project, date, hours } = argv
  switch (command) {
    case 'list':
      return list()
    case 'create':
      return create(project, date, hours)
    case 'update':
      return update(id, project, date, hours)
    case 'remove':
      return remove(id)   
  }
}
