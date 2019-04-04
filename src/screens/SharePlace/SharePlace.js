import React, { Component } from "react";
import { ScrollView, View, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../../store/actions";
import MainText from "../../components/UI/MainText/MainText";
import Heading1Text from "../../components/UI/Heading1Text/Heading1Text";
import PlaceInput from "../../components/UI/DefaultInput/DefaultInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";

class SharePlace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      controls: {
        placeName: {
          value: "",
          isValid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        }
      }
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
    if (this.state.controls.placeName.value.trim() !== "") {
      this.props.onAddPlace(this.state.controls.placeName.value);
    }
  };


  placeNameChangedHandler = val => {
    this.setState(prevState => { return {
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          value: val,
          touched: true,
          isValid: validate(val, prevState.controls.placeName.validationRules)
        }
      }
    }})
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
            placeName={this.state.controls.placeName.value}
            onChangeText={this.placeNameChangedHandler}
            valid={this.state.controls.placeName.isValid}
            touched={this.state.controls.placeName.touched}

          />
          <View style={styles.button}>
            <Button title={"Share the place"} onPress={this.addPlaceHandler}
            disabled={!this.state.controls.placeName.isValid}
            />
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