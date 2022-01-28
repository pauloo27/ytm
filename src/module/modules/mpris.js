const Player = require('mpris-service');
const { app } = require('electron');
const State = require('../../core/state/state');

function preLoad() {
  app.commandLine.appendSwitch('disable-features', 'MediaSessionService');
}

function postLoad(socket) {
  if (process.platform !== 'linux') {
    return;
  }
  const player = new Player({
    name: app.name.replace('-', '_'),
    identity: 'YouTube Music',
    supportedUriSchemes: ['file'],
    supportedMimeTypes: ['audio/mpeg', 'application/ogg'],
    supportedInterfaces: ['player'],
    // canRaise: true, TODO
  });

  player.getPosition = () => State.getFromState('position') * 1000000;

  player.on('play', () => {
    if (!State.getFromState('isPaused')) return;
    socket.sendCommand('play-pause');
  });
  player.on('pause', () => {
    if (State.getFromState('isPaused')) return;
    socket.sendCommand('play-pause');
  });
  player.on('playpause', () => socket.sendCommand('play-pause'));

  player.on('next', () => socket.sendCommand('next-track'));
  player.on('previous', () => socket.sendCommand('prev-track'));

  player.on('volume', (vol) => socket.sendCommand('set-volume', Math.floor(vol * 100)));

  player.on('position', (args) => socket.sendCommand('set-position', Math.floor(args.position / 1000000)));
  player.on('seek', (offset) => socket.sendCommand('set-position', Math.floor((player.getPosition() + offset) / 1000000)));

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
  preLoad,
  postLoad,
};
