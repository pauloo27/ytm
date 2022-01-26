// Getters
function isPlaying() {
  return document.getElementsByClassName('byline ytmusic-player-bar').length !== 0;
}

function isPaused() {
  return document.querySelector('video').paused;
}

function isVideo() {
  return document.querySelector('#player').hasAttribute('video-mode_');
}

function getVolume() {
  return document.querySelector('#volume-slider').getAttribute('value');
}

function getTitle() {
  return document.querySelector('.title.ytmusic-player-bar').textContent;
}

function getDuration() {
  return document.querySelector('#progress-bar').getAttribute('aria-valuemax');
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

function getCover() {
  const thumbnail = document.querySelector('.thumbnail.ytmusic-player.no-transition');
  const image = thumbnail.querySelector('.yt-img-shadow').src;

  if (image.includes('data:image')) return document.querySelector('.image.ytmusic-player-bar').src;

  return image;
}

function getAlbumName() {
  if (!isPlaying()) return undefined;
  const playerBar = document.getElementsByClassName('byline ytmusic-player-bar')[0].children;
  const playerBarArr = Array.from(playerBar);

  const d = playerBarArr.find((data) => data.hasAttribute('href') && data.getAttribute('href').includes('browse'));
  return d.innerText;
}

function getAuthor() {
  const bar = document.getElementsByClassName('subtitle ytmusic-player-bar')[0];

  if (bar.getElementsByClassName('yt-simple-endpoint yt-formatted-string')[0]) {
    return bar.getElementsByClassName('yt-simple-endpoint yt-formatted-string')[0].textContent;
  }

  if (bar.getElementsByClassName('byline ytmusic-player-bar')[0]) {
    return bar.getElementsByClassName('byline ytmusic-player-bar')[0].textContent;
  }
  return undefined;
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

function getFullState() {
  return {
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
    cover: getCover(),
    albumName: getAlbumName(),
    likeStatus: getLikeStatus(),
  };
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
  getCover,
  getAlbumName,
  getLikeStatus,
  setSeekbarPosition,
  setVolume,
  getFullState,
};
