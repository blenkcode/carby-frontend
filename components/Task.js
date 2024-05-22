import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { Card } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { addXp, removeXp } from "../reducers/user";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTempText, setShowTempText] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleSubMenu = () => {
    setIsVisible(!isVisible);
  };
  const handleLike = () => {
    if (isLiked) {
      dispatch(removeXp(100));
      setIsLiked(false);
      setShowTempText(false);
    } else {
      dispatch(addXp(100));
      setIsLiked(true);
      setShowTempText(true);
      setTimeout(() => {
        setShowTempText(false);
      }, 3000);
    }
    // 3 secondes

    // Démarrer l'animation
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  let iconStyle = isLiked ? { color: "blue" } : { color: "white" };

  const animatedStyle = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <Card key={task.name} style={styles.card}>
      <TouchableOpacity onPress={toggleSubMenu}>
        <View style={styles.cardHeader}>
          <View style={styles.titlecontainer}>
            <Text style={styles.cardTitle}>{task.name}</Text>
          </View>
          <View style={styles.iconecontainer}>
            <Animated.View style={animatedStyle}>
              <Icon
                style={iconStyle}
                name="check-circle"
                size={40}
                onPress={handleLike}
              />
            </Animated.View>
          </View>
        </View>
      </TouchableOpacity>
      {showTempText && (
        <View style={styles.tempTextContainer}>
          <Text style={styles.tempText}>+100xp</Text>
        </View>
      )}
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
    width: 300,

    margin: 10,
    borderRadius: 20,
    elevation: 5,
    position: "sticky",
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 7,
    },
  },
  cardHeader: {
    padding: 25,
    height: 80,
    backgroundColor: "#FFDF3F",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    padding: 10,
  },

  titlecontainer: {
    width: "60%",
  },

  iconecontainer: {
    flexDirection: "row",
    justifyContent: "center",

    width: "40%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Helvetica",
    paddingLeft: 10,
  },
  cardIcon: {
    marginLeft: 20,
  },
  subMenu: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  tempTextContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",

    transform: [{ translateX: 20 }, { translateY: -60 }, { rotate: "350deg" }],
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 10,
  },
  tempText: {
    color: "white",
    fontSize: 16,
  },
});

export default Task;
