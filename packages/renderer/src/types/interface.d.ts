export declare global {
  interface Data {
    name?: string;
    id?: string;
  }
  interface Window {
    __electron_preload__api: {
      getFolder: () => Promise<string>;
      updateSettings: (data: string[]) => void;
      getCerdData: () => Promise<object>;
      getSheetList: (data: string) => Promise<Data[]>;
      getSheetData: ({id: string, cerdPath: string}) => Promise<object[]>;
      getSettings: () => Promise<string[]>;
      openFile: () => Promise<{
        canceled: boolean;
        filePaths: string[];
      }>;
      dataToDocx: (value: object) => none;
    };
  }
}
