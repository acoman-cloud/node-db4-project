const express = require('express');
const router = require('./router');

const server = express();

server.use(express.json());
server.use('/api', router);

server.use('*', (req, res, next) => { // eslint-disable-line
  res.json({ api: 'up' });
});

module.exports = server;
