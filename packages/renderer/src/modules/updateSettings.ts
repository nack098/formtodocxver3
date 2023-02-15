const updateSettings = async (data: string[]) => {
  await window.__electron_preload__api.updateSettings(data);
};

export default updateSettings;
