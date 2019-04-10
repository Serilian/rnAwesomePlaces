import React, { Component } from "react";
import { Animated, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import List from "../../components/List/List";
import { getPlaces } from "../../store/actions/places";

class FindPlace extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }


  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  };


  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  componentDidMount() {
    this.props.onGetPlaces();
  }


  itemSelectedHandler = (key) => {
    const findSelectedPlace = this.props.places.find(place => {
      return place.key === key;
    });
    this.props.navigator.push({
      screen: "awesome-places.PlaceDetailsScreen",
      title: findSelectedPlace.name,
      passProps:
        {
          selectedPlace: findSelectedPlace
        },
      backButtonTitle: "Find Place"
    });
  };

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  placesSearch = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  };

  render() {
    let content;
    if (this.state.placesLoaded) {
      content = (<Animated.View style={{
        opacity: this.state.placesAnim
      }}>
        <List items={this.props.places} onItemSelected={this.itemSelectedHandler}/>
      </Animated.View>);
    } else {
      content = (
        <Animated.View
          style={{
            opacity: this.state.removeAnim,
            transform: [
              {
                scale: this.state.removeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 1]
                })
              }
            ]
          }}>
          <TouchableOpacity onPress={this.placesSearch}>
            <View style={styles.searchButton}>
              <Text style={styles.searchButtonText}>
                Find Places
              </Text>
            </View>
          </TouchableOpacity></Animated.View>);
    }


    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    )
      ;
  }
}

const mapStateToProps = (state) => {
  return {
    places: state.places.places
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    onGetPlaces: ()=> dispatch(getPlaces())
  }
};

const styles = StyleSheet.create({
  searchButton: {
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20,
    textAlign: "center"
  },
  searchButtonText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listContainer: {}
});

export default connect(mapStateToProps, mapDispatchToProps)(FindPlace);