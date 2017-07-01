const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// db
var mysql = require('mysql');

var conn = mysql.createConnection({

});

// hot reload
require('electron-reload')(__dirname);

let win; // global window obj

function createWindow() {

    // create browser window
    win = new BrowserWindow({
        width: 800,
        height: 480,
        frame: false,
        resizable: true
    });

    // load index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    //win.webContents.openDevTools();

    // emitted on window close
    win.on('closed', () => {

        // dereference window obj, deref relevent page if multiple
        win = null;
    });
}

// called when electron finishes init
app.on('ready', createWindow);