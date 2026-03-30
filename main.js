const { app, Tray , Menu , globalShortcut} = require('electron');
const path = require('path');
const screenshot = require('screenshot-desktop');
let tray ;
const fs = require('fs');
const os = require('os');

async function takeScreenshot() {
  const img = await screenshot({ format: 'png' });
  console.log("Screenshot captured ✅");
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
});

});

app.on('window-all-closed', (e) => {
  e.preventDefault();
});