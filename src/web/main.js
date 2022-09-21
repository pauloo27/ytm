const ws = require('./ws');
const Listener = require('./listener');
const { loadExtras } = require('./extra');

const socket = ws.connect();

window.addEventListener('DOMContentLoaded', () => {
  let interval;
  const checkIfReady = () => {
    if (!document.querySelector('video')) return;
    loadExtras();
    socket.sendCommand('i-am-ready');
    clearInterval(interval);
    Listener.events.on('all', ({ key, value }) => {
      socket.sendCommand('update-state', { [key]: value });
    });
  };
  interval = setInterval(checkIfReady, 100);
});
