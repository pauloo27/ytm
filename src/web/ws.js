const WebSocket = require('ws');
const { sendCommand } = require('../common/ws');
const Controller = require('./controller');

// inject a "send command" function to ws
WebSocket.prototype.sendCommand = sendCommand;

function functionToCommandName(functionName) {
  return functionName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

const commands = {};
Object.keys(Controller).forEach((key) => {
  commands[functionToCommandName(key)] = Controller[key];
});

function handleCommand(socket, rawData) {
  const data = JSON.parse(rawData);
  // TODO: log invalid command?
  if (!data || !data.command) return;
  const command = commands[data.command];
  if (!command) return;
  const response = command(data.value);
  if (!response) return;
  socket.sendCommand('update-state', response);
}

function connect() {
  const ws = new WebSocket('ws://localhost:4200');

  ws.on('message', (rawData) => handleCommand(ws, rawData));
  return ws;
}

module.exports = {
  connect,
};
