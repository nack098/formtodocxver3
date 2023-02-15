export default async function getFile() {
  const res = await window.__electron_preload__api.openFile();
  if (!res.canceled) {
    return res.filePaths;
  } else {
    return;
  }
}
