import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function SetupScreen({ navigation }) {

    
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Welcome.png")}
        style={styles.backgroundImage}>
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
})