const { app, BrowserWindow } = require('electron');
const path = require('path');
let win;
const isMac = process.platform === 'darwin';
const isProd = process.env.NODE_ENV === 'production';

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  if (!isProd) {
    win.webContents.openDevTools();
  }
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  // Open a window if none are open (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit the app when all windows are closed (Windows & Linux)
app.on('window-all-closed', () => {
  if (isMac) app.quit();
});
