let state = {};

function initState(newState) {
  if (!state) throw new Error('State already initialized');
  state = newState;
}

module.exports = {
  initState,
};
