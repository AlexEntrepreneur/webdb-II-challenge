const knex = require('knex');

const db = knex({
  client: 'sqlite',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
});

module.exports = db;
