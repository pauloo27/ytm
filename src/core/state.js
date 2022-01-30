const EventEmitter = require('events');

const events = new EventEmitter();

let state;

function isStateInitialized() {
  return state !== undefined;
}

function initState(newState) {
  if (isStateInitialized()) throw new Error('State already initialized');
  state = newState;
  events.emit('update', state);
}

function updateState(newState) {
  if (!isStateInitialized()) return;
  state = { ...state, ...newState };
  events.emit('update', state);
}

function getFromState(key) {
  return state[key];
}

function reactWithState(cb) {
  events.on('update', cb);
}

module.exports = {
  isStateInitialized,
  initState,
  updateState,
  getFromState,
  reactWithState,
};
