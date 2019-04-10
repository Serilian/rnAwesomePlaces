import { UI_START_LOADING } from "./ActionTypes";
import { UI_STOP_LOADING } from "./ActionTypes";

export const uiStartLoading = () => {
  return {
    type: UI_START_LOADING
  };
};

export const uiStopLoading = () => {
  return {
    type: UI_STOP_LOADING
  };
};