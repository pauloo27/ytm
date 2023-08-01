const path = require('path');
const express = require('express');

function route(app) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.use('/web', express.static(path.join(__dirname, '../', '..', 'web', 'inject')));
}

module.exports = {
  route,
};
