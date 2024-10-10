



// import React from 'react';
// import {View, Text, Image, TouchableOpacity} from 'react-native';
// import {Button, TextInput} from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';

// export default function Login() {
//   const navigation = useNavigation();

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Image
//         source={require('../../../assets/icons/splash.png')}
//         style={{ width: '100%', height: '100%', position: 'absolute' }}
//         resizeMode="cover"
//       />
//       <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
//       <View style={{
//         width: '95%',
//         padding: 20,
//         backgroundColor: 'rgba(30, 30, 30, 0.8)',
//         borderRadius: 10,
//         height: '70%',
//         marginTop: 230,
//       }}>
//         <Text style={{
//           fontSize: 24,
//           fontWeight: 'bold',
//           textAlign: 'center',
//           marginBottom: 20,
//           color: 'white',
//         }}>Login</Text>

//         <TextInput
//           label="Email ID"
//           mode="outlined"
//           style={{ marginBottom: 15, backgroundColor: 'rgba(30, 30, 30, 0.8)' }}
//           placeholder="Enter your email"
//           placeholderTextColor="rgba(255, 255, 255, 0.6)"
//           theme={{ colors: { primary: 'white', underlineColor: 'transparent' }}}
//           labelStyle={{ color: 'white', fontSize: 16 }}
//           contentStyle={{ height: 45 }}
//         />
//         <TextInput
//           label="Password"
//           mode="outlined"
//           secureTextEntry
//           style={{ marginBottom: 15, backgroundColor: 'rgba(30, 30, 30, 0.8)' }}
//           placeholder="Enter your password"
//           placeholderTextColor="rgba(255, 255, 255, 0.6)"
//           theme={{ colors: { primary: 'white', underlineColor: 'transparent' }}}
//           labelStyle={{ color: 'white', fontSize: 16 }}
//           contentStyle={{ height: 45 }}
//         />

//         <TouchableOpacity onPress={() => navigation.navigate('Forgetpassword')}>
//           <Text style={{
//             textAlign: 'right',
//             marginBottom: 10,
//             color: 'white',
//           }}>Forgot Password?</Text>
//         </TouchableOpacity>

//         <Button
//           mode="contained"
//           style={{ marginTop: 10, backgroundColor: 'white' }}
//           labelStyle={{ color: 'black' }}>
//           Log In
//         </Button>

//         <Button
//           mode="outlined"
//           style={{ marginTop: 10, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 1 }}
//           labelStyle={{ color: 'white' }}
//           onPress={() => navigation.navigate('signup1')}>
//           Sign Up
//         </Button>

//         <Text style={{
//           textAlign: 'center',
//           color: 'white',
//           marginVertical: 29,
//         }}>
//           ------------ or login with ----------
//         </Text>

//         <View style={{
//           marginVertical: 20,
//           flexDirection: 'row',
//           justifyContent: 'center',
//         }}>
//           <View style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             width: 90,
//           }}>
//             <Image
//               source={require('../../../assets/icons/google.png')}
//               style={{ width: 35, height: 35, marginHorizontal: 25, left: -40 }}
//             />
//             <Image
//               source={require('../../../assets/icons/facebook.png')}
//               style={{ width: 35, height: 35, marginHorizontal: 25, left: -40 }}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Checkbox, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Admin');
  const roles = ['Admin', 'User', 'Guest']; // Example roles
  const navigation = useNavigation();

  const handleLogin = () => {
navigation.navigate("BottomTabs")
    console.log('Logging in with', email, password);
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
        Login
      </Text>

      {/* Role Selection Menu */}
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
        label="Email ID"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={{ marginBottom: 10, marginTop: 10 }} // Added marginTop for spacing
        keyboardType="email-address"
      />

      {/* Password Input */}
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
        style={{ marginBottom: 15 }}
      />

      {/* Row for checkbox and forget password */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
          <Text style={{ fontSize: 14 }}>Remember me</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Forgetpassword')}>
          <Text style={{ fontSize: 14, color: 'green' }}>Forget password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
  onPress={handleLogin}
  style={{
    marginBottom: 20,
    opacity:0.8,
    backgroundColor: 'green',
    paddingVertical: 10, // Adjust vertical padding as needed
    borderRadius: 5, // Optional: Add border radius for rounded corners
    alignItems: 'center', 
  }}
>
  <Text style={{ fontSize: 18, color: 'white' }}>Login</Text>
</TouchableOpacity>
      <Text style={{ textAlign: 'center', marginBottom: 20,color:"black" }}>
        If you don't have an account. To create an account please{' '}
        <Text style={{ color: 'green' }} onPress={() => navigation.navigate('signup1')}>
          sign up
        </Text>
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
  <View style={{ flex: 1, height: 1, backgroundColor: '#ccc', marginRight: 10 ,color:"black"}} />
  <Text style={{ textAlign: 'center', marginHorizontal: 10 ,color:"black"}}>Or login with</Text>
  <View style={{ flex: 1, height: 1, backgroundColor: '#ccc', marginLeft: 10 ,color:"black"}} />
</View>

<View style={{ width: '100%', alignItems: 'center' }}>
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
