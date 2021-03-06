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

const CACHE_PATH_ROOT = join(app.getPath('appData'), 'card-builder', 'uploadedPic')
const DESKTOP_PATH = app.getPath('desktop');

const makeDir = (path) => {
    fs.existsSync(path) ? void 0 : fs.mkdirSync(path)
}

app.on('ready', () => {

    makeDir(CACHE_PATH_ROOT);

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
        mainWindow.webContents.capturePage({
            x: 53,
            y: 65,
            width: 404,
            height: 255
        }).then(img => {
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

    ipcMain.on('remake', (event, picListJSON) => {

        const picList = JSON.parse(picListJSON);

        try {
            picList.forEach((item) => {
                fileHelper.deleteFile(join(CACHE_PATH_ROOT, item.name));
            })
        } catch (err) {
            console.log(err);
        }
    })

    ipcMain.on('cacheFile', async (event, objJSON) => {
        const {
            picList,
            file
        } = JSON.parse(objJSON);
        try {

            /** ??????????????? file ?????? picList ???????????????????????? */
            if (!picList.map((item) => (item.name)).includes(file.name))
                fileHelper.writeFile(join(CACHE_PATH_ROOT, file.name), await fileHelper.readFile(file.path));

        } catch (err) {
            console.log(err);
        }

    })


    const urlLocation = isDev ? 'http://localhost:3000' : `file://${join(__dirname, './build/index.html')}`;
    mainWindow.loadURL(urlLocation);

});