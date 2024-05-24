import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Task from "../components/Task";
import { useSelector, useDispatch } from "react-redux";

export default function TasksScreen({ navigation }) {
  const URL_BACKEND = "https://carby-backend.vercel.app";
  const token = useSelector((state) => state.user.value.token);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${URL_BACKEND}/users/tasks/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Tasks for this user:", data);

        setTasks(data.tasks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const taskComponents = tasks.map((task) => (
    <Task key={task._id} task={task} isLikedInit={false} />
  ));
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Objectifs</Text>
      </View>
      <View style={styles.container}>{taskComponents}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start", // Changer à "flex-start" pour s'assurer que le contenu commence au début
    alignItems: "center",
    backgroundColor: "#4c956c",
    paddingVertical: 0,
    paddingBottom: 120, // Ajouter du padding pour l'espacement
  },
  titleContainer: {
    flex: 0.2,
    backgroundColor: "#2c6e49",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 0,
    marginTop: 90,
  },
});
