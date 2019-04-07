import React, { Component } from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";

class PickLocation extends Component {


  constructor(props) {
    super(props);
    this.state = {
      focusedLocation: {
        latitude: 50.340659,
        longitude: 19.56823,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122
      },
      locationChoosen: true
    };
  }


  pickLocationHandler = (event) => {
    const cords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: cords.latitude,
      longitude: cords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: cords.latitude,
          longitude: cords.longitude
        },
        locationChoosen: true
      };
    });
    this.props.onLocationPick({
      latitude: cords.latitude,
      longitude: cords.longitude
    })
  };


  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition((pos)=>{
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    }, error => alert('Fetching location failed - please type in address manually'));
  };


  render() {

    let marker = null;


    if(this.state.locationChoosen) {
      marker = (<MapView.Marker coordinate={this.state.focusedLocation}/>)
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.focusedLocation}
          onPress={this.pickLocationHandler}
          ref={ref=>{this.map = ref}}
        >{marker}</MapView>

        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.getLocationHandler}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }
});

export default PickLocation;
