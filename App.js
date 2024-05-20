import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator>
      </Tab.Navigator>
    );
  };
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

