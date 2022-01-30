const RPC = require('discord-rpc');
const State = require('../../core/state');

// should i "secret" that? It's just an ID anyway...
const clientId = '936460517382422549';

function load() {
  const client = new RPC.Client({ transport: 'ipc' });

  const updateActivity = (state) => {
    const activity = state.isPlaying
      ? {
        details: state.title,
        state: `by ${state.author}`,
        largeImageKey: state.coverUrl,
      } : {
        details: 'Not playing anything...',
      };

    client.setActivity(
      activity,
    );
  };

  client.on('ready', () => {
    State.reactWithState(updateActivity);
  });
  client.login({ clientId });
}

module.exports = {
  load,
};
