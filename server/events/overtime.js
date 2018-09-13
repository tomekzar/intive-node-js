const EventEmitter = require('events');
const axios = require('axios')

const api = axios.create({
  timeout: 500
})

const url = 'http://www.mocky.io/v2/5b9b40773000004e00e7c327'

class OvertimeEventEmitter extends EventEmitter {}

const sendNotification = async project => {
  return await api.get(url)
}

const overtimeEventEmitter = new OvertimeEventEmitter()
overtimeEventEmitter.on('overtime', project => {
  setImmediate(() => {
    sendNotification(project)
      .catch(err => console.log(`Error during overtime notification: ${err}`))
  })
})

const overtimeNotification = project => {
  overtimeEventEmitter.emit('overtime', project)
}

module.exports = { overtimeNotification }