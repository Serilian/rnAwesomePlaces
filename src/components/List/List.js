import React from "react";
import { StyleSheet, FlatList } from "react-native";
import ListItem from "../ListItem/ListItem";

const List = ({ items, onItemSelected }) => {


  return (
    <FlatList
      style={styles.listContainer}
      data={items}
      renderItem={(info) => (
        <ListItem
          placeImg={info.item.image}
          placeName={info.item.name}
          onItemPressed={() => onItemSelected(info.item.key)}
        />)}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default List;