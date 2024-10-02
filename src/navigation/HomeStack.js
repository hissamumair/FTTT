// HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Dashboard/home';
import K2 from '../screens/Dashboard/k2';
import Hickingpoint from '../screens/Dashboard/K2/hickingpoint';
import Campingpoint from '../screens/Dashboard/K2/campingpoint';
import Gadget from '../screens/Dashboard/K2/gadget';
import Safety from '../screens/Dashboard/K2/safety';
""
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="K2" component={K2} />
      {/* <Stack.Screen name="Campingpoint" component={Campingpoint} />
      <Stack.Screen name="Hickingpoint" component={Hickingpoint} />
      <Stack.Screen name="Gadget" component={Gadget} />
            <Stack.Screen name="Safety" component={Safety} /> */}




    </Stack.Navigator>
  );
};

export default HomeStack;
