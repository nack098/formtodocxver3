const getSheetData = async (data: any) => {
  const sheetData = await window.api.getSheetData(data);
  return sheetData;
};

export default getSheetData;
