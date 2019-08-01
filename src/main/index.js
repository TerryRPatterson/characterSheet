import {format, pathToFileURL} from 'url';
import {BrowserWindow, dialog, app} from 'electron';
import {join, basename} from 'path';

import isDev from 'electron-is-dev';
import settings from 'electron-settings';

import createIPCEndpoint from '@/remote-main';

app.on('ready', () => startApp(app));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

let url;
async function startApp(app) {
    await setupListenters(app);
    await createWindow();
}

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        show: false,
    });

    if (isDev) {
        url = format({
            hostname: 'localhost',
            port: '9000',
            protocol: 'http',
            slashes: true,
        });
    } else {
        url = pathToFileURL('index.html');
    }

    // and load the index.html of the app.
    win.loadURL(url);

    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools();
    }

    win.webContents.on('did-fail-load', ({errorCode}) => {
        // if the dev server is not ready yet try again
        if (errorCode === -102) {
            setTimeout(() => win.loadURL(url), 500);
        }
    });
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    win.on('ready-to-show', () => win.show());
}

function setupListenters(app) {
    app.on('window-all-closed', () => {
        app.quit();
    });
}

process.on('unhandledRejection', (reason) => {
    // eslint-disable-next-line no-debugger
    debugger;
    // eslint-disable-next-line no-console
    console.error(reason);
});


process.on('SIGUSR2', () => app.quit());
