import React from "react";
import {TextInput, StyleSheet} from 'react-native';


const DefaultInput = (props) => {
  return (
    <TextInput
      placeholder={"Place name"}
      underlineColorAndroid={"#000"}
      {...props}
      style={[styles.inputField, props.style, !props.valid && props.touched ? styles.invalid : null ]}
    />
  );
};

export default DefaultInput;

const styles = StyleSheet.create({
  inputField: {
    borderColor: "#eee",
    borderRadius: 8,
    borderWidth: 1,
    width: "100%",
    padding: 15,
    marginBottom: 2
  },
  invalid: {
  backgroundColor: '#f9c0c0',
    borderColor: 'red'
}
});