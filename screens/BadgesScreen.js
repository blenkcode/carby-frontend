import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { images } from "../assets/badges"; // Assurez-vous que ce chemin est correct

export default function BadgesScreen() {
  const allBadges = () => {
    return (
      <View style={styles.container}>
        {Object.keys(images).map((key, index) => (
          <View key={index} style={styles.badgeContainer}>
            <View style={styles.imageContainer}>
              <Image source={images[key].src} style={styles.image} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.badgeTitle}>{images[key].title}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.global}>
      <View style={styles.globalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Succès</Text>
        </View>
        <View style={styles.badgesContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {allBadges()}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    backgroundColor: "#3F5FFF",
    flex: 1,
  },
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
    backgroundColor: "#3F5FFF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badgeContainer: {
    width: "28%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    //backgroundColor: "green",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "6.5%",
    //backgroundColor: "violet",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  badgeTitle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
