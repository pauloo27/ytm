const express = require('express');
const path = require('path');
const { cors } = require('./cors');

const port = 4200;

function start() {
  const app = express();

  // allow requests from https://music.youtube.com
  app.use(cors);

  // TODO: move routing out of the main file
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(port);
}

module.exports = {
  start,
  port,
};
