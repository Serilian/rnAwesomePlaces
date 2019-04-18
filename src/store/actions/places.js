import { REMOVE_PLACE, SET_PLACES } from "./ActionTypes";
import { uiStopLoading, uiStartLoading } from "./index";
import { authGetToken } from "./index";

export const addPlace = (placeName, location, image) => {
    return dispatch => {

      let authToken;
      dispatch(uiStartLoading());
      dispatch(authGetToken())
        .catch(()=> console.log("No valid token"))
        .then(token => {
          authToken = token;
          return fetch(" https://us-central1-rnplaces-ee771.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify(
              { image: image.base64 }),
            headers: {
              "Authorization": "Bearer " + authToken
            }
          });
        })
        .then(resp => resp.json())
        .then(resp => {
          if (resp.error) {
            console.log(error);
            alert(resp.error);
          } else {
            const placeData = {
              name: placeName,
              location: location,
              image: resp.imageUrl
            };
            console.log(placeData);
            return fetch(`https://rnplaces-ee771.firebaseio.com/places.json?auth=${authToken}
            `, {
              method: "post",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(placeData)

            }).catch(err => {
              dispatch(uiStopLoading());
              alert(err);
              console.log(err);
            })
              .then(resp => resp.json())
              .then(resp => {
                console.log(resp);
                dispatch(uiStopLoading());
              });
          }
        })
        .catch(err => {
          dispatch(uiStopLoading());
          alert(err);
          console.log(err);
        });
    };
  }
;

export const deletePlace = (key) => {
  return dispatch => {
    dispatch(removePlace(key));
    dispatch(authGetToken())
      .then(token => {
        dispatch(removePlace(key));
        return fetch(`https://rnplaces-ee771.firebaseio.com/places/${key}.json?auth=${token}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json"
          }
        });
      })
      .catch(() => {
        dispatch(uiStopLoading());
        alert("Auth error - no valid auth token");
      })
      .catch(err => {
        dispatch(uiStopLoading());
        alert(err);
      })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.error) {
          alert(resp.error);
        } else {
          console.log(resp);
        }
        dispatch(uiStopLoading());
      });
  };
};


export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
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
    dispatch(authGetToken())
      .catch(() => {
        dispatch(uiStopLoading());
        alert("Auth error - no valid auth token");
      })
      .then(token => {
        return fetch(`https://rnplaces-ee771.firebaseio.com/places.json?auth=${token}`);
      })

      .then(resp => resp.json())
      .then(resp => {
        if (resp.error) {
          alert(resp.error);
        } else {
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
        }
        console.log(resp);
        dispatch(uiStopLoading());
      })
      .catch(error => alert(error));
  };
};


