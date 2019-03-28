import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {connect} from 'react-redux';
import {deletePlace} from '../../store/actions/index';
import {Platform} from "react-native";

const PlaceDetail = ({ selectedPlace, onDeletePlace, navigator}) => {

  const deleteItemHandler = (key) => {
    onDeletePlace(key);
    navigator.pop({
      animated: true
    });
  };

  return (

    <View style={styles.container}>
      <Image style={styles.placeImage} source={selectedPlace ? selectedPlace.image : null}/>
      <Text style={styles.placeName}>{selectedPlace.name}</Text>

      <View style={styles.buttonList}>
        <View style={styles.deleteIcon}>
          <TouchableOpacity onPress={()=>deleteItemHandler(selectedPlace.key)}>
            <Icon size={30} name={Platform.OS === 'android' ? 'md-trash' :"ios-trash"} color={"red"}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "400",
    textAlign: "center",
    fontSize: 28
  },
  buttonList: {
    flexDirection: "row",
    justifyContent: "center"
  },
  deleteIcon: {
    margin: 15
  },
  closeButton: {
    marginTop: 15
  }
});

const mapDispatchToProps = (dispatch) => { return {
  onDeletePlace: (key)=> dispatch(deletePlace(key))
}};

export default connect(null,mapDispatchToProps)(PlaceDetail);