const repository = require('./repository')
const validator = require('./../validator/worklogValidator')

const list = () => repository.list()

const create = (project, date, hours) => {
  const worklog = { project, date, hours }
  if (validator.isValid(worklog)) {
    return repository.create(worklog)
  } else {
    return Promise.reject('Validation error')
  }
}

const update = (id, project, date, hours) => {
  const worklog = { id, project, date, hours }
  if (validator.isValid(worklog)) {
    return repository.update(worklog)
  } else {
    return Promise.reject('Validation error')
  }
}

const remove = id => repository.remove(id)

module.exports = {
  list, create, update, remove
}
