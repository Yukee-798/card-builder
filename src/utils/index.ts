const pfs = window.require('fs').promises;

export const path = window.require('path');

export const fileHelper = {
    readFile: (path: string) => {
        return pfs.readFile(path, { encoding: 'utf8' }) as Promise<any>;
    },
    writeFile: (path: string, content: string) => {
        return pfs.writeFile(path, content, { encoding: 'utf8' }) as Promise<any>;
    },
    renameFile: (path: string, newPath: string) => {
        return pfs.rename(path, newPath) as Promise<any>;
    },
    deleteFile: (path: string) => {
        return pfs.unlink(path) as Promise<any>;
    }
};