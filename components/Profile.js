import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import {
  addLvl,
  removeXp,
  resetXp,
  removeLvl,
  resetPreviousXp,
} from "../reducers/user";
import * as Progress from "react-native-progress";
import { images } from "../assets/badges";

const Profil = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.value.username);
  const URL_BACKEND = "https://carby-backend.vercel.app";
  const token = useSelector((state) => state.user.value.token);

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
    const lvl = useSelector((state) => state.user.value.lvl);
    //maj du lvl du user fetch non fonctionel
    useEffect(() => {
      fetch(`${URL_BACKEND}/users/lvl/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lvl }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("lvl update response:", data);
        })
        .catch((error) => {
          console.error("Error updating lvl:", error);
        });
    }, [lvl]);

    return (
      <View style={styles.Xpcontainer}>
        <Progress.Bar
          progress={progress}
          width={200}
          height={12}
          color="#4C956C"
          borderRadius={10}
          backgroundColor="white"
          borderColor="grey"
        />
      </View>
    );
  };
  const xp = useSelector((state) => state.user.value.xp);
  const lvl = useSelector((state) => state.user.value.lvl);
  const allBadges = () => {
    return (
      <View style={styles.container}>
        {Object.keys(images)
          .slice(0, 3)
          .map((key, index) => (
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
  //<View style={styles.leftLine}></View>
  //  <View style={styles.rightLine}></View>
  return (
    <View style={styles.profilcontainer}>
      <View style={styles.cardcontainerwhite}>
        <View style={styles.cardcontainer}>
          <View style={styles.imgborder}>
            <Image
              style={styles.imgProfil}
              source={require("../assets/profilpic.png")}
            />
          </View>

          <View style={styles.submenu}>
            <FontAwesome
              style={styles.submenuIconLeft}
              name="address-book"
              size={50}
              color="#000"
            />
            <Text style={styles.username}>{username}</Text>
            <FontAwesome
              style={styles.submenuIconRight}
              name="gear"
              size={55}
              color="#000"
            />
          </View>
          <View style={styles.progresscontainer}>
            <Text style={styles.textxp}>LVL {lvl}</Text>
            <ExperienceProgressBar />
            <Text style={styles.textxp}>{xp} / 300 XP</Text>
          </View>
          <Text style={styles.titlebadge}>Badges à venir:</Text>
          <View style={styles.badgesContainer}>{allBadges()}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilcontainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#4C956C",
    alignItems: "center",
    paddingBottom: "32%",
    marginTop: "21%",
  },
  cardcontainer: {
    backgroundColor: "#2C6E49",
    alignItems: "center",
    width: "97%",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
  },
  cardcontainerwhite: {
    backgroundColor: "#fefee3",
    alignItems: "center",
    width: "90%",
    borderRadius: 20,
  },
  leftLine: {
    width: 5,
    height: 700,
    position: "absolute",
    backgroundColor: "#fefee3",
    left: "4%",
  },
  rightLine: {
    width: 5,
    height: 700,
    position: "absolute",
    backgroundColor: "#fefee3",
    left: "9%",
  },
  imgProfil: {
    width: 150,
    height: 150,
    borderRadius: 1000,
    position: "absolute",
  },
  submenu: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 40,
    marginTop: 60,
  },
  progresscontainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefee3",

    width: 250,
    height: 80,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  Xpcontainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
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
  submenuIconLeft: {
    marginRight: 50,
    color: "#fefee3",
  },
  submenuIconRight: {
    marginLeft: 50,
    color: "#fefee3",
  },
  imgborder: {
    backgroundColor: "#fefee3",
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 200,
    position: "absolute",
    top: "-15%",
  },
  imgLine: {
    width: "93%",
    height: 5,
    backgroundColor: "#fefee3",
    position: "absolute",
    zIndex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  badgesContainer: {
    backgroundColor: "#2C6E49",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    paddingTop: 40,
  },

  badgeContainer: {
    width: "28%",
    height: 150,

    //backgroundColor: "green",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 1500,
    resizeMode: "contain",
  },
  badgeTitle: {
    textAlign: "center",

    fontSize: 12,
    paddingTop: 10,
    color: "#fefee3",
    fontWeight: "bold",
    fontFamily: "Helvetica",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  titlebadge: {
    color: "#fefee3",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 50,
  },
  username: {
    color: "#fefee3",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Profil;