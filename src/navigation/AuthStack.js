// AuthStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/Login/Login';
import signup1 from '../screens/auth/Signup/signup1';
import Forgetpassword from '../screens/auth/Login/forgetpassword';
import Forgetpasswordemail from '../screens/auth/Login/forgetpasswordemail';
import Setpassword from '../screens/auth/Login/setpassword';

// import Forgetpasswordemail from '../screens/auth/Login/orgetpasswordemail';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="signup1" component={signup1} />
      <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
      <Stack.Screen name="Forgetpasswordemail" component={Forgetpasswordemail} />
      <Stack.Screen name="Setpassword" component={Setpassword} />




    </Stack.Navigator>
  );
};

export default AuthStack;
