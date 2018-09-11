const mongo = require('./mongo-db')

mongo.connect()
  .then(() => mongo.findAll())
  .then(() => mongo.insertOne({ name: 'Tomek' }))
  .then(doc => {
    const id = doc.insertedIds['0']
    return mongo.updateOne(id, { name: 'Marek' })
  })
  // .then(doc => {
  //   const id = doc.insertedIds['0']
  //   return mongo.deleteOne(id)
  // })
  .then(() => mongo.findAll())
  .then(docs => {
    console.log(docs)
    return Promise.resolve()
  })
  .then(() => mongo.close())
  .catch(err => console.log(err))