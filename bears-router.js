const express = require('express');
const db = require('./data/knex-config.js');
const router = express.Router();
const Bears = db('bears');

router.use(express.json());

router.get('/', (req, res) => {
  Bears.select('id', 'name')
    .then((BearsArray) => {
      res.json(BearsArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Server failed to retrieve bears.',
        serverMessage: `${err}`
      })
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Bears.where({ id }).select('id', 'name').first()
    .then((bearObject) => {
      res.json(bearObject)
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to retrieve bear of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const newBearObject = { name };
  Bears.insert(newBearObject)
    .then((newBearId) => {
      return Bears.select('id', 'name');
    })
    .then((BearsArray) => {
      res.json(BearsArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Server failed to create a new bear.',
        serverMessage: `${err}`
      })
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newBearObject = { name };
  Bears.where({ id }).update(newBearObject)
    .then((updatedFieldsLength) => {
      return Bears.select('id', 'name');
    })
    .then((BearsArray) => {
      res.json(BearsArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to update bear of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Bears.where({ id }).del()
    .then((deletedFieldsLength) => {
      return Bears.select('id', 'name');
    })
    .then((BearsArray) => {
      res.json(BearsArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to delete bear of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

module.exports = router;
