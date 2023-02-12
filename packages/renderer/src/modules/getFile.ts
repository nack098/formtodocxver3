export default async function getFile() {
  const res = await window.api.openFile();
  if (!res.canceled) {
    return res.filePaths;
  } else {
    return;
  }
}
