import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./ActionTypes";
import { uiStartLoading, uiStopLoading } from "./ui";
import startMainTabs from "../../screens/MainTabs/MainTabs";
import { API_KEY } from "../../firebase.properties";
import { AsyncStorage } from "react-native";
import App from "../../../App";


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
            dispatch(authStoreToken(data.idToken, data.expiresIn, data.refreshToken));
            startMainTabs();
          }
        }
      );
  };
};

export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
    expiryDate: expiryDate
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      let token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if (!token || new Date(expiryDate) <= new Date()) {
        AsyncStorage.getItem("ap:auth-token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            token = tokenFromStorage;
            if (!token) {
              reject("No token in storage");
            } else {
              return AsyncStorage.getItem("ap:auth-expiryDate");
            }
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(token));
              resolve(token);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });

    return promise
      .catch(err => {
        return AsyncStorage.getItem("ap:auth-refreshToken")
          .then(refreshToken => {
            return fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
              {
                method: "post",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=refresh_token&refresh_token=" + refreshToken
              });
          })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.id_token) {
              console.log("Refresh token worked!");
              dispatch(
                authStoreToken(
                  parsedRes.id_token,
                  parsedRes.expires_in,
                  parsedRes.refresh_token
                )
              );
              return parsedRes.id_token;
            } else {
              dispatch(authClearStorage());
            }
          });
      })
      .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
  };
};

const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    dispatch(authSetToken(token, expiryDate));
    console.log(now, new Date(expiryDate));
    AsyncStorage.setItem("ap:auth-token", token);
    AsyncStorage.setItem("ap:auth-expiryDate", expiryDate.toString());
    AsyncStorage.setItem("ap:auth-refreshToken", refreshToken);
  };
};

export const authAutoSignin = () => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(err => console.log("Failed to fetch token for auto login"))
      .then(token => {
        console.log("Auto login token:" + token);
        if (token) {
          startMainTabs();
        }
      });
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("ap:auth-token");
    AsyncStorage.removeItem("ap:auth-expiryDate");
    return AsyncStorage.removeItem("ap:auth-refreshToken");
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage())
      .then(() => {
        App();
      });
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  };
};