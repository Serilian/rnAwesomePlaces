import React, { Component } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import startMainTabs from "../../screens/MainTabs/MainTabs";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import Heading1Text from "../../components/UI/Heading1Text/Heading1Text";
import MainText from "../../components/UI/MainText/MainText";
import background from "../../assets/background.jpg";
import { Dimensions } from "react-native";

class AuthScreen extends Component {


  loginHandler = () => {
    startMainTabs();
  };

  render() {

    let headingText = null;

    if (Dimensions.get("window").height > 500) {
      headingText = (<MainText>
        <Heading1Text>Please log in</Heading1Text>
      </MainText>);
    }

    return (
      <ImageBackground source={background} style={styles.backgroundImage}>
        <View style={styles.container}>
          <ButtonWithBackground color={"#29aaf4"}>Switch to Login</ButtonWithBackground>
          {headingText}
          <View style={styles.inputGroup}>
            <DefaultInput style={styles.input} placeholder={"Your email"}/>
            <View style={styles.passwordGroup}>

              <View style={styles.passwordWrapper}>
                <DefaultInput style={styles.input} placeholder={"Your password"}/>
              </View>
              <View style={styles.passwordWrapper}>
                <DefaultInput style={styles.input} placeholder={"Confirm password"}/>
              </View>
            </View>
          </View>

          <ButtonWithBackground onPress={this.loginHandler} color={"#29aaf4"}>Login</ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  inputGroup: {
    width: "80%",
    margin: 20
  },
  passwordGroup: {
    flexDirection: Dimensions.get("window").height > 500 ? "column" : "row",
    justifyContent: 'space-between'

  },
  input: {
    borderColor: "#bbb",
    backgroundColor: "rgba(255,255,255, 0.6)"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  passwordWrapper: {
    width: Dimensions.get("window").height > 500 ? '100%': '45%'
  }
});