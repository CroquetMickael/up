const electron = require("electron");
const { ipcMain, Menu, Tray, Notification } = require("electron");
const chokidar = require("chokidar");
const fs = require("fs");

let watcher = null;

// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
var AutoLaunch = require("auto-launch");
var autoLauncher = new AutoLaunch({
  name: "up",
});

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;
let notificationSent = false;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    width: 800,
    height: 600,
    frame: false,
    title: "Up",
    icon: __dirname + "/logo192.png",
    webPreferences: {
      webSecurity: false,
      preload: __dirname + "/preload.js",
    },
  });

  // and load the index.html of the app.

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/index.html"),
      protocol: "file:",
      slashes: true,
    });
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  if (!app.isPackaged && process.env.ELECTRON_START_URL) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  ipcMain.on("maximize-me", function () {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("minimize-me", function () {
    mainWindow.minimize();
  });

  ipcMain.on("close-me", function () {
    if (!notificationSent) {
      new Notification({
        title: "Up",
        body: "Up is hidden, close it from tray icons",
      }).show();
      notificationSent = true;
    }
    mainWindow.hide();
  });

  ipcMain.on("autoUpload", function (event, arg) {
    watcher = chokidar.watch(arg, {
      ignored: /[\/\\]\./,
      persistent: true,
      awaitWriteFinish: true,
    });

    function onWatcherReady() {
      watcher.on("add", function (filePath) {
        try {
          const data = fs.readFileSync(filePath);
          const fileName = path.basename(filePath);
          if (fileName.includes(".replay")) {
            event.reply("fileFound", {
              fileName,
              file: data,
            });
          }
        } catch (err) {
          console.error(err);
        }
      });
    }

    // Declare the listeners of the watcher
    watcher.on("ready", onWatcherReady).on("error", function (error) {
      console.log("Error happened", error);
    });
  });

  ipcMain.on("autoLaunch", async function (event, arg) {
    if (arg) {
      await autoLauncher.enable();
    } else {
      await autoLauncher.disable();
    }
  });

  ipcMain.on("stopAutoUpload", async function () {
    if (watcher) {
      await watcher.close();
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  if (!app.isPackaged && process.env.ELECTRON_START_URL) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }

  tray = new Tray(__dirname + "/logo192.png");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: function () {
        mainWindow.show();
      },
    },
    {
      label: "Quit",
      click: function () {
        app.isQuiting = true;
        mainWindow.destroy();
        app.quit();
      },
    },
  ]);
  tray.setToolTip("Up");
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    mainWindow.show();
  });
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
