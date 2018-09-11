const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb://localhost:27017'
const dbName = 'nodejs-training'
const collectionName = 'worklogs'

let client
let collection

function connect() {
  return MongoClient.connect(url, { useNewUrlParser: true }).then(cl => {
    client = cl
    collection = client.db(dbName).collection(collectionName)
    return Promise.resolve()
  })
}

function transformId(document) {
  const id = document._id
  delete document._id
  return {
    id,
    ...document
  }
}

function list() {
  return collection.find({}).toArray()
    .then(worklogs => Promise.resolve(worklogs.map(transformId)))
}

function create(worklog) {
  return collection.insertMany([ worklog ])
    .then(() => Promise.resolve(transformId(worklog)))
}

function update(worklog) {
  const { project, date, hours } = worklog
  return collection.updateOne({ '_id': new ObjectId(worklog.id) }, { $set: { project, date, hours } })
    .then(() => Promise.resolve(worklog))
}

function remove(id) {
  return collection.deleteOne({ '_id': new ObjectId(id) }).then(() => Promise.resolve({ id }))
}

function close() {
  client.close()
}

module.exports = {
  connect,
  list,
  create,
  update,
  remove,
  close
}
