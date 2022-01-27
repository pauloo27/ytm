/* eslint-disable global-require */
const EventEmitter = require('events');

const events = new EventEmitter();

function newAttributeObserver(cb, element, attributeName) {
  const observer = new MutationObserver((e) => {
    e.forEach(cb);
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
  const observer = new MutationObserver((e) => {
    e.forEach(cb);
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
  document.querySelector('video').addEventListener('pause', () => cb('isPaused', true));
  document.querySelector('video').addEventListener('play', () => cb('isPaused', false));
}

function handleIsVideo(cb) {
  newAttributeObserver(
    (e) => cb('isVideo', e.oldValue === null),
    document.querySelector('#player'),
    'video-mode_',
  );
}

function handleVolume(cb) {
  newAttributeObserver(
    (e) => cb('volume', Number.parseInt(e.target.getAttribute('value'), 10)),
    document.querySelector('#volume-slider'),
    'value',
  );
}

function handleTitle(cb) {
  newContentObserver(
    (e) => cb('title', e.target.textContent),
    document.querySelector('.title.ytmusic-player-bar'),
  );
}

function handleDuration(cb) {
  newAttributeObserver(
    (e) => {
      const newValue = e.target.getAttribute('aria-valuemax');
      if (newValue !== e.oldValue) {
        cb('duration', Number.parseInt(newValue, 10));
      }
    },
    document.querySelector('#progress-bar'),
    'aria-valuemax',
  );
}

function handlePosition(cb) {
  newAttributeObserver(
    (e) => {
      const newValue = e.target.getAttribute('aria-valuenow');
      if (newValue !== e.oldValue) {
        cb('position', Number.parseInt(newValue, 10));
      }
    },
    document.querySelector('#progress-bar'),
    'aria-valuenow',
  );
}

function handleLikeStatus(cb) {
  newAttributeObserver(
    (e) => cb('likeStatus', e.target.getAttribute('like-status')),
    document.querySelector('#like-button-renderer'),
    'like-status',
  );
}

function handleLoopType(cb) {
  newAttributeObserver(
    (e) => cb('loopType', e.target.getAttribute('repeat-mode_')),
    document.querySelector('ytmusic-player-bar'),
    'repeat-mode_',
  );
}

function handleUrl(cb) {
  newAttributeObserver(
    (e) => {
      const newValue = e.target.getAttribute('href');
      if (newValue !== e.oldValue) {
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
