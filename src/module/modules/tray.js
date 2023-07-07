const { Tray, Menu } = require('electron');
const { app } = require('electron');
const path = require('path');

let isAppQuitting = false;

function onToggleVisibility(win) {
  if (win.isVisible()) win.hide();
  else win.show();
}

function load(win) {
  const tray = new Tray(path.join(__dirname, '..', '..', 'assets', 'logo.png'));
  const menu = Menu.buildFromTemplate([
    { label: 'Show/Hide window', type: 'normal', click: (e) => onToggleVisibility(win, tray, e) },
    { label: 'Quit', type: 'normal', role: 'quit' },
  ]);
  tray.setContextMenu(menu);

  tray.on('click', () => onToggleVisibility(win, tray));

  app.on('before-quit', () => {
    isAppQuitting = true;
    tray.destroy();
  });

  win.on('close', (e) => {
    if (isAppQuitting) return;
    e.preventDefault();
    win.hide();
  });
}

module.exports = {
  name: 'Tray',
  load,
};
