import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  // Cargar la aplicación de React (en desarrollo apuntar a localhost)
  // En producción se cargará el build de la app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`file://${path.join(__dirname, '../index.html')}`);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../index.html')}`);
  }
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
