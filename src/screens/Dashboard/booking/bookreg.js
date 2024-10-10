import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign'; // Renamed AntDesign import to AntIcon
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const Bookreg = () => {
    const navigation = useNavigation(); // Get the navigation object
    // const handleBackPress = () => {
    //   navigation.goBack("Booking"); 
    // };
    const handleBackPress = () => {
      if (navigation.canGoBack()) {
        navigation.goBack(); // Only go back if there's a previous screen
      } else {
        navigation.navigate('Booking'); // Navigate to 'Booking' screen if there's no screen to go back to
      }
    };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '30%' }}>
        <Image 
          style={{ height: '100%', width: '100%', resizeMode: 'cover' }} 
          source={require('../../../assets/icons/wellcome.png')} 
        />
        <TouchableOpacity 
          style={{
           position: 'absolute', 
           // padding: 20,
            margin:15,
            borderRadius:1,
            borderWidth:1,
            height:30,
            opacity:0.8,
            width:35,
            backgroundColor:"green",
          }} 
          onPress={handleBackPress}
        >
          <MaterialIcon name="arrow-back" size={20} color="white" /> 
          </TouchableOpacity>
        <View style={{ position: 'absolute', top: '30%', marginHorizontal: 30 }}>
          <Text style={{ fontSize: 15, color: 'black' }}>
            Welcome to
          </Text>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'green' }}>
            Book your 
          </Text>
          <Text style={{ fontSize: 15, color: 'black' }}>
            hiking trip
          </Text>
        </View>
      </View>

      <View style={{ justifyContent: 'center', padding: 20 }}>
        <Text style={{ fontWeight: '400', fontSize: 14, color: 'black', marginTop: 4 }}>
          Select departure date
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        <View style={{ position: 'relative' }}>
          <TextInput 
            placeholder="Select Date"
            style={{ 
              borderWidth: 1, 
              borderColor: 'green', 
              borderRadius: 15, 
              padding: 10, 
              marginBottom: 10, 
              paddingRight: 40 // Ensure padding for icon
            }} 
          />
          <Icon 
            name="down" 
            size={20} 
            color="green" 
            style={{ 
              position: 'absolute', 
              right: 10, 
              top: 12 // Adjust top position as needed
            }} 
          />
        </View>

        <TextInput 
          placeholder="Full Name"
          style={{ 
            borderWidth: 1, 
            borderColor: 'green', 
            borderRadius: 15, 
            padding: 10, 
            marginBottom: 10 
          }} 
        />
        <TextInput 
          placeholder="Select Gender"
          style={{ 
            borderWidth: 1, 
            borderColor: 'green', 
            borderRadius: 15, 
            padding: 10, 
            marginBottom: 10 
          }} 
        />
        <TextInput 
          placeholder="Email Id"
          style={{ 
            borderWidth: 1, 
            borderColor: 'green', 
            borderRadius: 15, 
            padding: 10, 
            marginBottom: 10 
          }} 
        />
        <TextInput 
          placeholder="Contact Number"
          style={{ 
            borderWidth: 1, 
            borderColor: 'green', 
            borderRadius: 15, 
            padding: 10, 
            marginBottom: 10 
          }} 
        />

        <TouchableOpacity
  style={{
    backgroundColor: 'green', // Button background color
    borderRadius: 10,
    paddingVertical: 10, // Vertical padding
    alignItems: 'center', // Center the text horizontally
    marginTop: 10, // Space above the button
    borderWidth: 1,
    width:"70%",
    alignSelf:"center",
    borderColor: 'darkgreen',
    opacity: 0.7, // Apply opacity to the button background
  }}
  onPress={() => {
    navigation.reset({
        index: 0, // Index of the active route
        routes: [{ name: 'HomeStack', params: { screen: 'Bokkpayment' } }], // Resetting to HomeStack with bookreg screen
      });
    console.log('Register button pressed');
  }}
>
  <View style={{ opacity: 1 }}>
    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
      Register and Next
    </Text>
  </View>
</TouchableOpacity>

      </View>
    </View>
  );
};

export default Bookreg;
