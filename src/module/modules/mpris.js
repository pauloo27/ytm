const Player = require('mpris-service');
const { app } = require('electron');
const State = require('../../core/state/state');

function load() {
  if (process.platform !== 'linux') {
    return;
  }
  const player = new Player({
    name: app.name.replace('-', '_'),
    identity: 'YouTube Music',
    supportedUriSchemes: ['file'],
    supportedMimeTypes: ['audio/mpeg', 'application/ogg'],
    supportedInterfaces: ['player'],
    // canRaise: true, FIXME
  });
  player.getPosition = () => State.getFromState('position');

  const updatePlayer = (state) => {
    player.volume = state.volume / 100;
    player.playbackStatus = state.isPaused
      ? Player.PLAYBACK_STATUS_PAUSED : Player.PLAYBACK_STATUS_PLAYING;
    player.metadata = {
      'mpris:trackid': player
        .objectPath('track/0'),
      'mpris:length': state.duration * 1000000, // In microseconds
      'mpris:artUrl': state.coverUrl,
      'xesam:title': state.title,
      'xesam:album': state.albumName,
      'xesam:artist': [state.author],
    };
  };

  State.reactWithState(updatePlayer);
}

module.exports = {
  name: 'MPRIS',
  load,
};
