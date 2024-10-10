import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
const navigation=useNavigation();
  const handleConfirm = () => {
    navigation.navigate("Forgetpasswordemail")
    console.log('Email submitted:', email);
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
        alignSelf:"center",
      }}>
        Forget Password
      </Text>
      <Text style={{
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 20,
        color: 'black',
      }}>
        Please enter your email ID to reset your password.
      </Text>
      <TextInput
        style={{
          width: '100%',
          height: 45,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          marginBottom: 20,
        }}
        placeholder="Email ID"
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        value={email}
        onChangeText={setEmail}
      />
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
