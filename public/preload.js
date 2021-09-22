const { contextBridge, shell, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  openExternal: (value) => shell.openExternal(value),
  ipcRenderer,
  on: (channel, callback) => ipcRenderer.on(channel, callback),
});
