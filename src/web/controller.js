function setVolume(vol) {
  const slider = document.querySelector('#volume-slider');
  slider.setAttribute('value', vol);
  slider.dispatchEvent(new Event('change'));
}

module.exports = {
  setVolume,
};
