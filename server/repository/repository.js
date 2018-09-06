const fs = require('fs')
const path = require('path');

const idGenerator = {
  id: 1,
  incrementAndGet: function() {
    return this.id++
  }
}

const repositoryPath = path.join(__dirname, '..', '..', 'data', 'repository.json')

const writeFile = data => new Promise((resolve, reject) => {
  fs.writeFile(repositoryPath, JSON.stringify(data), 'utf8', (err) => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})

const list = () => new Promise((resolve, reject) => {
  fs.readFile(repositoryPath, 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(JSON.parse(data || '[]'))
    }
  })
})

const create = worklog => {
  const id = idGenerator.incrementAndGet()
  const log = { id, ...worklog }
  return list().then(logs => {
    logs.push(log)
    return writeFile(logs)
  }).then(() => log)
}

const update = worklog => {
  return list().then(logs => {
    const updated = logs.filter(log => log.id !== worklog.id)
    updated.push(worklog)
    return writeFile(updated)
  }).then(() => worklog)
}

const remove = id => {
  return list().then(logs => {
    const updated = logs.filter(log => log.id !== id)
    return writeFile(updated)
  }).then(() => ({ id }))
}

module.exports = {
  list,
  create,
  update,
  remove
}
