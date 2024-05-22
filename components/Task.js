import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Card } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { addXp, removeXp } from "../reducers/user";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleSubMenu = () => {
    setIsVisible(!isVisible);
  };

  const handleLike = () => {
    if (isLiked) {
      dispatch(removeXp(50));
      setIsLiked(false);
    } else {
      dispatch(addXp(100));
      setIsLiked(true);
    }
  };

  let iconStyle = isLiked ? { color: "red" } : { color: "white" };

  return (
    <Card key={task.name} style={styles.card}>
      <TouchableOpacity onPress={toggleSubMenu}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{task.name}</Text>
          <FontAwesome
            style={styles.cardIcon}
            name="caret-down"
            size={32}
            color="black"
          />
          <Icon
            style={iconStyle}
            name="check-circle"
            size={32}
            onPress={handleLike}
          />
        </View>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.subMenu}>
          <Text style={styles.subMenuItem}>{task.description}</Text>
          <Image source={task.img} style={styles.image} />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    top: "25%",
    width: 300,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    position: "sticky",
  },
  cardHeader: {
    padding: 25,
    backgroundColor: "yellow",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: "flex",
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Helvetica",
  },
  cardIcon: {
    marginLeft: 20,
  },
  subMenu: {
    padding: 15,
    backgroundColor: "#f8f8f8",
  },
  subMenuItem: {
    paddingVertical: 10,
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },
});

export default Task;