const path = require('path');
const { app, BrowserWindow } = require('electron');
const { modulesList } = require('./module/loader');
const server = require('./core/server/server');

const { wss } = server.start();

wss.on('connection', (socket) => {
  modulesList.forEach((m) => !m.postLoad || m.postLoad(socket));
});

modulesList.forEach((m) => !m.preLoad || m.preLoad());

function createWindow() {
  const win = new BrowserWindow({
    // TODO find out whats the cool resolution with the cool kids
    width: 800,
    height: 600,
    closable: true,
    center: true,
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

  win.webContents.on('will-prevent-unload', (event) => {
    event.preventDefault();
  });
  win.setMenuBarVisibility(false);
  win.loadURL('https://music.youtube.com');
  modulesList.forEach((m) => !m.load || m.load(win));
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
  if (process.platform === 'darwin') return;
  app.quit();
});
