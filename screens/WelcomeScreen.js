import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function WelcomeScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("Questions");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Welcome.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text1}>
            Salut <Text style={styles.user}>Name !</Text>{" "}
          </Text>
          <Text style={styles.text}>
            Carby a quelques questions à te poser afin de définir ensemble tes
            objectifs.
          </Text>
          <Text style={styles.text2}>Promis c'est rapide!</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
          <Text style={styles.btnText}>C'est parti !</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    width: "80%",
    marginTop: "25%", // Adjust this value as needed
  },
  text1: {
    fontSize: "40px",
  },
  text: {
    fontSize: "35px",
    padding: "2px",
    paddingTop: "5%",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    marginBottom: "5%",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    padding: "5%",
    width: "80%",
  },
  btnText: {
    padding: "50px",
    fontSize: 16,
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  text2: {
    fontSize: "35px",
    paddingTop: "5%",
    paddingBottom: "15%",
  },
  user: {
    color: "yellow",
  },
});
