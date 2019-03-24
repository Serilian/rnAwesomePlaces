import { Button, StyleSheet, TextInput, View } from "react-native";
import React from "react";


class InputGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      placeName: ""
    };
  }

  changePlaceInputHandler = (text) => {
    this.setState({ placeName: text });
  };

  placeSubmitHandler = () => {
    if(this.state.placeName.trim() !== '') {
      this.props.onPlaceAdded(this.state.placeName);
      this.setState({placeName: ''});
    }
  };


  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={this.changePlaceInputHandler}
          value={this.state.placeName}
          style={styles.input}
          placeholder={"An Awesome Place"}
        />
        <Button style={styles.inputButton} title={"Add"} onPress={this.placeSubmitHandler}/>
      </View>
    );
  }

}

export default InputGroup;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%"
  },
  input: {
    width: "70%"
  },
  inputButton: {
    width: "30%"
  }
});
