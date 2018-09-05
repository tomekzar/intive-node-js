const repository = {
  id: 1,
  incrementAndGet: function() {
    return this.id++
  }
}

const list = () => []
const create = (project, date, hours) => {
  const id = repository.incrementAndGet()
  return { id, project, date, hours }
}
const update = (id, project, date, hours) => {
  return { id, project, date, hours }
}
const remove = id => {
  return { id }
}

module.exports = {
  list,
  create,
  update,
  remove
}
