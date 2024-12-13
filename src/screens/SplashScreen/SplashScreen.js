import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
    const navigation = useNavigation();

    const handleBookPress =async () => {
      const user = await AsyncStorage.getItem("userId")
      const navigateTo = user ? "BottomTabs" : "Auth"
      navigation.navigate(navigateTo);
      // navigation.navigate("HomeStack");
      // navigation.navigate("BottomTabs");
    };
  
  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/icons/splash.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Expedition Management System</Text>
            <Text style={styles.subTitle}>Book, Travel & Explore</Text>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button
            onPress={handleBookPress}
            mode="contained" style={styles.bookButton} labelStyle={styles.buttonLabel}>
              Let's Book
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
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
  cardContainer: {
    width: '100%',
    padding: 20,
  },
  card: {
    borderRadius: 10,
    backgroundColor: 'black',
    opacity: 0.7,
    marginVertical: 10,
    height: 200, // Set a fixed height for the card
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10, // Space between title and subtitle
  },
  actions: {
    justifyContent: 'center', // Center the button in the actions area
    paddingVertical: 10,
    height:80,
  },
  bookButton: {
    margin: 14, // Margin around the button
    alignSelf: 'center',
    width: '90%',
    height:"70%",
    backgroundColor: 'white',
    borderRadius:10, // Set button background color to white
  },
  buttonLabel: {
    color: 'black', // Set button text color to black
  },
});
