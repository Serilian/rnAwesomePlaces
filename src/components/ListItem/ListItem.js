import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";


const ListItem = ({ placeName, onItemPressed, placeImg }) => {
  return (
    <TouchableOpacity onPress={onItemPressed}>
      <View style={styles.list}>
        <Image
          style={styles.placeImage}
          source={placeImg}
          resizeMode="contain"
        />
        <Text style={styles.listItem}>{placeName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 5,
    width: "100%",
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: 'center',
    height: 35,
  },
  listItem: {
    color: "red",
  },
  placeImage: {
    marginRight: 8,
    height: 40,
    width: 40
  }
});

export default ListItem;