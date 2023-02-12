const getSheetList = async (cerdPath: string) => {
  const sheetList = await window.api.getSheetList(cerdPath);
  return sheetList;
};

export default getSheetList;
