const { listenToChanges } = require('./listener');

// Getters
function isPlaying() {
  return document.querySelector('.byline.ytmusic-player-bar') !== null;
}

function isPaused() {
  return document.querySelector('video').paused;
}

function isVideo() {
  return document.querySelector('#player').hasAttribute('video-mode_');
}

function getVolume() {
  return Number.parseInt(document.querySelector('#volume-slider').getAttribute('value'), 10);
}

function getTitle() {
  return document.querySelector('.title.ytmusic-player-bar').textContent;
}

function getDuration() {
  return Number.parseInt(document.querySelector('#progress-bar').getAttribute('aria-valuemax'), 10);
}

function getPosition() {
  return document.querySelector('#progress-bar').getAttribute('aria-valuenow');
}

function getUrl() {
  return document.querySelector('.ytp-title-link.yt-uix-sessionlink').href;
}

// TODO: enum?
function getLoopType() {
  return document.querySelector('ytmusic-player-bar').getAttribute('repeat-mode_');
}

function getCoverUrl() {
  const coverUrl = document.querySelector('.thumbnail.ytmusic-player.no-transition>.yt-img-shadow').src;

  if (!coverUrl.includes('data:image')) return coverUrl;

  // for videos, the cover is a base64, so we get from a different element

  const thumbnail = document.querySelector('.image.ytmusic-player-bar').src;
  // for some reason, thats the value on start up
  if (thumbnail === 'https://music.youtube.com/') return undefined;
  return thumbnail;
}

function getAlbumName() {
  const strings = document.querySelectorAll(
    '.subtitle.ytmusic-player-bar>yt-formatted-string>.yt-formatted-string',
  );
  return strings[strings.length - 3]?.textContent;
}

function getAuthor() {
  return document.querySelectorAll(
    '.subtitle.ytmusic-player-bar>yt-formatted-string>.yt-formatted-string',
  )[0]?.textContent;
}

// TODO: enum?
function getLikeStatus() {
  return document.querySelector('#like-button-renderer').getAttribute('like-status');
}

// Setters
function setVolume(vol) {
  const slider = document.querySelector('#volume-slider');
  slider.setAttribute('value', vol);
  slider.dispatchEvent(new Event('change'));
}

function setSeekbarPosition(positionInSeconds) {
  const slider = document.querySelectorAll('.bar-container .tp-yt-paper-slider')[2];
  const sliderKnob = document.querySelectorAll('#progress-bar')[0];
  slider.click();
  sliderKnob.setAttribute('value', positionInSeconds);
}

let listening = false;

function getFullState() {
  const state = {
    isPlaying: isPlaying(),
    isPaused: isPaused(),
    isVideo: isVideo(),
    volume: getVolume(),
    title: getTitle(),
    author: getAuthor(),
    duration: getDuration(),
    position: getPosition(),
    url: getUrl(),
    loopType: getLoopType(),
    coverUrl: getCoverUrl(),
    albumName: getAlbumName(),
    likeStatus: getLikeStatus(),
  };
  if (!listening) {
    listenToChanges();
    listening = true;
  }
  return state;
}

module.exports = {
  isPlaying,
  isPaused,
  isVideo,
  getVolume,
  getTitle,
  getAuthor,
  getDuration,
  getPosition,
  getUrl,
  getLoopType,
  getCoverUrl,
  getAlbumName,
  getLikeStatus,
  setSeekbarPosition,
  setVolume,
  getFullState,
};
