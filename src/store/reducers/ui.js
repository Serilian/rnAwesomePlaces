import { UI_START_LOADING, UI_STOP_LOADING } from "../actions/ActionTypes";


const intitialState = {
  isLoading: false
};


const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

export default reducer;