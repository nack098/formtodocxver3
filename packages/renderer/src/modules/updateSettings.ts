const updateSettings = async (data: string[]) => {
  await window.api.updateSettings(data);
};

export default updateSettings;
