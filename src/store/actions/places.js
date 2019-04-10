import { ADD_PLACE, DELETE_PLACE } from "./ActionTypes";
import { uiStopLoading, uiStartLoading } from "./index";

export const addPlace = (placeName, location, image) => {
    return dispatch => {
      dispatch(uiStartLoading());
      fetch(" https://us-central1-rnplaces-ee771.cloudfunctions.net/storeImage", {
        method: "POST",
        body: JSON.stringify({ image: image.base64 })
      }).then(resp => resp.json())
        .then(resp => {
            const placeData = {
              name: placeName,
              location: location,
              image: resp.imageUrl
            };
            console.log(placeData);
            return fetch("https://rnplaces-ee771.firebaseio.com/places.json", {
              method: "post",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(placeData)

            }).catch(err => {
              dispatch(uiStopLoading());
              alert(err);
            })
              .then(resp => resp.json())
              .then(resp => {
                console.log(resp);
                dispatch(uiStopLoading());
              });
          }
        ).catch(err => {
        dispatch(uiStopLoading());
        alert(err);
      });
    };
  }
;


export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};


