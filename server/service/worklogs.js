const repository = require('../repository/repository')
const validator = require('../validator/worklogValidator')
const { overtimeNotification } = require('../events/overtime')

const list = () => repository.list()

const create = (project, date, hours) => {
  const worklog = { project, date, hours }
  if (validator.isValid(worklog)) {
    return repository.create(worklog).then(res => {
      if (worklog.hours > 8) {
        overtimeNotification(project)
      }
      return res
    })
  } else {
    return Promise.reject('Validation error')
  }
}

const update = (id, project, date, hours) => {
  const worklog = { id, project, date, hours }
  if (validator.isValid(worklog)) {
    return repository.update(worklog).then(res => {
      if (worklog.hours > 8) {
        overtimeNotification(project)
      }
      return res
    })
  } else {
    return Promise.reject('Validation error')
  }
}

const remove = id => repository.remove(id)

module.exports = {
  list, create, update, remove
}
