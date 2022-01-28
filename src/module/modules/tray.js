const { Tray, Menu } = require('electron');
const path = require('path');

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
}

module.exports = {
  name: 'Tray',
  load,
};
