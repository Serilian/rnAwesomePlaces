import React, { Component } from "react";
import {View, Button, StyleSheet} from 'react-native';
import startMainTabs from '../../screens/MainTabs/MainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import Heading1Text from '../../components/UI/Heading1Text/Heading1Text';
import MainText from '../../components/UI/MainText/MainText';

class AuthScreen extends Component {


  loginHandler = () => {
    startMainTabs();
  };

  render() {
    return (
      <View style={styles.container}>
        <MainText>
          <Heading1Text>Please log in</Heading1Text>
        </MainText>
        <View style={styles.inputGroup}>
          <DefaultInput style={styles.input} placeholder={"Your email"}/>
          <DefaultInput style={styles.input} placeholder={"Your password"}/>
          <DefaultInput style={styles.input} placeholder={"Confirm password"}/>
        </View>
        <Button title={"Login"} onPress={this.loginHandler}/>
      </View>
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
    backgroundColor: "#eee"
  }
});