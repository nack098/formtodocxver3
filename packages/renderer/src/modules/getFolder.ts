export default async function () {
  const folder = await window.api.getFolder();
  return folder;
}
