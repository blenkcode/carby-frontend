import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import {
  addLvl,
  removeXp,
  resetXp,
  removeLvl,
  resetPreviousXp,
  addImgProfil,
} from "../reducers/user";
import * as Progress from "react-native-progress";
import { images } from "../assets/badges";
import SkinsPopUp from "../components/SkinsPopUp";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

// const avatars = [
//   require("../assets/avatar1.png"),
//   require("../assets/avatar2.png"),
//   require("../assets/avatar3.png"),
//   require("../assets/avatar4.png"),
// ];

// const avatar = avatars[Math.floor(Math.random() * avatars.length)];

const Profil = ({}) => {
  const [avatar, setAvatar] = useState(null);
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
      }).then((response) => {
        return response.json();
      });
      // .then((data) => {
      //   console.log("lvl update response:", data);
      // })
      // .catch((error) => {
      //   console.error("Error updating lvl:", error);
      // });
    }, [lvl]);

    useEffect(() => {
      fetch(`${URL_BACKEND}/users/xp/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ xp }),
      }).then((response) => {
        return response.json();
      });
      // .then((data) => {
      //   console.log("xp update response:", data);
      // })
      // .catch((error) => {
      //   console.error("Error updating xp:", error);
      // });
    }, [xp]);

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

  const [isModal2Visible, setModal2Visible] = useState(false);

  const toggleModal2 = () => {
    console.log("hello");
    setModal2Visible(!isModal2Visible);
  };
  //<View style={styles.leftLine}></View>
  //  <View style={styles.rightLine}></View>
  const openCamera = async () => {
    // Demander les permissions de la caméra
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    // Ouvrir la caméra frontale
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled) {
      setAvatar({ uri: result.assets[0].uri });
    }
  };
  useEffect(() => {
    if (avatar) {
      const imgProfil = avatar.uri;
      const formData = new FormData();
      formData.append("imgProfil", {
        uri: avatar.uri,
        name: "profile.jpg", // ou tout autre nom de fichier approprié
        type: "image/jpeg", // ou le type MIME approprié de votre image
      });
      fetch(`${URL_BACKEND}/users/imgProfil/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imgProfil }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server response:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      dispatch(addImgProfil(avatar.uri));
    }
  }, [avatar]);

  const avatar2 = useSelector((state) => state.user.value.imgProfil);
  console.log("avatar2:", avatar2);

  // useEffect(() => {
  //   if (!avatar2 === null) {
  //     console.log("avatar2:", avatar2);
  //     fetch(`${URL_BACKEND}/users/imgProfil/${token}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ avatar2 }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Server response:", data);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   }
  // }, [avatar2]);

  return (
    <View style={styles.profilcontainer}>
      <View style={styles.cardcontainerwhite}>
        <View style={styles.cardcontainer}>
          <View style={styles.imgborder}>
            <TouchableOpacity onPress={openCamera}>
              <Image
                style={styles.imgProfil}
                source={avatar || require("../assets/avatar1.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.submenu}>
            <FontAwesome
              style={styles.submenuIconLeft}
              name="address-book"
              size={50}
              color="#000"
            />
            <Text style={styles.username}>{username}</Text>
            <TouchableOpacity style={styles.skinsicon} onPress={toggleModal2}>
              <FontAwesome
                style={styles.submenuIconRight}
                name="gear"
                size={55}
                color="#000"
              />
            </TouchableOpacity>
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

      <SkinsPopUp isVisible={isModal2Visible} onClose={toggleModal2} />
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
    fontFamily: "Comfortaa",
  },

  cardcontainer: {
    backgroundColor: "#2C6E49",
    alignItems: "center",
    width: "97%",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
    height: 570,
  },
  cardcontainerwhite: {
    backgroundColor: "#fefee3",
    alignItems: "center",
    width: "90%",
    height: 580,
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
  },
  submenu: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 40,
    marginTop: 60,
    fontFamily: "Comfortaa",
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
    fontFamily: "Comfortaa",
  },
  textxp: {
    fontFamily: "Comfortaa",
    fontWeight: "bold",
  },
  submenuIconLeft: {
    marginRight: 50,
    color: "#fefee3",
    fontFamily: "Comfortaa",
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
    height: 150,
    resizeMode: "contain",
  },
  badgeTitle: {
    textAlign: "center",
    fontFamily: "Comfortaa",

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
    fontFamily: "Comfortaa",
    paddingTop: 50,
  },
  username: {
    color: "#fefee3",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Comfortaa",
  },
});

export default Profil;
