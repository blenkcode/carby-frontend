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
import CarbyScreen from "./screens/CarbyScreen";
import TasksScreen from "./screens/TasksScreen";

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
            iconName = "eye"; // Change le nom de l'icône pour qu'il corresponde
          } else if (route.name === "Feed") {
            iconName = "tree";
          } else if (route.name === "Articles") {
            iconName = "film";
          } else if (route.name === "Badges") {
            iconName = "podcast";
          } else if (route.name === "Tasks") {
            iconName = "tumblr";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6DC934",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={CarbyScreen} />
      <Tab.Screen name="Articles" component={CarbyScreen} />
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
          <Stack.Screen name="TabNavigator" component={TabNavigator} />

          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Questions" component={QuestionsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
