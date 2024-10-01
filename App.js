// App.js
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";
// import TabNavigator from './src/navigation/TabNavigator';
import SplashScreen from "./src/screens/SplashScreen/SplashScreen";
import HomeStack from "./src/navigation/HomeStack";
import {createStackNavigator} from "@react-navigation/stack";
import TabNavigator from "./src/navigation/TabNavigator";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{headerShown: false}}
        />
       
        <Stack.Screen
          name="BottomTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
