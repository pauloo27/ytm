const { app } = require('electron');
const path = require('path');
const fs = require('fs');

function load(win) {
  const appFolder = app.getPath('appData');
  const cssFile = path.join(appFolder, app.getName(), 'etc', 'style.css');
  if (!fs.existsSync(cssFile)) return;
  const css = fs.readFileSync(cssFile).toString();
  win.webContents.insertCSS(css);
}

module.exports = {
  name: 'Custom CSS',
  load,
};
