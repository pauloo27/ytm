const { Server } = require('ws');
const { sendCommand } = require('../../common/ws');
const { isStateInitialized, initState, updateState } = require('../state');

function handleCommand(socket, rawData) {
  const data = JSON.parse(rawData);
  if (!data || !data.command) return;
  if (data.command === 'i-am-ready') socket.sendCommand('get-full-state');
  if (data.command === 'update-state') {
    if (isStateInitialized()) updateState(data.value);
    else if (Object.keys(data.value).length > 1) initState(data.value);
  }
}

function startWS() {
  const wss = new Server({ noServer: true });
  wss.on('connection', (socket) => {
    // inject a "send command" function to ws. TODO: inject only once?
    // eslint-disable-next-line no-param-reassign
    socket.constructor.prototype.sendCommand = sendCommand;
    socket.on('message', (rawData) => handleCommand(socket, rawData));
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
