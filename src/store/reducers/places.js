import placeImage from "../../assets/beautiful-place.jpg";
import { DELETE_PLACE, SET_PLACES, REMOVE_PLACE } from "../actions/ActionTypes";

const initialState = {
  places: [{
    key: "1",
    name: "Tee",
    image: placeImage,
    location: {
      latitude: 37.421998333333335,
      longitude: -122.08400000000002
    }
  }]
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      };
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter((place) => {
          return place.key !== action.key;
        })
      };
    default:
      return state;
  }

};

export default reducer;