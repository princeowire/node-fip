const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading HTML');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const message = new URLSearchParams(body).get('message');
      console.log('Message received:', message);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(message);
    });
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
