const ws = require('./ws');

const socket = ws.connect();

window.addEventListener('DOMContentLoaded', () => {
  let interval;
  const checkIfReady = () => {
    if (!document.querySelector('video')) return;
    socket.sendCommand('i-am-ready');
    clearInterval(interval);
  };
  interval = setInterval(checkIfReady, 100);
});
