/* eslint-disable global-require */
const EventEmitter = require('events');

const events = new EventEmitter();

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
  return observer;
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
  return observer;
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

function handleAuthor(cb) {
  const getAuthorElem = () => document.querySelectorAll(
    '.subtitle.ytmusic-player-bar>yt-formatted-string>.yt-formatted-string',
  )[0];

  const container = document.querySelector('.subtitle.ytmusic-player-bar');
  newContentObserver(() => {
    const elem = getAuthorElem();
    if (elem === undefined) return;
    cb('author', elem.textContent);
  }, container);
}

function handleAlbumName(cb) {
  const getAlbumNameElement = () => {
    const strings = document.querySelectorAll(
      '.subtitle.ytmusic-player-bar>yt-formatted-string>.yt-formatted-string',
    );
    return strings[strings.length - 3];
  };

  const container = document.querySelector('.subtitle.ytmusic-player-bar');
  newContentObserver(() => {
    const elem = getAlbumNameElement();
    if (elem === undefined) return;
    cb('albumName', elem.textContent);
  }, container);
}

let Controller;

function handleCoverUrl(cb) {
  newAttributeObserver(
    () => {
      if (!Controller) Controller = require('./controller');
      cb('coverUrl', Controller.getCoverUrl());
    },
    document.querySelector('.image.ytmusic-player-bar'),
    'src',
  );
}

function listenToChanges() {
  const cb = (key, newValue) => {
    events.emit(key, newValue);
    events.emit('all', { key, value: newValue }); // FIXME?
  };
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
