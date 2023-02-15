const getSettings = async () => {
  const settings = await window.__electron_preload__api.getSettings();
  return settings;
};

export default getSettings;
