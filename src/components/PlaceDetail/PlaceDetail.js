import React from "react";
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PlaceDetail = ({ selectedPlace, onItemDelete, onModalClose }) => {

  let modalContent = null;

  if (selectedPlace) {
    modalContent = (
      <View>
        <Image style={styles.placeImage} source={selectedPlace ? selectedPlace.image : null}/>
        <Text style={styles.placeName}>{selectedPlace.name}</Text>
      </View>);

  }

  return (
    <Modal
      onRequestClose={onModalClose}
      visible={selectedPlace !== null}
      animationType="slide"
    >
      <View
        style={styles.modalContainer}>
        {modalContent}
        <View style={styles.buttonList}>
          <View style={styles.deleteIcon}>
            <TouchableOpacity onPress={onItemDelete} >
              <Icon size={30} name={"ios-trash"} color={"red"}/>
            </TouchableOpacity>
          </View>
          <View style={styles.closeButton}>
            <Button title="Close" onPress={onModalClose}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
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

export default PlaceDetail;