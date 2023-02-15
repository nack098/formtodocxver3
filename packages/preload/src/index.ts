// @ts-ignore
/**
 * @module preload
 */




export {sha256sum} from './nodeCrypto';
export {versions} from './versions';

import {ipcRenderer, contextBridge} from 'electron';

export const api = {
  openFile: () => ipcRenderer.invoke('openFile'),
  updateSettings: (newData: string[]) => ipcRenderer.invoke('updateSettings', newData),
  getSheetList: (cerdPath: object) => ipcRenderer.invoke('getSheetList', cerdPath),
  getSheetData: (data: object) => ipcRenderer.invoke('getSheetData', data),
  getSettings: () => ipcRenderer.invoke('getSettings'),
  getFolder: () => ipcRenderer.invoke('getFolder'),
  dataToDocx: (value: object) => ipcRenderer.invoke('dataToDocx', value),
};

