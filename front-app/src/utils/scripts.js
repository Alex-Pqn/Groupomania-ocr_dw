const localUrl = "http://localhost:3000/";
const status = require("@/utils/status_config");

// DISPLAY PROFILE POPUP (mainNav)
export function displayProfilePopup(DOMContainer) {
  const profilePopupContainer = document.getElementById(DOMContainer);
  if (profilePopupContainer.style.display == "flex") {
    profilePopupContainer.style.display = "none";
  } else {
    profilePopupContainer.style.display = "flex";
  }
}

// DATE FORMATTING
export function dateFormatting(object, formatedDate) {
  const monthNames = [
    "janv",
    "févr",
    "mars",
    "avr",
    "mai",
    "juin",
    "juill",
    "août",
    "sept",
    "oct",
    "nov",
    "déc"
  ];

  let date = new Date(object.created_at);

  // current date
  let date_currentYear = new Date().getFullYear();
  let date_currentMonth = new Date().getMonth();
  let date_currentDay = new Date().getDate();

  // object date
  let created_at_date = object.created_at
    .split("T")[0]
    .split("-")
    .reverse();
  let created_at_date_day = created_at_date[0];
  let created_at_date_month = monthNames[date.getMonth()];
  let created_at_date_year = created_at_date[2];

  // object time
  let created_at_time = object.created_at
    .split("T")[1]
    .split(".")[0]
    .split(":");
  let created_at_time_hour = parseInt(created_at_time[0], 10) + 2;
  let created_at_time_minute = created_at_time[1];

  // return formatted date
  if (
    date_currentDay == created_at_date_day &&
    date_currentMonth == date.getMonth() &&
    date_currentYear == created_at_date_year
  ) {
    formatedDate(`${created_at_time_hour}h${created_at_time_minute}`);
  } else if (created_at_date_year == date_currentYear) {
    formatedDate(`${created_at_date_day} ${created_at_date_month}.`);
  } else {
    formatedDate(
      `${created_at_date_day} ${created_at_date_month}. ${created_at_date_year}`
    );
  }
}

// API CALL WITH AUTH
export function api(
  urlAPI,
  method,
  data,
  apiCallbackDone,
  apiCallbackError,
  xhrCallbackError
) {
  let cookie = document.cookie.split(";");

  // if no token exists
  if (cookie.length < 2) {
    if (urlAPI !== "api/user/page/auth") {
      window.location.replace("/login");
    }
  }
  // if token exists
  else {
    let cookieUserId;
    let cookieUserToken;

    // cookies
    cookie.forEach(cookieValue => {
      // user id
      if (cookieValue.includes("user_id")) {
        cookieUserId = cookieValue.replace("user_id=", "");
      }
      // auth token
      else if (cookieValue.includes("auth_token")) {
        cookieUserToken = cookieValue.replace("auth_token=", "");
      }
    });

    // API REQUEST
    let xhr = new XMLHttpRequest();
    xhr.open(method, localUrl + urlAPI, true);
    xhr.setRequestHeader("Authorization", "Bearer " + cookieUserToken);
    xhr.setRequestHeader("UserId", cookieUserId);

    // if "api/comments/create" || "api/comments/get" route, define application/json header
    if (
      urlAPI == "api/comments/create" ||
      urlAPI == "api/comments/get" ||
      urlAPI == "api/profile/get" ||
      urlAPI == "api/user/account/primaryInfos" ||
      urlAPI == "api/user/parameters/get" ||
      urlAPI == "api/mod/comment/delete" ||
      urlAPI == "api/mod/forum/delete"
    ) {
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(data));
    }
    // send formdata without header
    else {
      xhr.send(data);
    }

    // XHR ERROR
    xhr.onerror = function() {
      xhrCallbackError(
        `Une erreur est survenue lors de la communication avec l'API. Vérifiez l'état de vote connexion internet et réessayez.`
      );
      console.error("XHR Request Error: Please retry later");
    };

    // API CALLBACK
    xhr.onreadystatechange = function() {
      let response = this.response;
      let readyState = this.readyState;
      let httpStatus = this.status;

      // DONE & OK
      if (
        readyState === status.readystate.DONE &&
        httpStatus === status.http.OK
      ) {
        apiCallbackDone(JSON.parse(response));
      }
      // ERRORS HANDLER
      else if (
        httpStatus === status.http.UNAUTHORIZED ||
        httpStatus === status.http.INTERNAL_SERVER_ERROR ||
        httpStatus === status.http.BAD_REQUEST
      ) {
        apiCallbackError(JSON.parse(response), readyState, httpStatus);
        if (response.err && response.err.sqlMessage) {
          mysqlErrorHandler(response.err);
        }
      }
    };
  }
}

// API CALL WITHOUT AUTH
export function apiAuth(
  urlAPI,
  method,
  data,
  apiCallbackDone,
  apiCallbackError,
  xhrCallbackError
) {
  // api request
  let xhr = new XMLHttpRequest();
  xhr.open(method, localUrl + urlAPI, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(data);
  xhr.onerror = function() {
    xhrCallbackError(
      `Une erreur est survenue lors de la communication avec l'API. Vérifiez l'état de vote connexion internet et réessayez.`
    );
    console.error("XHR Request Error: Please retry later");
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
      apiCallbackDone(response);
    }
    // ERRORS HANDLER
    else if (
      httpStatus === status.http.UNAUTHORIZED ||
      httpStatus === status.http.INTERNAL_SERVER_ERROR ||
      httpStatus === status.http.BAD_REQUEST
    ) {
      apiCallbackError(response, readyState, httpStatus);
      if (response.err && response.err.sqlMessage) {
        mysqlErrorHandler(response.err);
      }
    }
  };
}

// MYSQL ERROR HANDLER
export function mysqlErrorHandler(err) {
  console.error(
    `SQL ERROR: ${err.sqlMessage || err.message} ; Code: ${err.code} : ${
      err.errno
    } ; fatal?${err.fatal} ; SQLState: ${err.sqlState}`
  );
}

// CREATE USER COOKIE
export function createUserCookie(response) {
  let actualDate = new Date();

  // expires date
  const dateMultiplicator = actualDate.setMonth(actualDate.getMonth() + 1);
  let cookieExpireDate = new Date(dateMultiplicator).toUTCString();

  // set cookies
  document.cookie = `user_id=${response.userId};expires=${cookieExpireDate};path=/`;
  document.cookie = `auth_token=${response.token};expires=${cookieExpireDate};path=/`;
}
