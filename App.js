import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SignUpScreen from "./screens/SignUpScreen";

import SignInScreen from "./screens/SignInScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import QuestionsScreen from "./screens/QuestionsScreen";
import ArticlesScreen from "./screens/ArticlesScreen";
import CarbyScreen from "./screens/CarbyScreen";
import TasksScreen from "./screens/TasksScreen";
import ProfilScreen from "./screens/ProfilScreen";
import BadgesScreen from "./screens/BadgesScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { user },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Carby") {
            iconName = "eye";
          } else if (route.name === "Feed") {
            iconName = "tree";
          } else if (route.name === "Articles") {
            iconName = "film";
          } else if (route.name === "Badges") {
            iconName = "podcast";
          } else if (route.name === "Tasks") {
            iconName = "tumblr";
          }

          return (
            <FontAwesome
              name={iconName}
              style={{ alignSelf: "center", marginTop: 30 }}
              size={30}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#6DC934",
        tabBarInactiveTintColor: "#335561",
        tabBarStyle: {
          backgroundColor: "#FFDF3F",
          borderTopWidth: 0, // Pour enlever la bordure en haut
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 20,
          height: 90,

          display: "flex",
          justifyContent: "center",
        },
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          borderTopWidth: 0, // Pour enlever la bordure en haut
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={CarbyScreen} />
      <Tab.Screen name="Articles" component={ArticlesScreen} />
      <Tab.Screen name="Carby" component={CarbyScreen} />

      <Tab.Screen name="Badges" component={CarbyScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Questions" component={QuestionsScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
