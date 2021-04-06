const {
    BrowserWindow,
    app
} = require('electron');
const isDev = require('electron-is-dev');


app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 475,
        height: 613,
        minWidth: 475,
        maxWidth: 475,
        minHeight: 613,
        maxHeight: 613,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl';
    mainWindow.loadURL(urlLocation);

});