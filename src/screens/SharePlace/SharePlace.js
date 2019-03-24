import React, { Component } from "react";
import { View, Text } from "react-native";
import InputGroup from "../../components/InputGroup/InputGroup";
import { connect } from "react-redux";
import { addPlace } from "../../store/actions";


class SharePlace extends Component {

  addPlaceHandler = (place) => {
    this.props.onAddPlace(place);
  };

  render() {
    return (
      <View>
        <InputGroup onPlaceAdded={this.addPlaceHandler}/>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  };
};

export default connect(null, mapDispatchToProps)(SharePlace);