export function getImgUrl(img) {
  if (img !== "") {
    return require(`@/assets/` + img);
  }
}

export function displayProfilePopup(DOMContainer) {
  const profilePopupContainer = document.getElementById(DOMContainer);
  if (profilePopupContainer.style.display == "flex") {
    profilePopupContainer.style.display = "none";
  } else {
    profilePopupContainer.style.display = "flex";
  }
}

let apiResponse
let apiReadyState
let apiHttpStatus

export function api(urlAPI, method, formData) {
  const localUrl = "http://localhost:3000/";
  
  // token auth
  let cookie = document.cookie.split(";");
  if (cookie[0] === "" || cookie[1] === "" || cookie.length < 2) {
    console.error(
      "Le token d'authentification est incorrect ou a expiré. Veuillez vous reconnecter."
    );
  } else {
    let cookieUserId = cookie[0].replace("user_id=", "");
    let cookieUserToken = cookie[1].replace("auth_token=", "");

    // data to send
    let user = {
      id: cookieUserId
    };
    formData.append("user", JSON.stringify(user));
    
    // api request
    let xhr = new XMLHttpRequest();
    xhr.open(method, localUrl + urlAPI, true);
    xhr.setRequestHeader("Authorization", "Bearer " + cookieUserToken);
    xhr.send(formData);

    xhr.onerror = function() {
      console.error(
        `Une erreur est survenue lors de la communication avec l'API. Vérifiez l'état de vote connexion internet et réessayez.`
      )
    };
    xhr.onreadystatechange = function() {
      apiResponse = JSON.parse(this.response);
      apiReadyState = this.readyState;
      apiHttpStatus = this.status;
    };
  }
}

export function apiCallback () {
  return {
    apiResponse:apiResponse,
    apiReadyState:apiReadyState,
    apiHttpStatus:apiHttpStatus,
  }
}

export function errorHandler (err, sub_err, readyState, httpStatus) {
  if (err && err.sqlMessage) {
    console.error(
      `SQL ERROR: ${err.sqlMessage || err.message} ; Code: ${
        err.code
      } : ${err.errno} ; fatal?${
        err.fatal
      } ; SQLState: ${err.sqlState}`
    );
  } else if (err && sub_err) {
      console.error(
        `Error: ${err} : ${sub_err}`
      )
  } else {
    console.error(
      `Error: ${sub_err}`
    )
  }
  if (readyState || httpStatus) {
      console.error(
        `ReadyState: ${readyState}, HttpStatus: ${httpStatus}`
      )
  }
}