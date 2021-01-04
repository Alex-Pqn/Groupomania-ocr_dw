const localUrl = "http://localhost:3000/";
const status = require("@/utils/status_config");

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

export function api(urlAPI, method, data, tokenRequired, apiCallbackDone, apiCallbackError, xhrCallbackError) {
  // token required, api request with authorization header
  if(tokenRequired) {
    // token auth
    let cookie = document.cookie.split(";");
    // if no token exists
    if (cookie[0] === "" || cookie[1] === "" || cookie.length < 2) {
      if(urlAPI !== "api/user/page/auth"){
        window.location.replace("/login");
      }
    }
    // if token exists
    else {
      let cookieUserId = cookie[0].replace("user_id=", "");
      let cookieUserToken = cookie[1].replace("auth_token=", "");

      // data to send
      let user = {
        id: cookieUserId
      };
      data.append("user", JSON.stringify(user)); 
      
      // api request
      let xhr = new XMLHttpRequest();
      xhr.open(method, localUrl + urlAPI, true);
      xhr.setRequestHeader("Authorization", "Bearer " + cookieUserToken);
      xhr.send(data);
      
      xhr.onerror = function() {
        xhrCallbackError(`Une erreur est survenue lors de la communication avec l'API. Vérifiez l'état de vote connexion internet et réessayez.`)
        console.error('XHR Request Error: Please retry later')
      };
      xhr.onreadystatechange = function() {
        let response = JSON.parse(this.response);
        let readyState = this.readyState;
        let httpStatus = this.status;
        
        // DONE & OK
        if (
          readyState === status.readystate.DONE &&
          httpStatus === status.http.OK
        ) {
          apiCallbackDone(response)
        } 
        // ERRORS HANDLER
        else if (
          httpStatus === status.http.UNAUTHORIZED ||
          httpStatus === status.http.INTERNAL_SERVER_ERROR ||
          httpStatus === status.http.BAD_REQUEST
        ) {
          apiCallbackError(response, readyState, httpStatus)
          if(response.err && response.err.sqlMessage) {
            mysqlErrorHandler(response.err) 
          }
        }
      };
    } 
  }else{
    // api request
    let xhr = new XMLHttpRequest();
    xhr.open(method, localUrl + urlAPI, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
    xhr.onerror = function() {
      xhrCallbackError(`Une erreur est survenue lors de la communication avec l'API. Vérifiez l'état de vote connexion internet et réessayez.`)
      console.error('XHR Request Error: Please retry later')
    };
    xhr.onreadystatechange = function() {
      let response = JSON.parse(this.response);
      let readyState = this.readyState;
      let httpStatus = this.status;
      
      // DONE & OK
      if (
        readyState === status.readystate.DONE &&
        httpStatus === status.http.OK
      ) {
        apiCallbackDone(response)
      } 
      // ERRORS HANDLER
      else if (
        httpStatus === status.http.UNAUTHORIZED ||
        httpStatus === status.http.INTERNAL_SERVER_ERROR ||
        httpStatus === status.http.BAD_REQUEST
      ) {
        apiCallbackError(response, readyState, httpStatus)
        if(response.err && response.err.sqlMessage) {
          mysqlErrorHandler(response.err) 
        }
      }
    };
  }
}

export function mysqlErrorHandler (err) {
  console.error(
    `SQL ERROR: ${err.sqlMessage || err.message} ; Code: ${
      err.code
    } : ${err.errno} ; fatal?${
      err.fatal
    } ; SQLState: ${err.sqlState}`
  );
}

export function createUserCookie (response) {
  let actualDate = new Date();
  const dateMultiplicator = actualDate.setMonth(
    actualDate.getMonth() + 1
  );
  
  let cookieExpireDate = new Date(dateMultiplicator).toUTCString();
  document.cookie = `user_id=${response.userId};expires=${cookieExpireDate};path=/`;
  document.cookie = `auth_token=${response.token};expires=${cookieExpireDate};path=/`;
}