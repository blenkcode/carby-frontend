import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function SetupScreen({ navigation }) {
  return (
    <View style={styles.globalContainer}>
      {/* BLUE BOX */}
      <View style={styles.profilePictureBox}>
        <View style={styles.profilePictureContainer}>
          <Image
            style={styles.profilePictureImg}
            source={require("../assets/SignUp.png")}
          />
        </View>
      </View>
      {/* GREEN BOX */}
      <View style={styles.usernameBarBox}>
        <MaterialIcons
          style={styles.contactIcon}
          name="contact-page"
          size={50}
          color="black"
        />
        <Text style={styles.usernameBarText}>@Gael38100</Text>
        <MaterialIcons
          style={styles.settingsIcon}
          name="settings"
          size={50}
          color="black"
        />
      </View>
      {/* GREY BOX */}
      <View style={styles.succesContainerBox}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "#3F5FFF",
  },
  //blue box
  profilePictureBox: {
    flex: 2,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePictureContainer: {
    backgroundColor: "white",
    height: 150,
    width: 150,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  profilePictureImg: {
    width: 130,
    height: 130,
    borderRadius: "100%",
  },
  //green box
  usernameBarBox: {
    flex: 0.5,
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactIcon: {
    color: "white",
    marginLeft: 60,
  },
  usernameBarText: {
    fontSize: "25px",
    color: "white",
    fontWeight: "bold",
  },
  settingsIcon: {
    color: "white",
    marginRight: 60,
  },
  //grey box
  succesContainerBox: {
    flex: 4,
    backgroundColor: "grey",
  },
});
