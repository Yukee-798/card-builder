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


const CACHE_PATH_ROOT = join(app.getAppPath(), 'public/cache')


// export const ASSETS_PATH = join(app.getAppPath(), 'src/assets');

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

            /** 如果传入的 file 存在 picList 则不进行文件写入 */
            if (!picList.map((item) => (item.name)).includes(file.name))
                fileHelper.writeFile(join(CACHE_PATH_ROOT, file.name), await fileHelper.readFile(file.path));

            // 回复给渲染进程数据
            event.reply('fs', '拷贝文件成功！')

        } catch (err) {
            console.log(err);
        }

    })


    const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl';
    mainWindow.loadURL(urlLocation);

});