import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import Heading1Text from "../../components/UI/Heading1Text/Heading1Text";
import MainText from "../../components/UI/MainText/MainText";
import background from "../../assets/background.jpg";
import { Dimensions } from "react-native";
import validate from "../../utility/validation";
import { connect } from "react-redux";
import { tryAuth } from "../../store/actions/index";

class AuthScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
      authMode: "login",
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
    Dimensions.addEventListener("change", this.updateStyles);
  }


  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onTryAuth(authData, this.state.authMode);
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };

  capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
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
          }
        }
      };
    });
  };

  render() {

    let headingText = null;
    let confirmPasswordControl = null;

    let submitButton = (<ButtonWithBackground
      onPress={this.authHandler}
      color={"#29aaf4"}
      disabled={
        !this.state.controls.password.isValid ||
        !this.state.controls.confirmPassword.isValid && this.state.authMode === "signup" ||
        !this.state.controls.email.isValid}
    >{this.capitalize(this.state.authMode)}</ButtonWithBackground>);

    if(this.props.isLoading) {
      submitButton = (<ActivityIndicator/>)
    }

    if (this.state.viewMode === "portrait") {
      headingText = (<MainText>
        <Heading1Text>Please {this.state.authMode}</Heading1Text>
      </MainText>);
    }

    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <View
          style={
            this.state.viewMode === "portrait"
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput style={styles.input}
                        placeholder={"Confirm password"}
                        value={this.state.controls.confirmPassword.value}
                        touched={this.state.controls.confirmPassword.touched}
                        valid={this.state.controls.confirmPassword.isValid}
                        onChangeText={(val) => this.updateInputState("confirmPassword", val)}
                        secureTextEntry
          />
        </View>
      );
    }


    return (
      <ImageBackground source={background} style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          <ButtonWithBackground color={"#29aaf4"}
                                onPress={this.switchAuthModeHandler}
          >Switch to {this.state.authMode === "login" ? "signup" : "login"}</ButtonWithBackground>
          {headingText}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput style={styles.input}
                            placeholder={"Your email"}
                            value={this.state.controls.email.value}
                            valid={this.state.controls.email.isValid}
                            touched={this.state.controls.email.touched}
                            onChangeText={(val) => this.updateInputState("email", val)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='email-address'

              />

              <View style={
                this.state.viewMode === "portrait" ||
                this.state.authMode === "login"
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }>

                <View style={
                  this.state.viewMode === "portrait" ||
                  this.state.authMode === "login"
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }>
                  <DefaultInput style={styles.input}
                                placeholder={"Your password"}
                                value={this.state.controls.password.value}
                                valid={this.state.controls.password.isValid}
                                touched={this.state.controls.password.touched}
                                onChangeText={(val) => this.updateInputState("password", val)}
                                secureTextEntry

                  />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
          {submitButton}

        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode))
  };
};


const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  }
});