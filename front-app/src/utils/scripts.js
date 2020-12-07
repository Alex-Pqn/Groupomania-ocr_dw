function getImgUrl (img) {
  if (img !== "") {
    return require(`@/assets/` + img)
  }
}

function displayProfilePopup (DOMContainer) {
  const profilePopupContainer = document.getElementById(DOMContainer)
  if (profilePopupContainer.style.display == "flex") {
    profilePopupContainer.style.display = "none"
  } else{
    profilePopupContainer.style.display = "flex"
  }
}

export { getImgUrl, displayProfilePopup };