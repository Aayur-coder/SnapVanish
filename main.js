const { app, Tray , Menu , globalShortcut, clipboard , nativeImage,BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const screenshot = require('screenshot-desktop');
let tray ;
//hello
async function takeScreenshot() {
  const img = await screenshot({ format: 'png' });

  const image = nativeImage.createFromBuffer(img);
  clipboard.writeImage(image);

  console.log("Copied to clipboard ✅");
}

app.whenReady().then(() => {
console.log("Snapvainshrunning")
tray = new Tray(path.join(__dirname, 'icon.png'))

    const contextMenu = Menu.buildFromTemplate([
    { label: 'Take Screenshot', click: () => takeScreenshot() },
    { label: 'Quit', click: () => app.quit() }
  ]);

  tray.setToolTip('SnapVanish');
  tray.setContextMenu(contextMenu);

  globalShortcut.register('CommandOrControl+Alt+X', () => {
  console.log("Shortcut pressed 🚀");
  takeScreenshot();
  createUI() ;
});

});

app.on('window-all-closed', (e) => {
  e.preventDefault();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});


function createUI() {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
    
  });

win.loadFile(path.join(__dirname, 'ui', 'index.html'));
}



ipcMain.on('capture-full', () => {
  takeScreenshot();
});

ipcMain.on('capture-area', () => {
  console.log("Area selection clicked");
});

ipcMain.on('quit-app', () => {
  app.quit();
});