const hapi = require('hapi')

const { routes } = require('./routes/routes')
const repository = require('./repository/repository')

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

process.on('SIGTERM', function () {
  repository.close()
  server.close(function () {
    process.exit(0);
  });
});

repository.connect()
  .then(() => init())
  .catch(err => {
    console.log(`Initialization error: ${err}`)
    process.exit(1)
  })
