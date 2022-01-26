const ws = require('./ws');
const Listener = require('./listener');

const socket = ws.connect();

window.addEventListener('DOMContentLoaded', () => {
  let interval;
  const checkIfReady = () => {
    if (!document.querySelector('video')) return;
    socket.sendCommand('i-am-ready');
    clearInterval(interval);
    Listener.events.on('all', ({ key, value }) => {
      socket.sendCommand('update-state', { [key]: value });
    });
  };
  interval = setInterval(checkIfReady, 100);
});
