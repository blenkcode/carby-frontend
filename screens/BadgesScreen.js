import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { images } from "../assets/badges"; // Assurez-vous que ce chemin est correct

export default function BadgesScreen() {
  const allBadges = () => {
    return (
      <View style={styles.badges}>
        {Object.keys(images).map((key, index) => (
          <Image key={index} source={images[key]} style={styles.image} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.globalContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Succès</Text>
      </View>
      <View style={styles.badgesContainer}>
        <View style={styles.badges}>{allBadges()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "#3F5FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 0.7,
    backgroundColor: "#3F5FFF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    marginTop: 50,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  badgesContainer: {
    flex: 5,
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  badges: {
    backgroundColor: "#3F5FFF",
    width: "95%",
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});
