import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Task from "../components/Task";
import { useDispatch } from "react-redux";
import { addXp, removeXp } from "../reducers/user";

const Tasks = [
  {
    name: "Trier le verre",
    description:
      "Qu'est-ce que le tri ? Le tri des déchets regroupe toutes les actions consistant à séparer et récupérer les déchets selon leur nature pour les valoriser et ainsi réduire au maximum la quantité de déchets ménagers résiduels*, non recyclables. Ce sont des gestes quotidiens, faits par tous, pour tous.",
    img: require("../assets/trie.png"),
  },
  {
    name: "Economie de l'eau",
    description:
      "Prendre une douche en 4 minutes et oublier le bain : une économie de 130 litres d'eau à chaque douche. Arroser « à la fraîche » et économiser 6 litres d'eau par m² arrosé. Poser un régulateur sur ses robinets et un mécanisme WC à double commande : économie de 35 000 litres d'eau par an.",
    img: require("../assets/water.jpeg"),
  },
  {
    name: "Transports verts",
    description:
      "Cela peut être la marche, le vélo, la trottinette, le skate, le roller... Ces façons de se déplacer, en plus d'être respectueuses de l'environnement car n'émettant pas directement de gaz à effet de serre, s'avèrent vertueuses notamment en termes d'activité physique, de pollution sonore, de réduction du trafic",
    img: require("../assets/velo.jpeg"),
  },
  {
    name: "Courses vertes",
    description:
      "La clé d'une alimentation plus responsable est, avant tout, de choisir des produits de saison. Prenons l'exemple des fruits et légumes : en choisissant des fruits et légumes produits par des producteurs locaux vous limiterez les émissions dues au transport tout en participant à l'économie locale.",
    img: require("../assets/course.jpeg"),
  },
  // Ajouter d'autres tâches si nécessaire
];

export default function TasksScreen({ navigation }) {
  const taskComponents = Tasks.map((task) => (
    <Task key={task.name} task={task} isLikedInit={false} />
  ));

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>{taskComponents}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#3F5FFF",
    height: "150%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3F5FFF",
    height: "120%",
  },
});