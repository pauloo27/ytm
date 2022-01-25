function sendCommand(command, value) {
  this.send(JSON.stringify({ command, value }));
}

module.exports = {
  sendCommand,
}
