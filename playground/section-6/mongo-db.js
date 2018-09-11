const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const dbName = 'myproject'
const collectionName = 'documents'

let client
let collection

module.exports = {
  connect: function () {
    return MongoClient.connect(url, { useNewUrlParser: true }).then(cl => {
      client = cl
      collection = client.db(dbName).collection(collectionName)
      return Promise.resolve()
    })
  },
  findAll: () => collection.find({}).toArray(),
  insertOne: doc => collection.insertMany([doc]),
  updateOne: (id, doc) => collection.updateOne({ '_id': id }, { $set: { ...doc } }),
  deleteOne: id => collection.deleteOne({ '_id': id }),
  close: () => client.close()
}