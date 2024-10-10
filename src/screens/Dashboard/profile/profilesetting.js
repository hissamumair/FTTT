import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Import AntDesign for eye icon

export default function ProfileSetting() {
  const navigation = useNavigation(); // Access the navigation object
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleBackPress = () => {
    navigation.goBack("Profileshare"); // Go back to the previous screen
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState); // Toggle password visibility
  };

  return (
    <View style={{ height: '100%' }}>
      <Image 
        style={{ 
          height: '30%',  // Set height to 30% of the screen
          width: '100%', 
          resizeMode: 'cover' 
        }} 
        source={require('../../../assets/icons/wellcome.png')} 
      />
      <TouchableOpacity 
        style={{
          position: 'absolute', 
          margin: 15,
          borderRadius: 1,
          borderWidth: 1,
          height: 25, // Adjust height for better touch area
          width: 25, // Adjust width for better touch area
          backgroundColor: "green",
          opacity: 0.8,
          justifyContent: 'center',
          alignItems: 'center',
        }} 
        onPress={handleBackPress}
      >
        <MaterialIcon name="arrow-back" size={20} color="white" />
      </TouchableOpacity>
     
      <View style={{
        position: 'absolute', 
        top: 60,  
        left: 20,  
        width: '50%', 
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>
          Welcome to
        </Text>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'green' }}>
          Settings
        </Text>
      </View>
      
      <View style={{ justifyContent: "center", padding: 20 }}>
        <View style={{
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          marginBottom: 5, 
          borderWidth: 1, 
          borderRadius: 5, 
          borderColor: "grey", 
          padding: 10, // Padding for better text spacing
          width: "100%" // Full width for consistency
        }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#333', width: '45%' }}>
            Password
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '55%', justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 10, color: '#333', textAlign: 'right' }}>
              {showPassword ? 'YourPassword' : '*******'}
            </Text>
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <AntDesign name={showPassword ? "eye" : "eyeo"} size={20} color="#333" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Change Password Button below the password view */}
        <TouchableOpacity style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 10, color: 'green', textAlign: 'right' }}>Change Password</Text>
        </TouchableOpacity>

        <View style={{
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          marginBottom: 5, 
          borderWidth: 1, 
          borderRadius: 5, 
          borderColor: "grey", 
          padding: 10, 
          width: "100%" 
        }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#333', width: '45%' }}>
            Change payment method
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 10, color: 'green' }}>Change</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          marginBottom: 5, 
          borderWidth: 1, 
          borderRadius: 5, 
          borderColor: "grey", 
          padding: 10, 
          width: "100%" 
        }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#333', width: '45%' }}>
            Travel history
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 10, color: 'green' }}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
