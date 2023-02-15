const getSheetData = async (data: any) => {
  const sheetData = await window.__electron_preload__api.getSheetData(data);
  return sheetData;
};

export default getSheetData;
