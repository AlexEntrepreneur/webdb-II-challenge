const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();
const db = knex({
  client: 'sqlite',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
});

server.use(express.json());
server.use(helmet());

server.get('/api/zoos', (req, res) => {
  db('zoos').select('id', 'name')
    .then((zoosArray) => {
      res.json(zoosArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Server failed to retrieve Zoos.',
        serverMessage: `${err}`
      })
    });
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos').where({ id }).select('id', 'name').first()
    .then((zooObject) => {
      res.json(zooObject)
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to retrieve Zoo of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

server.post('/api/zoos', (req, res) => {
  const { name } = req.body;
  const newZooObject = { name };
  db('zoos').insert(newZooObject)
    .then((newZooId) => {
      return db('zoos').select('id', 'name');
    })
    .then((zoosArray) => {
      res.json(zoosArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Server failed to create a new zoo.',
        serverMessage: `${err}`
      })
    });
});

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newZooObject = { name };
  db('zoos').where({ id }).update(newZooObject)
    .then((updatedFieldsLength) => {
      return db('zoos').select('id', 'name');
    })
    .then((zoosArray) => {
      res.json(zoosArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to update Zoo of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos').where({ id }).del()
    .then((deletedFieldsLength) => {
      return db('zoos').select('id', 'name');
    })
    .then((zoosArray) => {
      res.json(zoosArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to delete Zoo of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

const PORT = 3300;

server.listen(PORT, function() {
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`);
});
