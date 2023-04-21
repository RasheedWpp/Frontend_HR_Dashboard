export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_VALUE = 'SET_VALUE';
export const session_Token = "";


export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}
export const sessionToken = (value) => ({
  type: SET_VALUE,
  payload: value,
});

export const setData = (value) => ({
    type: SET_VALUE,
    payload: value,
  });

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('authenticated');
        dispatch(receiveLogout());
    };
}
export function uploadExcelData(cred) {
  return async (dispatch) => {
    console.log(cred)
  //   try {
  //     const response = await fetch("http://localhost:5000/upload", {
  //       method: "POST",
  //       body: JSON.stringify({ email: email }),
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });
  //     const data = await response.json();
  //     console.log(data.message);
  //     return Promise.resolve(1);
  //   } catch (error) {
  //     console.log(error);
  //     console.error('Error:', error);
  //     dispatch(loginError("error"));
  //   }
  };
}
export function getOtp(email) {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:5000/login/send-otp/", {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      console.log(data.message);
      return Promise.resolve(1);
    } catch (error) {
      console.log(error);
      console.error('Error:', error);
      dispatch(loginError("error"));
    }
  };
}


export function loginUser(creds) {
  return async (dispatch) => {
    dispatch(receiveLogin());
    try {
      const response = await fetch("http://localhost:5000/login/verify-otp", {
        method: "POST",
        body: JSON.stringify(creds),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      console.log("session",data.sessionToken);
      localStorage.setItem('authenticated', true)
      localStorage.setItem('sessionToken', data.sessionToken)
      dispatch(sessionToken(data.sessionToken));
    } catch (error) {
      console.log(error);
      console.error('Error:', error);
      dispatch(loginError("error"));
    }
  };
}



