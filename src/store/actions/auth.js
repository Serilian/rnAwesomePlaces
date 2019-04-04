import {TRY_AUTH} from "./ActionTypes";


export const tryAuth = (authData) => {
  return {
    type: TRY_AUTH,
    authData: authData
  }
};