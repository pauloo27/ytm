const WebSocket = require('ws');

function connect() {
  const ws = new WebSocket('ws://localhost:4200');
  ws.on('message', (rawData) => {
    // TODO:
  });
}

module.exports = {
  connect,
};
