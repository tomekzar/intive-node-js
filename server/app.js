const hapi = require('hapi')

const { routes } = require('./routes/routes')

const options = {
  ops: {
      interval: 1000
  },
  reporters: {
    consoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      }, 
      {
        module: 'good-console'
      }, 
      'stdout'
    ]
  }
};

const server = hapi.server({
  port: 9080,
  host: 'localhost'
})

const init = async () => {
  routes.forEach(r => server.route(r))

  await server.register({
    plugin: require('good'),
    options
  })

  await server.start()
  
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init()