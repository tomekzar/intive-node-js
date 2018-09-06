const moment = require('moment')

const isValid = worklog => {
  if (worklog.hours <= 0) {
    return false
  } else {
    const now = moment()
    const date = moment(worklog.date)

    if (now.month() !== date.month()) {
      return false
    }
  }

  return true
}

module.exports = {
  isValid
}