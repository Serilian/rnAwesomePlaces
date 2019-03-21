import React from "react";
import { Text, StyleSheet } from "react-native";

const Heading1Text = (props) => {
  return (
    <Text
      {...props}
      style={[styles.header, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "bold"
  }
});

export default Heading1Text;