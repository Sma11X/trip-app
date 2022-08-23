export const getAssetURL = (image) => {
  // 相对路径, 当前路径的url
  return new URL(`../assets/img/${image}`, import.meta.url).href
}
