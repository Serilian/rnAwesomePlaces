import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/Ionicons'

const startTabs = ()=> {
  Promise.all([ Icon.getImageSource('md-map', 30),  Icon.getImageSource('ios-share-alt', 30)])
    .then(sources => {
      Navigation.startTabBasedApp({
        tabs: [
          {
            label: 'Share Place',
            screen: 'awesome-places.SharePlaceScreen',
            title: "Share Place",
            icon: sources[1]
          },
          {
            label: 'Find Place',
            screen: 'awesome-places.FindPlaceScreen',
            title: "Find Place",
            icon: sources[0]
          }
        ]
      });
    })
    .catch();

};

export default startTabs;
