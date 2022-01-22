const { Server } = require('ws');

function startWS() {
  const wss = new Server({ noServer: true });
  wss.on('connection', (socket) => {
    socket.on('message', message => console.log('message is', message.toString()));
  });
  return wss;
}

function handleWSUpgrade(server, wss) {
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
