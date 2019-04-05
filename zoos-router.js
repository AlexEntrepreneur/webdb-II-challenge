const express = require('express');
const db = require('./data/knex-config.js');
const router = express.Router();
const Zoos = db('zoos');

router.use(express.json());

router.get('/', (req, res) => {
  Zoos.select('id', 'name')
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

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Zoos.where({ id }).select('id', 'name').first()
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

router.post('/', (req, res) => {
  const { name } = req.body;
  const newZooObject = { name };
  Zoos.insert(newZooObject)
    .then((newZooId) => {
      return Zoos.select('id', 'name');
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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newZooObject = { name };
  Zoos.where({ id }).update(newZooObject)
    .then((updatedFieldsLength) => {
      return Zoos.select('id', 'name');
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Zoos.where({ id }).del()
    .then((deletedFieldsLength) => {
      return Zoos.select('id', 'name');
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

module.exports = router;
