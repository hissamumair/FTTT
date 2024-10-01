import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/icons/splash.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          label="Email ID"
          mode="outlined"
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          theme={{colors: {primary: 'white', underlineColor: 'transparent'}}}
          labelStyle={styles.label}
          contentStyle={styles.inputContent}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          theme={{colors: {primary: 'white', underlineColor: 'transparent'}}}
          labelStyle={styles.label}
          contentStyle={styles.inputContent}
        />

        <Text style={styles.forgotPassword}>Forgot Password?</Text>

        <Button
          mode="contained"
          style={styles.loginButton}
          labelStyle={styles.loginButtonText}>
          Log In
        </Button>

        <Button
  mode="outlined"
  style={styles.signUpButton}
  labelStyle={styles.signUpButtonText}
  onPress={() => navigation.navigate('signup1')}>
  Sign Up
</Button>


        <Text style={styles.socialText}>
          ------------ or login with ----------
        </Text>

        <View style={styles.socialButtons}>
          <View style={styles.socialButtonContainer}>
            <Image
              source={require('../../../assets/icons/google.png')}
              style={styles.socialIcon}
            />
            <Image
              source={require('../../../assets/icons/facebook.png')}
              style={styles.socialIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    
  },
  formContainer: {
    
    width: '95%',
    padding: 20,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 10,
    height: '70%',
    marginTop:230,
    // justifyContent: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
  },
  inputContent: {
    height: 45,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: 10,
    color: 'white',
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  loginButtonText: {
    color: 'black',
  },
  signUpButton: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  signUpButtonText: {
    color: 'white',
  },
  socialText: {
    textAlign: 'center',
    color: 'white',
    marginVertical: 29,
  },
  socialButtons: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 90, // Increase width slightly for spacing
  },
  socialIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 25, 
    left:-40,// Add horizontal margin for spacing between icons
  },
});
