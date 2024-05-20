import React from "react";
import {
  View,
  TextInput,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Welcome.png")}
        style={styles.backgroundImage}
      >
        <Text>Salut Name ! </Text>
        <Text>
          Carby a quelques questions à te poser pour définir ensemble tes
          objectifs ! Promis c'est rapide!
        </Text>
        <View style={styles.btn1Flex}>
          <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
            <Text style={styles.btnText}>C'est parti !</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    width: "30%",
    height: "200px",
    marginBottom: "5%",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
});
