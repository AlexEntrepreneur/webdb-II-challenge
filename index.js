const express = require('express');
const helmet = require('helmet');
const server = express();

server.use(express.json());
server.use(helmet());

server.get('/api/zoos', (req, res) => {
  res.send('Returns list of zoos');
});

server.get('/api/zoos/:id', (req, res) => {
  res.send(`Returns zoo of id ${req.params.id}`);
});

server.post('/api/zoos', (req, res) => {
  res.send(`Added ${JSON.stringify(req.body)} to database`);
});

server.put('/api/zoos/:id', (req, res) => {
  res.send(`Updated zoo ${req.params.id} with ${JSON.stringify(req.body)}`);
});

server.delete('/api/zoos/:id', (req, res) => {
  res.send(`Deleted zoo ${req.params.id}`);
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
