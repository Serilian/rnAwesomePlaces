import placeImage from "../../assets/beautiful-place.jpg";

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case "ADD_PLACE":
      return {
        ...state,
        places: state.places.concat({
          key: `${Math.random()}`,
          name: action.placeName,
          image: placeImage,
          location: action.location
        })
      };
    case "DELETE_PLACE":
      return {
        ...state,
        places: state.places.filter((place) => {
          return place.key !== action.placeKey;
        })
      };
    default:
      return state;
  }

};

export default reducer;