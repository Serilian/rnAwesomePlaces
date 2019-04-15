import { AUTH_SET_TOKEN } from "./ActionTypes";
import { uiStartLoading, uiStopLoading } from "./ui";
import startMainTabs from "../../screens/MainTabs/MainTabs";
import { API_KEY } from "../../firebase.properties";


export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(onAuth(authData, authMode));
  };
};

export const onAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let firebaseAuthEndPoint = "";
    if (authMode === "signup") {
      firebaseAuthEndPoint = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
    } else {
      firebaseAuthEndPoint = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
    }
    fetch(firebaseAuthEndPoint, {
      method: "POST",
      body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch(err => {
      dispatch(uiStopLoading());
      alert(err);
    })
      .then(resp => resp.json())
      .then(data => {
          dispatch(uiStopLoading());
          if (!data.idToken) {
            alert("Authentication failed");
          } else {
            dispatch(authSetToken(data.idToken));
            startMainTabs();
          }
        }
      );
  };
};

export const authSetToken = (token) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};