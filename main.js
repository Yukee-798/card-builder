const {
    BrowserWindow,
    app,
    ipcMain
} = require('electron');
const isDev = require('electron-is-dev');
const pfs = require('fs').promises;
const {
    join
} = require('path')
const fs = require('fs')

const fileHelper = {
    readFile: (path) => {
        return pfs.readFile(path);
    },
    writeFile: (path, content) => {
        return pfs.writeFile(path, content);
    },
    renameFile: (path, newPath) => {
        return pfs.rename(path, newPath);
    },
    deleteFile: (path) => {
        return pfs.unlink(path);
    }
};

const DESKTOP_PATH = app.getPath('desktop');

app.on('ready', () => {

    let mainWindow = new BrowserWindow({
        width: 510,
        height: 413,
        minWidth: 510,
        maxWidth: 510,
        minHeight: 413,
        maxHeight: 413,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false
        }
    });

    ipcMain.on('create', (event, imgName) => {
        mainWindow.webContents.capturePage({x: 53, y: 65, width: 404, height: 255}).then(img => {
            fileHelper.writeFile(join(DESKTOP_PATH, `${imgName}.png`), img.toPNG()).then(
                () => {
                    event.reply('create_done', imgName);
                },
                (err) => {
                    console.log(err);
                }
            )
        })
    });

    const urlLocation = isDev ? 'http://localhost:3000' : `file://${join(__dirname, './build/index.html')}`;
    mainWindow.loadURL(urlLocation);

});