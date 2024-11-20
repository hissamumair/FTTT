// HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Dashboard/home';
import K2 from '../screens/Dashboard/K2/k2';
import Hickingpoint from '../screens/Dashboard/K2/hickingpoint';
import Campingpoint from '../screens/Dashboard/K2/campingpoint';
import Gadget from '../screens/Dashboard/K2/gadget';
import Safety from '../screens/Dashboard/K2/safety';
import Bookreg from '../screens/Dashboard/booking/bookreg';
import Bokkpayment from '../screens/Dashboard/booking/bokkpayment';
import Profileshare from '../screens/Dashboard/profile/profileshare';
import Profilesetting from '../screens/Dashboard/profile/profilesetting';
import Transportbooking from '../screens/Dashboard/booking/transportbooking';
import Carbooking from '../screens/Dashboard/booking/carbooking';
import Carbookingconfirm from '../screens/Dashboard/booking/carbookingconfirm';
import Startchat from '../screens/Dashboard/K2/startchat';
import Menuscreen from '../screens/menuscreen';
// import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}


      <Stack.Screen name="K2" component={K2}/>
      <Stack.Screen name="Bookreg" component={Bookreg}/>
      <Stack.Screen name="Bokkpayment" component={Bokkpayment}/>
      <Stack.Screen name="Profileshare" component={Profileshare} />
      <Stack.Screen name="Profilesetting" component={Profilesetting}/>
      <Stack.Screen name="Transportbooking" component={Transportbooking}/>
      <Stack.Screen name="Carbooking" component={Carbooking} />
      <Stack.Screen name="Carbookingconfirm" component={Carbookingconfirm}/>
      <Stack.Screen name="Menuscreen" component={Menuscreen}/>

      <Stack.Screen name="Startchat" component={Startchat}/>


    </Stack.Navigator>
  );
};

export default HomeStack;
