const express = require('express');
const helmet = require('helmet');
const zoosRoutes = require('./zoos-router.js');
const bearsRoutes = require('./bears-router.js');
const server = express();

server.use('/api/zoos', zoosRoutes);
server.use('/api/bears', bearsRoutes);

module.exports = server;
