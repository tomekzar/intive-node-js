/* eslint-env mocha */
const chai = require('chai')
const { expect } = chai
const proxyquire =  require('proxyquire')
const moment = require('moment')

const idGenerator = {
  id: 0,
  incrementAndGet: function() {
    return ++this.id
  }
}

const repositoryStub = {
  storage: [],
  list: function() {
    return Promise.resolve(this.storage)
  },
  create: function(worklog) {
    const id = idGenerator.incrementAndGet()  
    const enrichedWorklog = {
      id,
      ...worklog
    }
    this.storage.push(enrichedWorklog)
    return Promise.resolve(enrichedWorklog)
  },
  update: function(worklog) {
    this.storage = this.storage.filter(w => w.id !== worklog.id)  
    this.storage.push(worklog)
    return Promise.resolve(worklog)
  },
  remove: function(id) {
    this.storage = this.storage.filter(w => w.id !== id)  
    return Promise.resolve({ id })
  }
}

describe('worklogs', () => {
  const project = 'test'
  const date = moment().format('YYYY-MM-DD')
  const hours = 8

  const worklogs = proxyquire('./../../../../server/repository/worklogs', {
    './repository': repositoryStub
  })

  beforeEach(() => {
    idGenerator.id = 0
    repositoryStub.storage = []
  });

  it('should initially return an empty list', async () => {
    const result = await worklogs.list()
    expect(result).to.be.empty
  })
  
  it('should return created worklog after save', async () => {
    const result = await worklogs.create(project, date, hours)
    expect(result.id).to.be.equal(1)

    const allWorklogs = await worklogs.list()
    expect(allWorklogs).to.have.length(1)
  })

  it('should update created worklog', async () => {
    const createdWorklog = await worklogs.create(project, date, hours)
    const result = await worklogs.update(createdWorklog.id, 'test-altered', createdWorklog.date, createdWorklog.hours)
    expect(result.project).to.be.equal('test-altered')

    const allWorklogs = await worklogs.list()
    expect(allWorklogs).to.have.length(1)
    expect(allWorklogs[0].project).to.be.equal('test-altered')
  })

  it('should delete worklog', async () => {
    const worklog = await worklogs.create(project, date, hours)
    const result = await worklogs.remove(worklog.id)
    expect(result).to.be.deep.equal({
      id: worklog.id
    })

    const allWorklogs = await worklogs.list()
    expect(allWorklogs).to.be.empty
  })
})