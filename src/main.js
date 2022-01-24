const path = require('path');
const { app, BrowserWindow } = require('electron');
const { listModules } = require('./module/loader');
const server = require('./core/server/server');

const modules = listModules();

server.start();

function createWindow() {
  const win = new BrowserWindow({
    // TODO find out whats the cool resolution with the cool kids
    width: 800,
    height: 600,
    webPreferences: {
      // some nice options =)
      webSecurity: true,
      nodeIntegration: false,
      allowRunningInsecureContent: false,
      contextIsolation: true,

      // preload the main script file, which loads all the rest
      preload: path.join(__dirname, 'web', 'main.js'),
    },
  });

  win.setMenuBarVisibility(false);
  win.loadURL('https://music.youtube.com');
  modules.forEach(async (m) => m.load(win));
}

app.whenReady().then(() => {
  createWindow();

  // someshit with macos lol
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
