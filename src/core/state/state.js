let state = {};

function isStateInitialized() {
  return state;
}

function initState(newState) {
  if (isStateInitialized()) throw new Error('State already initialized');
  state = newState;
}

function updateState(newState) {
  state = { ...state, ...newState };
}

module.exports = {
  isStateInitialized,
  initState,
  updateState,
};
