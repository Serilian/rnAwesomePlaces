import placeImage from "../../assets/beautiful-place.jpg";

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
    case "ADD_PLACE":
      return {
        ...state,
        places: state.places.concat({
          key: `${Math.random()}`,
          name: action.placeName,
          image: {
            uri: action.image.uri
          } ,
          location: action.location,
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