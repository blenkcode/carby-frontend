import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { determineProfile, generateTasks } from "../data/userProfile";
import { setProfile, setTasks } from "../reducers/user";

const URL_BACKEND = "https://carby-backend.vercel.app";

const questions = [
  {
    id: "q1",
    text: "Quelle quantité d’eau utilisez-vous pour votre bain/douche ? 🛀",
    answers: ["Economique", "Modérée", "Excessive"],
  },
  {
    id: "q2",
    text: "Combien de fois par semaine consommez-vous de la viande ? 🍖",
    answers: ["Jamais", "1-2 fois", "3-5 fois", "Plus de 5 fois"],
  },
  {
    id: "q3",
    text: "Utilisez-vous des sacs réutilisables pour vos courses ? 🛍️",
    answers: ["Toujours", "Souvent", "Rarement", "Jamais"],
  },
  {
    id: "q4",
    text: "Laissez vous les lumières allumées lorsque vous quittez une pièce ? 💡",
    answers: ["Toujours", "Souvent", "Rarement", "Jamais"],
  },
  {
    id: "q5",
    text: "Privilégiez-vous les produits locaux/de saison ? 🥒🥕👩‍🌾",
    answers: ["Toujours", "Souvent", "Rarement", "Jamais"],
  },
  {
    id: "q6",
    text: "Triez-vous les déchets ? ♻️",
    answers: ["Toujours", "Souvent", "Rarement", "Jamais"],
  },
  {
    id: "q7",
    text: "Allez-vous prêcher la bonne parole à la gare sur votre temps libre ? 🗣️",
    answers: ["Toujours", "Souvent", "Rarement", "Jamais"],
  },
];

const QuestionsScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.value._id);

  console.log("userID", userId);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, submit answers
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const profile = determineProfile(answers);
    const tasks = generateTasks(profile);
    console.log(tasks);
    //dispatch(setProfile(profile));
    //dispatch(setTasks(tasks));

    fetch(`${URL_BACKEND}/users/${userId}/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks }),
    })
      .then((response) => {
        console.log("Response:", response);
        return response.json(); // Ensure response is parsed correctly as JSON
      })
      .then((data) => {
        console.log("Tasks update response:", data);
      })
      .catch((error) => {
        console.error("Error updating tasks:", error);
      });

    navigation.navigate("TabNavigator", { screen: "Tasks" });
  };

  return (
    <ImageBackground
      source={require("../assets/Welcome.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{currentQuestion.text}</Text>
      </View>

      {currentQuestion.answers.map((response) => (
        <TouchableOpacity
          style={styles.btn}
          key={response}
          onPress={() => handleAnswer(response)}
        >
          <Text style={styles.btnText}>{response}</Text>
        </TouchableOpacity>
      ))}
    </ImageBackground>
  );
};

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
    marginTop: "30%",
    marginBottom: "15%",
  },
  text1: {
    fontSize: 40,
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
    height: "7%",
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 35,
    paddingTop: "5%",
    paddingBottom: "15%",
  },
  user: {
    color: "yellow",
  },
});

export default QuestionsScreen;
