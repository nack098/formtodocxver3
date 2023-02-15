const getSheetList = async (cerdPath: string) => {
  const sheetList = await window.__electron_preload__api.getSheetList(cerdPath);
  return sheetList;
};

export default getSheetList;
