// HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Dashboard/home';
import K2 from '../screens/Dashboard/k2';
import Camping from '../screens/Dashboard/camping';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="K2" component={K2} />
      <Stack.Screen name="Camping" component={Camping} />


    </Stack.Navigator>
  );
};

export default HomeStack;
