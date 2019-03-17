import {Navigation} from 'react-native-navigation';
import AuthScreen from './src/screens/auth/auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import {Provider} from 'react-redux';
import configureStore from "./src/store/configureStore";

const store = configureStore();

//Register screens

Navigation.registerComponent("awesome-places.AuthScreen", ()=> AuthScreen, store, Provider);
Navigation.registerComponent("awesome-places.SharePlaceScreen", ()=> SharePlaceScreen,  store, Provider);
Navigation.registerComponent("awesome-places.FindPlaceScreen", ()=> FindPlaceScreen, store, Provider);

//start app

Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: 'Login'
  }
});

