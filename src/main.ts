/// <reference path="typings/github-electron/github-electron.d.ts" />
'use strict';
var log = require("electron-log");
log.transports.file.level = 'info';
import * as electron from 'electron';
import BrowserWindow = Electron.BrowserWindow;
var app = electron.app;
var ipc_main = electron.ipcMain;
var main_window: Electron.BrowserWindow;

function createMainWindow() {
    let screen = electron.screen;
    let screen_size = screen.getPrimaryDisplay().workAreaSize;
    main_window = new electron.BrowserWindow({
        width: screen_size.width,
        height: screen_size.height
    });
    main_window.loadURL('file://' + __dirname + '/index.html');
    main_window.on('closed', function () {
        main_window = null;
    });
    main_window.webContents.openDevTools();
}

app.on('ready', function() {
    log.info("start to create main window");
    createMainWindow();
});


app.on('window-all-closed', function () {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if(main_window === null) {
        createMainWindow();
    }
});