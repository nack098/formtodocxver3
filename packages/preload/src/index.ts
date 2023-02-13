// @ts-ignore
/**
 * @module preload
 */

import {ipcRenderer, contextBridge} from 'electron';

const WINDOW_API = {
  openFile: () => ipcRenderer.invoke('openFile'),
  updateSettings: (newData: string[]) => ipcRenderer.invoke('updateSettings', newData),
  getSheetList: (cerdPath: object) => ipcRenderer.invoke('getSheetList', cerdPath),
  getSheetData: (data: object) => ipcRenderer.invoke('getSheetData', data),
  getSettings: () => ipcRenderer.invoke('getSettings'),
  getFolder: () => ipcRenderer.invoke('getFolder'),
  dataToDocx: (value: object) => ipcRenderer.invoke('dataToDocx', value),
};

contextBridge.exposeInMainWorld('api', WINDOW_API);

export {sha256sum} from './nodeCrypto';
export {versions} from './versions';
