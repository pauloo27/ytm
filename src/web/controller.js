// Getters
function getVolume() {
  return document.querySelector('#volume-slider').getAttribute('value');
}

function isPaused() {
  return document.querySelector('video').paused;
}

function isVideo() {
  return document.querySelector('#player').hasAttribute('video-mode_');
}

function getTitle() {
  return document.querySelector('.title.ytmusic-player-bar').textContent;
}

function getDuration() {
  return document.querySelector('#progress-bar').getAttribute('aria-valuemax');
}

function getSeekbarPosition() {
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
  const playerBar = document.getElementsByClassName('byline ytmusic-player-bar')[0].children;
  const playerBarArr = Array.from(playerBar);

  let album;
  playerBarArr.forEach((data) => {
    if (data.getAttribute('href') != null && data.getAttribute('href').includes('browse')) {
      album = data.innerText;
    }
  });

  return album;
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

module.exports = {
  setVolume,
  getVolume,
  isPaused,
  isVideo,
  getTitle,
  getDuration,
  getSeekbarPosition,
  getUrl,
  getLoopType,
  getCover,
  getAlbumName,
  getLikeStatus,
  setSeekbarPosition,
};
