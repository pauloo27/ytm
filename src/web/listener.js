/* eslint-disable global-require */
const EventEmitter = require('events');

const events = new EventEmitter();
let Controller;

function newAttributeObserver(cb, element, attributeName) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(cb);
  });

  observer.observe(
    element,
    {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: attributeName ? [attributeName] : undefined,
    },
  );
}

function newContentObserver(cb, element) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(cb);
  });

  observer.observe(
    element,
    {
      childList: true,
    },
  );
}

function handleIsPaused(cb) {
  document.querySelector('video').onpause = cb('isPaused', true);
  document.querySelector('video').onplay = cb('isPaused', false);
}

function handleIsVideo(cb) {
  newAttributeObserver(
    (mutation) => cb('isVideo', mutation.oldValue === null),
    document.querySelector('#player'),
    'video-mode_',
  );
}

function handleVolume(cb) {
  document.querySelector('#volume-slider').addEventListener('change', (e) => {
    cb('volume', Number.parseInt(e.target.getAttribute('value'), 10));
  });
}

function handleTitle(cb) {
  newContentObserver(
    (mutation) => cb('title', mutation.target.textContent),
    document.querySelector('.title.ytmusic-player-bar'),
  );
}

function handleDuration(cb) {
  newAttributeObserver(
    (mutation) => {
      const newValue = mutation.target.getAttribute('aria-valuemax');
      if (newValue !== mutation.oldValue) {
        cb('duration', Number.parseInt(newValue, 10));
      }
    },
    document.querySelector('#progress-bar'),
    'aria-valuemax',
  );
}

function handlePosition(cb) {
  newAttributeObserver(
    (mutation) => {
      const newValue = mutation.target.getAttribute('aria-valuenow');
      if (newValue !== mutation.oldValue) {
        cb('position', Number.parseInt(newValue, 10));
      }
    },
    document.querySelector('#progress-bar'),
    'aria-valuenow',
  );
}

function handleLikeStatus(cb) {
  newAttributeObserver(
    (mutation) => cb('likeStatus', mutation.target.getAttribute('like-status')),
    document.querySelector('#like-button-renderer'),
    'like-status',
  );
}

function handleLoopType(cb) {
  newAttributeObserver(
    (mutation) => cb('loopType', mutation.target.getAttribute('repeat-mode_')),
    document.querySelector('ytmusic-player-bar'),
    'repeat-mode_',
  );
}

function handleUrl(cb) {
  newAttributeObserver(
    (mutation) => {
      const newValue = mutation.target.getAttribute('href');
      if (newValue !== mutation.oldValue) {
        cb('url', newValue);
      }
    },
    document.querySelector('.ytp-title-link.yt-uix-sessionlink'),
    'href',
  );
}

// FIXME: since some stuff are harded to listen, we listen to the URL
// change instead... Kinda bad, but works =).
function handleAuthor(cb) {
  events.on('title', () => {
    cb('author', Controller.getAuthor());
  });
}

function handleCoverUrl(cb) {
  events.on('title', () => {
    cb('coverUrl', Controller.getCover());
  });
}

function handleAlbumName(cb) {
  events.on('title', () => {
    cb('albumName', Controller.getAlbumName());
  });
}

function listenToChanges() {
  const cb = (key, newValue) => {
    events.emit(key, newValue);
    events.emit('all', { key, value: newValue }); // FIXME?
  };
  Controller = require('./controller');
  // handleIsPlaying(cb);
  handleIsPaused(cb);
  handleIsVideo(cb);
  handleVolume(cb);
  handleTitle(cb);
  handleAuthor(cb);
  handleDuration(cb);
  handlePosition(cb);
  handleUrl(cb);
  handleLoopType(cb);
  handleCoverUrl(cb);
  handleAlbumName(cb);
  handleLikeStatus(cb);
}

module.exports = {
  events,
  listenToChanges,
};
