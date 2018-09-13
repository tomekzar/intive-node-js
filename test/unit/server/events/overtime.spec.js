/* eslint-env mocha */
const chai = require('chai')
const { expect } = chai
const nock = require('nock')

describe('overtime', () => {
  const project = 'project'
  const overtime = require('./../../../../server/events/overtime')

  beforeEach(() => {
    nock.cleanAll()
  })

  it('should call external API', done => {
    let requestCount = 0
    
    nock('http://www.mocky.io')
      .get('/v2/5b9b40773000004e00e7c327')
      .reply(() => {
        requestCount = requestCount + 1
        return [200, { status: 'ok' }]
      })

    overtime.overtimeNotification(project)

    setTimeout(() => {
      expect(requestCount).to.be.equal(1)
      done()
    }, 20);
  })
})