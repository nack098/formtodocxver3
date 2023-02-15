export default async function dataToDocx(value: object) {
  await window.__electron_preload__api.dataToDocx(value);
}
