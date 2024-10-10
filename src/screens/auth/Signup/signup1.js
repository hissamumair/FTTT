import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Checkbox, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Signup1() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for Confirm Password
  const [name, setName] = useState(''); // New state for Name
  const [contactNo, setContactNo] = useState(''); // New state for Contact No
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Admin');
  const roles = ['Admin', 'User', 'Guest']; // Example roles
  const navigation = useNavigation();

  const handleSignup = () => {
    console.log('Signing up with', { name, email, contactNo, password, confirmPassword });
    navigation.navigate('BottomTabs'); // Navigate to the HomeStack
  };
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const selectRole = (role) => {
    setSelectedRole(role);
    closeMenu();
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9', justifyContent: 'flex-start' }}>
      <Text style={{ fontSize: 38, fontWeight: 'bold', color: 'green', textAlign: 'center', marginBottom: 20 }}>
       Sign Up
      </Text>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity
            onPress={openMenu}
            style={{
              marginBottom: 0,
              height: 60,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}
          >
            <Text>{selectedRole}</Text>
            <Icon name="chevron-down" size={17} />
          </TouchableOpacity>
        }
      >
        {roles.map((role) => (
          <Menu.Item key={role} onPress={() => selectRole(role)} title={role} />
        ))}
      </Menu>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={{ marginBottom: 10, marginTop: 10 }}
      />

      <TextInput
        label="Contact No"
        value={contactNo}
        onChangeText={setContactNo}
        mode="outlined"
        style={{ marginBottom: 10 }}
        keyboardType="phone-pad"
      />

      <TextInput
        label="Email ID"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={{ marginBottom: 10, marginTop: 10 }}
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            name={secureTextEntry ? 'eye-off' : 'eye'}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        }
        style={{ marginBottom: 10 }}
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            name={secureTextEntry ? 'eye-off' : 'eye'}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        }
        style={{ marginBottom: 15 }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
          <Text style={{ fontSize: 14 }}>Remember me</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Forgetpassword')}>
          <Text style={{ fontSize: 14, color: 'green' }}>Forget password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSignup}
        style={{
          marginBottom: 20,
          opacity: 0.8,
          backgroundColor: 'green',
          paddingVertical: 10,
          borderRadius: 5,
          alignItems: 'center', 
        }}
      >
        <Text style={{ fontSize: 18, color: 'white' }}>Sign Up</Text>
      </TouchableOpacity>
     
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 0,marginTop:-10 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc', marginRight: 10, }} />
        <Text style={{ textAlign: 'center', marginHorizontal: 10, color: "black" }}>Or login with</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc', marginLeft: 10 }} />
      </View>

      <View style={{ width: '100%', alignItems: 'center',margin:1 }}>
        <TouchableOpacity
          onPress={() => console.log('Google Login')}
          style={{
            width: '90%', 
            height: 50, 
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1, 
            borderColor: '#ccc', 
            borderRadius: 5, 
          }}
        >
          <Image
            source={require('../../../assets/icons/google.png')} 
            style={{ width: 24, height: 24, marginRight: 10 }} 
          />
          <Text style={{ fontSize: 16 }}>Google Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log('Facebook Login')}
          style={{
            width: '90%', 
            height: 50, 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1, 
            borderColor: '#ccc', 
            borderRadius: 5, 
          }}
        >
          <Image
            source={require('../../../assets/icons/facebook.png')} 
            style={{ width: 24, height: 24, marginRight: 10 }} 
          />
          <Text style={{ fontSize: 16 }}>Facebook Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
