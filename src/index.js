'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const Menu = electron.Menu;
const menu = require('./main/menu');

var windows = new Map();

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    Menu.setApplicationMenu(menu);
});

exports.openImage = function(url) {
    if (windows.has(url)) {
        windows.get(url).focus();
    } else {
        const window = new BrowserWindow(/*{width: 800, height: 600}*/);
        windows.set(url, window);
        window.loadURL(`file://${__dirname}/html/editor.html?image=${encodeURIComponent(url)}`);
        window.on('closed', function() {
            windows.delete(window);
        });
    }
};
