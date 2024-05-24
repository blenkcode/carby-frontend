import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, View } from "react-native";

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
          let iconStyle = [styles.icon];

          if (route.name === "Carby") {
            iconStyle.push(styles.iconEyesContainer);
          } else {
            iconStyle.push(styles.iconDefault);
          }

          switch (route.name) {
            case "Carby":
              iconName = "eye";
              break;
            case "Feed":
              iconName = "comments";
              color = "#fefee3";
              iconStyle.push(styles.iconFeed);
              break;
            case "Articles":
              iconName = "list-alt";
              color = "#fefee3";
              iconStyle.push(styles.iconArticles);
              break;
            case "Badges":
              iconName = "trophy";
              color = "#fefee3";
              iconStyle.push(styles.iconBadges);
              break;
            case "Tasks":
              iconName = "bars";
              color = "#fefee3";
              iconStyle.push(styles.iconTasks);
              break;
            default:
              break;
          }

          if (route.name === "Carby") {
            return (
              <View style={styles.eyesContainer}>
                <Image
                  style={styles.iconEyes}
                  source={require("./assets/eyes.png")}
                />
              </View>
            );
          } else {
            return (
              <FontAwesome
                name={iconName}
                style={[...iconStyle, { color }]}
                size={35}
              />
            );
          }
        },
        tabBarActiveTintColor: "#6DC934",
        tabBarInactiveTintColor: "#335561",
        tabBarStyle: {
          backgroundColor: "#403d39",
          borderTopWidth: 0,
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 20,
          height: 90,
          display: "flex",
          justifyContent: "center",
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
      <Tab.Screen name="Feed" component={CarbyScreen} />
      <Tab.Screen name="Articles" component={ArticlesScreen} />
      <Tab.Screen name="Carby" component={CarbyScreen} />
      <Tab.Screen name="Badges" component={BadgesScreen} />
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

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    marginTop: 30,
  },
  iconDefault: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  iconFeed: {
    marginTop: 25,
  },
  iconArticles: {
    marginTop: 25,
    marginRight: 20,
  },
  iconBadges: {
    marginTop: 20,
    marginLeft: 20,
  },
  iconTasks: {
    marginTop: 20,
    marginRight: 5,
  },
  iconEyesContainer: {
    width: "100%",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  iconEyes: {},
  eyesContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 90,
    width: 120,
    marginTop: 30,
  },
});
