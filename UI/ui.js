const { ipcRenderer } = require('electron');

function capture() {
  ipcRenderer.send('capture-full');
}

function selectArea() {
  ipcRenderer.send('capture-area');
}

function quit() {
  ipcRenderer.send('quit-app');
}