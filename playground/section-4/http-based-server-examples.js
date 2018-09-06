const http = require('http')
const url = require('url')
const querystring = require('querystring')

http.createServer((req, res) => {
  const reqUrl = url.parse(req.url)
  const { method } = req
  const path = reqUrl.pathname
  const query = querystring.parse(reqUrl.query)

  if (method === 'GET' && path === '/hello') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    })
    res.write(`Hello ${query.name}`)
    res.end()
  } else if (method === 'POST' && path === '/echo') {
    const buffer = [];
    req.on('data', chunk => {
      buffer.push(chunk);
    }).on('end', () => {
      const body = Buffer.concat(buffer).toString()
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.write(body)
      res.end()
    })
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    })
    res.end()
  }
}).listen(9080)
