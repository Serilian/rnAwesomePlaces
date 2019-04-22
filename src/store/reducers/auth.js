import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "../actions/ActionTypes";


const initialState = {
  token: ""
};

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null
      };
    default: return state;
  }

};

export default reducer;