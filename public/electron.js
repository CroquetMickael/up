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
const { autoUpdater } = require("electron-updater");
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

let splash;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    width: 800,
    height: 600,
    frame: false,
    title: "Up",
    show: false,
    icon: __dirname + "/logo192.png",
    webPreferences: {
      webSecurity: false,
      preload: __dirname + "/preload.js",
      devTools: app.isPackaged ? false : true,
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

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.once("ready-to-show", () => {
    splash.destroy();
    mainWindow.show();
  });

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
      awaitWriteFinish: {
        pollInterval: 100,
        stabilityThreshold: 5000,
      },
    });

    function onWatcherReady() {
      watcher.on("add", function (filePath) {
        try {
          const data = fs.readFileSync(filePath);
          const fileName = path.basename(filePath);
          if (fileName.includes(".replay")) {
            event.reply("fileFound", {
              fileName,
              file: data.buffer,
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
const createSplashScreen = () => {
  /// create a browser window
  splash = new BrowserWindow({
    /// define width and height for the window
    width: 500,
    height: 500,
    /// remove the window frame, so it will become a frameless window
    frame: false,
    /// and set the transparency, to remove any window background color
    alwaysOnTop: true,
    transparent: false,
    resizable: false,
    webPreferences: {
      devTools: false,
      preload: __dirname + "/preload.js",
    },
  });

  function sendStatusToWindow(object) {
    splash.webContents.send("message", object);
  }

  splash.loadURL("file://" + __dirname + "/splash/splash.html");
  splash.on("closed", () => (splash = null));
  splash.webContents.on("did-finish-load", () => {
    splash.show();
    autoUpdater.checkForUpdates();

    autoUpdater.on("checking-for-update", () => {
      sendStatusToWindow({
        type: "checking",
      });
    });
    autoUpdater.on("update-available", (info) => {
      sendStatusToWindow({
        type: "update",
      });
    });
    autoUpdater.on("update-not-available", (info) => {
      setTimeout(function () {
        createWindow();
      }, 3000);
    });
    autoUpdater.on("error", (err) => {
      sendStatusToWindow({
        type: "error",
        information: err,
      });
      setTimeout(function () {
        createWindow();
      }, 3000);
    });
    autoUpdater.on("download-progress", (progressObj) => {
      sendStatusToWindow({
        type: "progress",
        information: progressObj.percent,
      });
    });
    autoUpdater.on("update-downloaded", (info) => {
      sendStatusToWindow({
        type: "downloaded",
      });
      setTimeout(function () {
        autoUpdater.quitAndInstall();
      }, 3000);
    });
  });
};

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
  createSplashScreen();
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
