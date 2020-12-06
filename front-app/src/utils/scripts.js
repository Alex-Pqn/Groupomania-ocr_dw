function getImgUrl (img) {
  if (img !== "") {
    return require(`@/assets/` + img)
  }
}

export { getImgUrl };