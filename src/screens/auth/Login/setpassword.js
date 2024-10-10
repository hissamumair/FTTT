import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Setpassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleConfirm = () => {
    if (newPassword === confirmPassword) {
      // Navigate to the Login screen after setting the password
      navigation.navigate("Login");
      console.log('New Password:', newPassword);
    } else {
      console.log('Passwords do not match');
    }
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
        Please set your new password
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
        placeholder="New Password"
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
      />

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
        placeholder="Confirm Password"
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
        }}>
          Change Password
        </Text>
      </TouchableOpacity>
    </View>
  );
}
