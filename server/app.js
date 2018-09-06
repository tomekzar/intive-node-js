const http = require('http')
const url = require('url')
const querystring = require('querystring')

const { list, create, update, remove } = require('./repository/worklogs')

http.createServer((req, res) => {
  const { method, headers } = req
  const requestUrl = url.parse(req.url)
  const path = requestUrl.pathname 
  const query = querystring.parse(requestUrl.query)

  // console.log(path)
  // console.log(query)
  // console.log(headers)

  // This is important
  // console.log(somethingElse)

  if (method === 'GET' && path === '/api/v1/logs') {
    list().then(logs => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.write(JSON.stringify(logs))
      res.end()
    })
  } else if (method === 'POST' && path === '/api/v1/logs') {
    const buffer = []
    req.on('data', chunk => buffer.push(chunk))
      .on('end', () => {
        const body = JSON.parse(Buffer.concat(buffer).toString())
        const { project, date, hours } = body
        create(project, date, hours).then(worklog => {
          res.writeHead(201, {
            'Content-Type': 'application/json'
          })
          res.write(JSON.stringify(worklog))
          res.end()
        })
      })
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    })
    res.end()
  }
}).listen(9080)
