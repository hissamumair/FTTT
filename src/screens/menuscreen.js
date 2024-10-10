import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function Menuscreen() {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={{ flex: 1 ,justifyContent:"center",alignContent:"center"}}> 
      <View style={{ width: "100%",justifyContent:"center" }}>
        <ImageBackground
          source={require("../assets/icons/wellcome.png")}
          style={{
            height: 200, 
            width: "100%", 
          }}
          resizeMode="cover"
        >
          <IconButton
            icon="arrow-left" 
            size={30}
            iconColor="green"
            onPress={() => navigation.navigate("Home")} 
            style={{ position: 'absolute', top: 20, left: 10 }} 
          />

          <Text style={{ color: "green", fontSize: 36, fontWeight: "bold", marginTop: 90, left: 20 }}>
            Setting 
          </Text>
        </ImageBackground>
      </View>
      
      {/* Left-aligned content container */}
      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: 10 }}>
        <Text style={{ fontSize: 14, color: "black", fontWeight: "bold", margin: 10 }}>
          Main Features:
        </Text>
        
        <TouchableOpacity 
          onPress={() => console.log('Profile Pressed')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 1,
            margin: 5, // Add margin for spacing
          }}
        >
          <Image 
            source={require("../assets/icons/Subtract.png")} // Path to your profile icon
            style={{
              width: 25, // Width of the icon
              height: 25, // Height of the icon
              marginRight: 10, // Space between icon and text
            }} 
          />
          <Text style={{ fontSize: 15, color: 'black' }}>Profile</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 13, color: 'black' ,fontWeight:"bold"}}>App Setting Features</Text>
        <TouchableOpacity 
          onPress={() => console.log('Profile Pressed')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 1,
            margin: 10, // Add margin for spacing
          }}
        >
          <Image 
            source={require("../assets/icons/language.png")} // Path to your profile icon
            style={{
              width: 25, // Width of the icon
              height: 25, // Height of the icon
              marginRight: 10, // Space between icon and text
            }} 
          />
          <Text style={{ fontSize: 15, color: 'black' }}>Change Language</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => console.log('Profile Pressed')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 1,
            margin: 10, // Add margin for spacing
          }}
        >
          <Image 
            source={require("../assets/icons/privacy.png")} // Path to your profile icon
            style={{
              width: 25, // Width of the icon
              height: 25, // Height of the icon
              marginRight: 10, // Space between icon and text
            }} 
          />
          <Text style={{ fontSize: 15, color: 'black' }}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => console.log('Profile Pressed')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 1,
            margin: 10, // Add margin for spacing
          }}
        >
          <Image 
            source={require("../assets/icons/star.png")} // Path to your profile icon
            style={{
              width: 25, // Width of the icon
              height: 25, // Height of the icon
              marginRight: 10, // Space between icon and text
            }} 
          />
          <Text style={{ fontSize: 15, color: 'black' }}>Rate Us</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => console.log('Profile Pressed')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 1,
            margin: 10, // Add margin for spacing
          }}
        >
          <Image 
            source={require("../assets/icons/share.png")} // Path to your profile icon
            style={{
              width: 25, // Width of the icon
              height: 25, // Height of the icon
              marginRight: 10, // Space between icon and text
            }} 
          />
          <Text style={{ fontSize: 15, color: 'black' }}>Share app</Text>
        </TouchableOpacity>
        </View>

      <View>
        {/* Additional content can be added here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
