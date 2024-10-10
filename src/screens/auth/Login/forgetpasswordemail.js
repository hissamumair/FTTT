import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Forgetpasswordemail() {
  const [pin, setPin] = useState(['', '', '', '']);
const navigation=useNavigation();
  // Function to update pin digit by index
  const handlePinChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
  };

  const handleConfirm = () => {
    navigation.navigate("Setpassword")
    // console.log('Email submitted:', email);
  };
  return (
    <View style={{
      flex: 1,
      padding: 40,
      backgroundColor: '#f9f9f9',
      justifyContent: 'flex-start',
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 10,
        alignSelf: "center",
      }}>
        Forget Password
      </Text>
      <Text style={{
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 20,
        color: 'black',
      }}>
        We are sending a security code to your email A****3@gmail.com, please enter the code here!
      </Text>
      
      {/* 4-digit pin inputs */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            style={{
              width: 45,
              height: 45,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 5,
              textAlign: 'center',
              fontSize: 18,
              marginRight: index !== 4 ? 15 : 0, // Reduced spacing, no margin after the last input
            }}
            maxLength={1} // Allow only one digit per input
            keyboardType="number-pad"
            value={digit}
            onChangeText={(value) => handlePinChange(value, index)}
          />
        ))}
      </View>
      
      <TouchableOpacity 
        style={{
          backgroundColor: 'rgba(0, 128, 0, 0.6)', // Apply opacity to the background color only
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
        }} 
        onPress={handleConfirm}
      >
        <Text style={{
          color: 'white',
          fontSize: 16,
          textAlign: 'center',
          opacity: 2, // Keep the text fully opaque
        }}>
          Confirm
        </Text>
      </TouchableOpacity>
    </View>
  );
}
