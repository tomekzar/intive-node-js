const hapi = require('hapi')

const server = hapi.server({
  port: 3000,
  host: 'localhost'
})

const fetchGreeting = name => new Promise(resolve => {
  setTimeout(() => {
    resolve(`Hello ${name}!`)  
  }, 3000);
})

server.route({
  method: 'GET',
  path: '/hello/{name}',
  handler: async (request, h) => {
    // for request body request.payload should be used
    const greeting = await fetchGreeting(request.params.name)
    return h.response(greeting).code(200)
  }
})

const init = async () => {
  await server.start()
  console.log(`Server running at ${server.info.uri}`)
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init()