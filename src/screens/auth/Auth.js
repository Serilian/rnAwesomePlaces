import React, { Component } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import startMainTabs from "../../screens/MainTabs/MainTabs";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import Heading1Text from "../../components/UI/Heading1Text/Heading1Text";
import MainText from "../../components/UI/MainText/MainText";
import background from "../../assets/background.jpg";
import { Dimensions } from "react-native";
import validate from "../../utility/validation";

class AuthScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      styles: {
        pwContainerDirection: "column",
        pwJustifyContent: "center",
        psWrapperWidth: "100%"
      },
      controls: {
        email: {
          value: "",
          isValid: false,
          touched: false,
          validationRules: {
            isEmail: false,
            minLength: 6
          }
        },
        password: {
          value: "",
          isValid: false,
          touched: false,
          validationRules: {
            minLength: 6
          }
        },
        confirmPassword: {
          value: "",
          isValid: false,
          touched: false,
          validationRules: {
            isEqualTo: "password"
          }
        }
      }
    };
    Dimensions.addEventListener("change", (dims) => {
      this.setState({
        styles: {
          pwContainerDirection: Dimensions.get("window").height < 500 ? "row" : "column",
          pwJustifyContent: Dimensions.get("window").height < 500 ? "space-between" : "center",
          psWrapperWidth: Dimensions.get("window").height < 500 ? "45%" : "100%"
        }
      });
    });
  }


  loginHandler = () => {
    startMainTabs();
  };


  updateInputState = (key, value) => {

    let connectedValue = {};

    if (this.state.controls[key].validationRules.isEqualTo) {

      const equalControl = this.state.controls[key].validationRules.isEqualTo;

      const equalValue = this.state.controls[equalControl].value;

      connectedValue = {
        ...connectedValue,
        isEqualTo: equalValue
      };
    }

    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        isEqualTo: value
      };
    }

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            isValid:
              key === "password" ?
              validate(
                prevState.controls.confirmPassword.value,
                prevState.controls.confirmPassword.validationRules,
                connectedValue
              )
                : prevState.controls.confirmPassword.isValid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            isValid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          },
        }
      };
    });
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
            <DefaultInput style={styles.input}
                          placeholder={"Your email"}
                          value={this.state.controls.email.value}
                          valid={this.state.controls.email.isValid}
                          touched={this.state.controls.email.touched}
                          onChangeText={(val) => this.updateInputState("email", val)}
            />

            <View style={{
              flexDirection: this.state.styles.pwContainerDirection,
              justifyContent: this.state.styles.pwJustifyContent
            }}>

              <View style={{
                width: this.state.styles.psWrapperWidth
              }}>
                <DefaultInput style={styles.input}
                              placeholder={"Your password"}
                              value={this.state.controls.password.value}
                              valid={this.state.controls.password.isValid}
                              touched={this.state.controls.password.touched}
                              onChangeText={(val) => this.updateInputState("password", val)}

                />
              </View>
              <View style={{
                width: this.state.styles.psWrapperWidth
              }}>
                <DefaultInput style={styles.input}
                              placeholder={"Confirm password"}
                              value={this.state.controls.confirmPassword.value}
                              touched={this.state.controls.confirmPassword.touched}
                              valid={this.state.controls.confirmPassword.isValid}
                              onChangeText={(val) => this.updateInputState("confirmPassword", val)}
                />
              </View>
            </View>
          </View>

          <ButtonWithBackground
            onPress={this.loginHandler}
            color={"#29aaf4"}
            disabled={!this.state.controls.password.isValid || !this.state.controls.confirmPassword.isValid || !this.state.controls.email.isValid}
          >Login</ButtonWithBackground>

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
  input: {
    borderColor: "#bbb",
    backgroundColor: "rgba(255,255,255, 0.6)"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  }
});