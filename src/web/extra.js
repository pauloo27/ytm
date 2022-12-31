const iconHtml = `<svg fill="#fff" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g mirror-in-rtl="" class="style-scope tp-yt-iron-icon"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" class="style-scope tp-yt-iron-icon"></path></g></svg>`;

// add a "go back" button to the top of the page
// since there's no browser back button
function appendGoBack() {
  const goBackBtn = document.createElement('button');

  goBackBtn.style.background = 'none';
  goBackBtn.style.border = 'none';
  goBackBtn.style.width = '56px';
  goBackBtn.style.height = '48px';
  goBackBtn.style.padding = '8px 16px';

  goBackBtn.innerHTML = iconHtml;
  goBackBtn.onclick = () => {
    window.history.back();
  };
  const container = document.querySelector('.left-content');
  container.style = 'display: flex; align-items: center;';
  container.insertBefore(goBackBtn, container.firstChild);
}

function loadExtras() {
  appendGoBack();
}

module.exports = {
  loadExtras,
};
