import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";
import SplashScreen from "./src/screens/SplashScreen/SplashScreen";
import HomeStack from "./src/navigation/HomeStack";
import {createStackNavigator} from "@react-navigation/stack";
import TabNavigator from "./src/navigation/TabNavigator";
import Drawer from "./src/navigation/Drawer";
import { Provider } from 'react-redux';
import store from "./src/redux/store";
import { PaperProvider } from "react-native-paper";
import { StripeProvider } from "@stripe/stripe-react-native";
// import store from './store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51QKgHnKdEWJmNYMuq6vCSKkvtRlPR5QswJz9uPHLKPlQ13800LYcSUg5atJ3gWdyBAiNXP8sKkVMD76ym3rpIjNv00TEfgD6PN">

    <Provider store={store}> 
<PaperProvider>

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
</PaperProvider>

    </Provider>
    </StripeProvider>
  );
}
