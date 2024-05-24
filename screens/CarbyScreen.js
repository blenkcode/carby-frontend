import React, { useRef, useEffect, useDebugValue } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { ImageBackground } from "react-native";
import * as Progress from "react-native-progress";
import { useDispatch, useSelector } from "react-redux";
import {
  addLvl,
  removeXp,
  resetXp,
  removeLvl,
  resetPreviousXp,
} from "../reducers/user";
import Profil from "../components/Profile";

export default function CarbyScreen({ navigation }) {
  const dispatch = useDispatch();
  const moveAnim = useRef(new Animated.Value(0)).current; // Initial position
  const blinkAnim = useRef(new Animated.Value(1)).current; // Animation for blinking

  useEffect(() => {
    const moveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );

    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 100,
          delay: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
      ])
    );

    moveAnimation.start();
    blinkAnimation.start();

    // Clean up animations on component unmount
    return () => {
      moveAnimation.stop();
      blinkAnimation.stop();
    };
  }, [moveAnim, blinkAnim]);

  const startLeft = 17; // Starting point for the first circle
  const endLeft = -4; // Ending point for the first circle

  const startLeftSecond = startLeft - 22; // Starting point for the second circle
  const endLeftSecond = endLeft - 30; // Ending point for the second circle

  const interpolatedLeftFirst = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [startLeft, endLeft],
  });

  const interpolatedLeftSecond = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [startLeftSecond, endLeftSecond],
  });

  return (
    <ScrollView style={styles.scrollview}>
      <ImageBackground
        source={require("../assets/carbyfinal.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.circle,
              { left: interpolatedLeftFirst, opacity: blinkAnim },
            ]}
          >
            <View style={styles.circleblackright}></View>
          </Animated.View>

          <Animated.View
            style={[
              styles.circle1,
              { left: interpolatedLeftSecond, opacity: blinkAnim },
            ]}
          >
            <View style={styles.circleblackleft}></View>
          </Animated.View>

          <Image
            size={5}
            source={require("../assets/des-legumes.png")}
            style={styles.image}
          />
        </View>
      </ImageBackground>
      <Profil />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: "#4C956C",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 811,
  },
  circle: {
    width: 10,
    height: 20,
    borderRadius: 5, // Half of the width and height to make it a circle
    backgroundColor: "black",
    position: "absolute",
    top: "36%", // Adjust this value based on your requirements
    marginLeft: -33,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  circleblackleft: {
    width: 8,
    height: 8,
    borderRadius: 5, // Half of the width and height to make it a circle
    backgroundColor: "white",
    position: "absolute",
    top: 5, // Adjust this value based on your requirements
    marginLeft: 5,
    zIndex: 1000,
  },

  circle1: {
    width: 10,
    height: 20,
    borderRadius: 5, // Half of the width and height to make it a circle
    backgroundColor: "black",
    position: "absolute",
    top: "36%",
    marginLeft: 37,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // Adjust this value based on your requirements
  },
  circleblackright: {
    width: 8,
    height: 8,
    borderRadius: 5, // Half of the width and height to make it a circle
    backgroundColor: "white",
    position: "absolute",
    top: 5, // Adjust this value based on your requirements
    marginLeft: 5,
    zIndex: 1000,
  },
  progresscontainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefee3",
    top: "25%",
    width: 250,
    height: 80,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  Xpcontainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5, // Utilisé pour Android
    backgroundColor: "white", // Nécessaire pour les ombres sur iOS
    borderRadius: 10, // Doit correspondre au borderRadius du Progress Bar pour cohérence
    padding: 2,
  },
  textxp: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  image: {
    position: "absolute",

    width: 500, // Changez la largeur selon vos besoins
    height: 100, // Changez la hauteur selon vos besoins
    resizeMode: "contain",
    transform: [{ rotate: "340deg" }],
  },
  imgcontainer: {},
});
