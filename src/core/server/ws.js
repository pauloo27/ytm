const { WebSocket, Server } = require('ws');
const { sendCommand } = require('../../common/ws');

// inject a "send command" function to ws
WebSocket.constructor.prototype.sendCommand = sendCommand;

function startWS() {
  const wss = new Server({ noServer: true });
  wss.on('connection', (socket) => {
    // TODO:
  });
  return wss;
}

function handleWSUpgrade(server, wss) {
  // TODO: handle auth
  server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });
}

module.exports = {
  startWS,
  handleWSUpgrade,
};
