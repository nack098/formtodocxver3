export default async function () {
  const folder = await window.__electron_preload__api.getFolder();
  return folder;
}
