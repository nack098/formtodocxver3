const getSettings = async () => {
  const settings = await window.api.getSettings();
  return settings;
};

export default getSettings;
