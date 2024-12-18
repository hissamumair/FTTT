

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { BottomNavigation } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// import Booking from '../screens/Dashboard/booking/booking';
// import Home from '../screens/Dashboard/home';
// // import Search from '../components/Search';
// import { CommonActions } from '@react-navigation/native';
// import Profile from '../screens/Dashboard/profile/Profile';
// import Currency from '../screens/Dashboard/currency';

// const Tab = createBottomTabNavigator();

// export default function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={({ navigation, state, descriptors, insets }) => (
//         <BottomNavigation.Bar
//           navigationState={state}
//           safeAreaInsets={insets}
//           onTabPress={({ route, preventDefault }) => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (event.defaultPrevented) {
//               preventDefault();
//             } else {
//               navigation.dispatch({
//                 ...CommonActions.navigate(route.name, route.params),
//                 target: state.key,
//               });
//             }
//           }}
//           renderIcon={({ route, focused, color }) => {
//             const { options } = descriptors[route.key];
//             if (options.tabBarIcon) {
//               return options.tabBarIcon({ focused, color, size: 24 });
//             }
//             return null;
//           }}
//           getLabelText={({ route }) => {
//             const { options } = descriptors[route.key];
//             const label =
//               options.tabBarLabel !== undefined
//                 ? options.tabBarLabel
//                 : options.title !== undefined
//                 ? options.title
//                 : route.title;

//             return label;
//           }}
//         />
//       )}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => {
//             return <Icon name="home" size={size} color={color} />;
//           },
//         }}
//       />
//      <Tab.Screen
//   name="Currency"
//   component={Currency}
//   options={{
//     tabBarLabel: 'Currency',
//     tabBarIcon: ({ color, size }) => {
//       return <MaterialIcons name="currency-exchange" size={size} color={color} />; // Use any currency icon like "dollar"
//     },
//   }}
// />
//       <Tab.Screen
//         name="Booking"
//         component={Booking}
//         options={{
//           tabBarLabel: 'Booking',
//           tabBarIcon: ({ color, size }) => {
//             return <Icon name="calendar-check" size={size} color={color} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ color, size }) => {
//             return <Icon name="account" size={size} color={color} />;
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// }


import React from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Text } from 'react-native-paper'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';  
import { 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  Dimensions 
} from 'react-native';  

import Booking from '../screens/Dashboard/booking/booking'; 
import Home from '../screens/Dashboard/home'; 
import Profile from '../screens/Dashboard/profile/Profile'; 
import Currency from '../screens/Dashboard/currency'; 

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();  

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {state.routes.map((route,index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            
            if (!event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
            >
              <View 
                style={[
                  styles.tabIconWrapper,
                  {
                    backgroundColor: isFocused 
                      ? 'rgba(33, 150, 243, 0.1)' 
                      : 'transparent'
                  }
                ]}
              >
                {options.tabBarIcon && options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused 
                    ? '#2196F3' 
                    : '#8E8E93',
                  size: 24
                })}
              </View>
              
              {isFocused && (
                <View style={styles.activeIndicator} />
              )}
              
              <Text 
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused 
                      ? '#2196F3' 
                      : '#8E8E93',
                    fontWeight: isFocused 
                      ? '600' 
                      : '400'
                  }
                ]}
              >
                {options.tabBarLabel || route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Currency"
        component={Currency}
        options={{
          tabBarLabel: 'Currency',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons 
              name="currency-exchange" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={Booking}
        options={{
          tabBarLabel: 'Booking',
          tabBarIcon: ({ color, size }) => (
            <Icon 
              name="calendar-check" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon 
              name="account" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E9E9E9',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2196F3',
  },
  tabLabel: {
    fontSize: 10,
    letterSpacing: 0.5,
  },
});