function sendCommand(command, value) {
  this.send(JSON.stringify({ command, value }));
}

// inject a "send command" function to ws
WebSocket.prototype.sendCommand = sendCommand;

function functionToCommandName(functionName) {
  return functionName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

const commands = {};
Object.keys(window.ytm.controller).forEach((key) => {
  commands[functionToCommandName(key)] = window.ytm.controller[key];
});

function handleCommand(socket, message) {
  const data = JSON.parse(message.data);
  if (!data || !data.command) return;
  const command = commands[data.command];
  if (!command) return;
  const response = command(data.value);
  if (!response) return;
  socket.sendCommand('update-state', response);
}

function connect() {
  const ws = new WebSocket('ws://localhost:4200');

  ws.onmessage = (rawData) => handleCommand(ws, rawData);
  return ws;
}

const socket = connect();

let interval;
const checkIfReady = () => {
  if (!document.querySelector('video')) return;
  socket.sendCommand('i-am-ready');
  clearInterval(interval);
  window.ytm.listenToChanges();
  window.ytm.events.on('all', ({ key, value }) => {
    socket.sendCommand('update-state', { [key]: value });
  });
};
interval = setInterval(checkIfReady, 100);
