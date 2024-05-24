import React, { useRef, useEffect, useDebugValue } from "react";
import { View, StyleSheet, Animated, Easing, Text, Image } from "react-native";
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

  const ExperienceProgressBar = () => {
    const xp = useSelector((state) => state.user.value.xp);
    let maxXP = 300;

    const progress = xp / maxXP;

    if (xp >= maxXP) {
      dispatch(addLvl(1));
      dispatch(resetXp());
    } else if (xp < 0) {
      dispatch(removeLvl(1));
      dispatch(resetPreviousXp(maxXP - 100));
    }

    return (
      <View style={styles.Xpcontainer}>
        <Progress.Bar
          progress={progress}
          width={200}
          height={12}
          color="#6DC934"
          borderRadius={10}
          backgroundColor="white"
          borderColor="grey"
        />
      </View>
    );
  };
  const xp = useSelector((state) => state.user.value.xp);
  const lvl = useSelector((state) => state.user.value.lvl);
  return (
    <ImageBackground
      source={require("../assets/carbygreen.png")}
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
          source={require("../assets/ak.png")}
          style={styles.image}
        />

        <View style={styles.progresscontainer}>
          <Text style={styles.textxp}>LVL {lvl}</Text>
          <ExperienceProgressBar />
          <Text style={styles.textxp}>{xp} / 300 XP</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
  },
  circle: {
    width: 10,
    height: 20,
    borderRadius: 5, // Half of the width and height to make it a circle
    backgroundColor: "black",
    position: "absolute",
    top: "25%", // Adjust this value based on your requirements
    marginLeft: 139,
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
    top: "25%",
    marginLeft: 120,
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
