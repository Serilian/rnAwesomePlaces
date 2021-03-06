import React from "react";
import { Platform, TouchableNativeFeedback, TouchableOpacity, View, StyleSheet, Text } from "react-native";

const ButtonWithBackground = (props) => {

  let content = (<View style={[styles.button, { backgroundColor: props.color }, props.disabled ? styles.disabled: null]}>
    <Text style={props.disabled ? styles.disabledText: null}>{props.children}</Text>
  </View>);

  if(props.disabled) {
    return content;
  }

  if (Platform.OS === "android") {
    return (<TouchableNativeFeedback onPress={props.onPress}>
      {content}
    </TouchableNativeFeedback>);
  } else {
    return (<TouchableOpacity onPress={props.onPress}>
     {content}
    </TouchableOpacity>);
  }


};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderColor: "#000"
  },
  disabled: {
    backgroundColor: '#eee',
    borderColor: "#aaa"
  },
  disabledText: {
    color: "#aaa"
  }
});

export default ButtonWithBackground;