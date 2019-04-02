import React, { Component } from "react";
import { ScrollView, View, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../../store/actions";
import MainText from "../../components/UI/MainText/MainText";
import Heading1Text from "../../components/UI/Heading1Text/Heading1Text";
import PlaceInput from "../../components/UI/DefaultInput/DefaultInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";

class SharePlace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      placeName: ""
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  static navigatorStyle = {
    navBarButtonColor: 'orange'
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

  addPlaceHandler = () => {
    if (this.state.placeName.trim() !== "") {
      this.props.onAddPlace(this.state.placeName);
    }
  };


  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <Heading1Text>
              Image Preview
            </Heading1Text>
          </MainText>
          <PickImage style={styles.placeholder}/>
          <PickLocation/>
          <PlaceInput
            placeName={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button title={"Share the place"} onPress={this.addPlaceHandler}/>
      </View>
        </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "#fff",
    width: "80%",
    height: 150
  },
  button: {
    margin: 5
  }

});
const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: placeName => dispatch(addPlace(placeName))
  };
};

export default connect(null, mapDispatchToProps)(SharePlace);