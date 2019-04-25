import { PLACE_ADDED, REMOVE_PLACE, SET_PLACES, START_ADD_PLACE } from "./ActionTypes";
import { uiStopLoading, uiStartLoading } from "./index";
import { authGetToken } from "./index";


export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  };
};


export const addPlace = (placeName, location, image) => {
    return dispatch => {

      let authToken;
      dispatch(uiStartLoading());
      dispatch(authGetToken())
        .catch(() => console.log("No valid token"))
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
        .catch(err => {
          console.log(err);
          alert("Something went wrong, please try again!");
          dispatch(uiStopLoading());
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .then(parsedRes => {
          const placeData = {
            name: placeName,
            location: location,
            image: parsedRes.imageUrl,
            imagePath: parsedRes.imagePath
          };
          console.log(placeData);
          return fetch(`https://rnplaces-ee771.firebaseio.com/places.json?auth=${authToken}
            `, {
              method: "post",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(placeData)
            }
          );
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .then(parsedRes => {
          console.log(parsedRes);
          dispatch(uiStopLoading());
          dispatch(placeAdded());
        })
        .catch(err => {
          console.log(err);
          alert("Something went wrong, please try again!");
          dispatch(uiStopLoading());
        });
    };
  }
;

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
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
          dispatch(uiStopLoading());
          dispatch(setPlaces(places));
        }
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
        dispatch(uiStopLoading());
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        dispatch(removePlace(key));
        return fetch(`https://rnplaces-ee771.firebaseio.com/places/${key}.json?auth=${token}`, {
            method: "delete"
          }
        );
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log("Done!");
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};