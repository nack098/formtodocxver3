import {ipcMain, dialog} from 'electron';
import store from '../store/store';
import {google} from 'googleapis';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import fs from 'node:fs';
import path from 'node:path';
import {createReport} from 'docx-templates';

ipcMain.handle('openFile', async () => {
  const filePath = await dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});
  return filePath;
});

ipcMain.handle('updateSettings', async (event, args) => {
  store.set('keys', args);
});

ipcMain.handle('getSettings', async () => {
  return store.get('keys');
});

ipcMain.handle('getSheetList', async (event, args) => {
  const KEY_FILE = args;
  const client = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const auth = await client.getClient();
  const drive = google.drive({version: 'v3', auth: auth});
  const data = await drive.files.list();
  return data.data.files;
});

ipcMain.handle('dataToDocx', async (event, args) => {
  const dataArray = args.data;
  const outputPath = args.outputPath;
  const templatePath = args.path;

  const template = fs.readFileSync(templatePath);

  let count = 1;
  try {
    for (const data of dataArray) {
      const buffer = await createReport({
        template,
        data: data,
        cmdDelimiter: ['{#', '#}'],
      });

      fs.writeFileSync(`${path.join(outputPath, `data${count}.docx`)}`, buffer);
      count += 1;
    }
  } catch (error) {
    console.log(error);
  }
  await dialog.showMessageBox({message: 'success'});
});

ipcMain.handle('getFolder', async () => {
  const folder = await dialog.showOpenDialog({properties: ['openDirectory']});
  return folder;
});

ipcMain.handle('getSheetData', async (event, args) => {
  const KEY_FILE = args.cerdPath;
  const KEY: any = require(KEY_FILE);
  const SHEET_ID = args.id;
  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: KEY.client_email,
    private_key: KEY.private_key,
  });
  await doc.loadInfo();
  const worksheets = doc.sheetsByIndex;
  const worksheetsArray = [];
  for (const data of worksheets) {
    const rowArray = [];
    const sheetValue = await data.getRows();
    for (const row of sheetValue) {
      const header = Object.getOwnPropertyNames(row).filter(
        value => value !== '_sheet' && value !== '_rawData' && value !== '_rowNumber',
      );
      const rowValue = new Map(
        header.map(value => {
          if (row[value]) {
            return [value, row[value]];
          } else {
            return [value, ''];
          }
        }),
      );

      const rowObject = Object.fromEntries(rowValue);
      rowArray.push(rowObject);
    }
    const returnValue = {[data.title]: rowArray};
    worksheetsArray.push(returnValue);
  }
  return worksheetsArray;
});
