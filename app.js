const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'content-Type': 'text/html' });
    fs.createReadStream(path.join(__dirname, '/index.html')).pipe(res);
  } else if (req.url === '/bundle.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    fs.createReadStream(path.join(__dirname, '/bundle.js')).pipe(res);
  }
});

server.listen(3000);
