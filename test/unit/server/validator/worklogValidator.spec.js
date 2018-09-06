/* eslint-env mocha */
const chai = require('chai')
const { expect } = chai
const moment = require('moment')

describe('dateFormatter', () => {
  const { isValid } = require('./../../../../server/validator/worklogValidator')

  describe('isValid', () => {
    const project = 'test'
    const now = moment()
    
    it('should be invalid when date is in previous month', () => {
      const date = now.clone().subtract(1, 'months').format('YYYY-MM-DD')
      const hours = 8
      const result = isValid({ project, date, hours })
      expect(result).to.be.false
    })

    it('should be invalid when date is in next month', () => {
      const date = now.clone().add(1, 'months').format('YYYY-MM-DD')
      const hours = 8
      const result = isValid({ project, date, hours })
      expect(result).to.be.false
    })

    it('should be invalid when hours are less than 0', () => {
      const date = now.format('YYYY-MM-DD')
      const hours = -8
      const result = isValid({ project, date, hours })
      expect(result).to.be.false
    })

    it('should be valid', () => {
      const date = now.format('YYYY-MM-DD')
      const hours = 8
      const result = isValid({ project, date, hours })
      expect(result).to.be.true
    })
  })
})
