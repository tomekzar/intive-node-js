const { list, create, update, remove } = require('./../repository/worklogs')

const getRoute = {
  method: 'GET',
  path: '/api/v1/logs',
  handler: async (request, h) => {
    const worklogs = await list()
    return h.response(worklogs)
  }
}

const postRoute = {
  method: 'POST',
  path: '/api/v1/logs',
  handler: async (request, h) => {
    const { project, date, hours } = request.payload
    const worklog = await create(project, date, hours)
    return h.response(worklog).code(201)
  }
}

const putRoute = {
  method: 'PUT',
  path: '/api/v1/logs/{id}',
  handler: async (request, h) => {
    const id = request.params.id
    const { project, date, hours } = request.payload
    const worklog = await update(id, project, date, hours)
    return h.response(worklog)
  }
}

const deleteRoute = {
  method: 'DELETE',
  path: '/api/v1/logs/{id}',
  handler: async (request, h) => {
    const removed = await remove(request.params.id)
    return h.response(removed)
  }
}

module.exports = {
  routes: [
    getRoute,
    postRoute,
    putRoute,
    deleteRoute
  ]
}