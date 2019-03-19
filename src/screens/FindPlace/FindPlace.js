import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import List from "../../components/List/List";

class FindPlace extends Component {


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


  render() {
    return (

      <View>
        <List items={this.props.places} onItemSelected={this.itemSelectedHandler}/>
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

export default connect(mapStateToProps, null)(FindPlace);