import React, { Component } from "react";
import { ScrollView, View, Button, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { addPlace, startAddPlace } from "../../store/actions/index";
import MainText from "../../components/UI/MainText/MainText";
import Heading1Text from "../../components/UI/Heading1Text/Heading1Text";
import PlaceInput from "../../components/UI/DefaultInput/DefaultInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";

class SharePlace extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidUpdate() {
    if (this.props.placeAdded) {
      this.props.navigator.switchToTab({ tabIndex: 0 });
      this.props.onStartAddPlace();
    }
  }

  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  componentWillMount() {
    this.reset();
  }

  onNavigatorEvent = event => {
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
       this.props.onStartAddPlace();
      }
    }

    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  addPlaceHandler = () => {

    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value
    );
    this.reset();
    this.imagePicker.reset();
    this.locationPicker.reset();
  };


  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            touched: true,
            isValid: validate(val, prevState.controls.placeName.validationRules)
          }
        }
      };
    });
  };

  locationPickHandler = (location) => {
    this.setState(prevState => ({
      controls:
        {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
    }));
  };

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  };

  reset = () => {
    this.setState({
      controls: {
        placeName: {
          value: "",
          isValid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    });
  };

  render() {

    let submitButton = (<Button title={"Share the place"} onPress={this.addPlaceHandler}
                                disabled={
                                  !this.state.controls.placeName.isValid ||
                                  !this.state.controls.location.valid ||
                                  !this.state.controls.image.valid}
    />);

    if (this.props.isLoading) {
      submitButton = (<ActivityIndicator/>);
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <Heading1Text>
              Image Preview
            </Heading1Text>
          </MainText>
          <PickImage
            onImagePicked={this.imagePickedHandler}
            ref={ref => (this.imagePicker = ref)}
          />
          <PickLocation
            onLocationPick={this.locationPickHandler}
            ref={ref => (this.locationPicker = ref)}
          />
          <PlaceInput
            placeName={this.state.controls.placeName.value}
            onChangeText={this.placeNameChangedHandler}
            valid={this.state.controls.placeName.isValid}
            touched={this.state.controls.placeName.touched}
            value={this.state.controls.placeName.value}

          />
          <View style={styles.button}>
            {submitButton}
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
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
    onStartAddPlace: () => dispatch(startAddPlace())
  };
};

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlace);