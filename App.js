// App.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import EyesIcon from "./assets/EyesIcon"; // Importer le composant SVG

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
import FeedScreen from "./screens/FeedScreen";
import BadgesScreen from "./screens/BadgesScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

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

          if (route.name === "Feed") {
            iconName = "comments";
          } else if (route.name === "Articles") {
            iconName = "list-alt";
          } else if (route.name === "Badges") {
            iconName = "trophy";
          } else if (route.name === "Tasks") {
            iconName = "check-circle";
          }

          if (route.name === "Carby") {
            return <EyesIcon width={100} height={100} fill={color} />;
          } else {
            return <FontAwesome name={iconName} color={color} size={35} />;
          }
        },
        tabBarActiveTintColor: "#4C956C",
        tabBarInactiveTintColor: "#FEFEE3",
        tabBarStyle: {
          backgroundColor: "#403d39",
          borderTopWidth: 0,
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 20,
          height: 90,
          paddingTop: 30,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Articles" component={ArticlesScreen} />
      <Tab.Screen name="Carby" component={CarbyScreen} />
      <Tab.Screen name="Badges" component={BadgesScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Comfortaa: require("./assets/fonts/Comfortaa-Regular.ttf"),
      Comfortaa_Bold: require("./assets/fonts/Comfortaa-Bold.ttf"),
      Comfortaa_Light: require("./assets/fonts/Comfortaa-Light.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Questions" component={QuestionsScreen} />
          <Stack.Screen name="FeedScreen" component={FeedScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
