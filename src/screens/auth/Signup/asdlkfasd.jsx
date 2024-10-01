import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

export default function Signup1() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/icons/splash.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.nameContainer}>
          <TextInput
            label="First Name"
            mode="outlined"
            style={styles.nameInput}
            placeholder="Enter your first name"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            theme={{colors: {primary: 'white', underlineColor: 'transparent'}}}
            labelStyle={styles.label}
            contentStyle={styles.inputContent}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            style={styles.nameInput}
            placeholder="Enter your last name"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            theme={{colors: {primary: 'white', underlineColor: 'transparent'}}}
            labelStyle={styles.label}
            contentStyle={styles.inputContent}
          />
        </View>

        <View style={styles.inputContainer}>
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
            label="Phone Number"
            mode="outlined"
            style={styles.input}
            placeholder="Enter your phone number"
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
        </View>

        <Button
          mode="contained"
          style={styles.signUpButton}
          labelStyle={styles.signUpButtonText}>
          Sign Up
        </Button>
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
    height: '60%',
    top: 152,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  nameInput: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    height: 40,
  },
  inputContainer: {
    marginBottom: 15, // Add some margin to separate from button
  },
  input: {
    width: '100%', // Make inputs full width
    marginBottom: 10, // Add space between inputs
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    height: 40,
  },
  inputContent: {
    height: 49,
    paddingVertical: 0,
  },
  label: {
    color: 'white',
    fontSize: 14,
  },
  signUpButton: {
    marginTop: 50,
    backgroundColor: 'white',
    borderRadius:10,
    borderWidth:5,
  },
  signUpButtonText: {
    color: 'black',
  },
});
