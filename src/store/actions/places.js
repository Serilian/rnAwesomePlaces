import { ADD_PLACE, DELETE_PLACE } from "./ActionTypes";

export const addPlace = (placeName, location, image) => {
    return dispatch => {
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

            }).catch(err => console.log(err))
              .then(resp => resp.json())
              .then(resp => {
                console.log(resp);
              });
          }
        ).catch(err => console.log(err));
    };
  }
;


export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};


