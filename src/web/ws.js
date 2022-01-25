const WebSocket = require('ws');
const { sendCommand } = require('../common/ws');

// inject a "send command" function to ws
WebSocket.prototype.sendCommand = sendCommand;

function connect() {
  const ws = new WebSocket('ws://localhost:4200');

  ws.on('message', (rawData) => {
    // TODO:
  });
}

module.exports = {
  connect,
};
