import { ADD_PLACE, DELETE_PLACE, REMOVE_PLACE, SET_PLACES } from "./ActionTypes";
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
  return dispatch => {
    dispatch(removePlace(key));
    fetch(`https://rnplaces-ee771.firebaseio.com/places/${key}.json`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    }).catch(err => {
      dispatch(uiStopLoading());
      alert(err);
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        dispatch(uiStopLoading());
      });
  };
};


export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  }
};


export const setPlaces = (places) => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch("https://rnplaces-ee771.firebaseio.com/places.json")
      .catch(err => {
        dispatch(uiStopLoading());
        alert(err);
      })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        let places = [];
        for (let key in resp) {
          places.push({
            ...resp[key],
            image: {
              uri: resp[key].image
            },
            key: key
          });
        }
        dispatch(setPlaces(places));
        dispatch(uiStopLoading());
      });
  };
};


