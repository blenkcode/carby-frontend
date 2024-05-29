import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function FeedScreen() {
  const activities = [
    "Bravo tu as atteint le niveau 3",
    "Bravo tu as acquis le badge de roi du tri sélectif",
    "Bravo ton carby est au niveau 10",
    "Félicitations pour avoir complété 5 missions",
    "Bien joué ! Tu as collecté 100 points",
  ];

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Activité</Text>
      </View>

      <View style={styles.containerG}>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityContainer}>
            <Text style={styles.activityText}>{activity}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    top: 0,
    backgroundColor: "#2c6e49",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 500,
    position: "absolute",
    paddingBottom: 25,
    marginBottom: 40,
  },
  headerText: {
    marginTop: 50,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  containerG: {
    flex: 1,
    backgroundColor: "#4c956c",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "24%",
    padding: 20,
  },
  activityContainer: {
    backgroundColor: "#white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  activityText: {
    color: "#2c6e49",
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});
