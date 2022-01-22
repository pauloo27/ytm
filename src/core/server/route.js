const path = require('path');

function route(app) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

module.exports = {
  route,
};
