import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native";
import imagePlaceholder from "../../assets/beautiful-place.jpg";
import { Button } from "react-native";

class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image style={styles.imagePreview} source={imagePlaceholder}/>
        </View>
        <View style={styles.button}>
          <Button title={"Pick Image"} onPress={null}/>
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
  imagePreview: {
    height: "100%",
    width: "100%"
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

export default PickImage;

