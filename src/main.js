const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    // TODO find out whats the cool resolution with the cool kids
    width: 800,
    height: 600,
  });

  win.setMenuBarVisibility(false);
  win.loadURL('https://music.youtube.com');
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
