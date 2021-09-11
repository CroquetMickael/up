const { contextBridge, shell } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  openExternal: (value) => shell.openExternal(value),
});
