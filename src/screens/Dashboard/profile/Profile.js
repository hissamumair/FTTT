import {Text, View, Image, TouchableOpacity, PermissionsAndroid, Alert, Share, Linking, ToastAndroid} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {IconButton} from "react-native-paper"; // Import IconButton from React Native Paper
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useGetCurrentUserMutation} from "../../../redux/reducers/user/userThunk";
import Geolocation from "@react-native-community/geolocation";

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "App needs access to your location to share it.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // For iOS, permissions are requested at runtime
};

export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [getCurrentUser, {isLoading}] = useGetCurrentUserMutation();
  const [location, setLocation] = useState(null);
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(true);

  const getUserDetails = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const userName = await AsyncStorage.getItem("userName");
    const userEmail = await AsyncStorage.getItem("userEmail");

    getCurrentUser({userId}).then(async res => {
      await AsyncStorage.setItem("userName", res.data?.user?.name);
      await AsyncStorage.setItem("userEmail", res.data?.user?.email);
      setUser({
        userId,
        userEmail: res.data?.user?.email,
        userName: res.data?.user?.name,
      });
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate("Auth", {screen: "LoginScreen"});
  };
 // Advanced location sharing with multiple fallbacks
 const shareLocation = async () => {
  // First, check if location services are enabled
  if (!locationServicesEnabled) {
    Alert.alert(
      "Location Services Disabled",
      "Please enable location services in your device settings.",
      [
        {
          text: "Open Settings",
          onPress: () => {
            // Open location settings
            Platform.OS === 'ios'
              ? Linking.openURL('app-settings:')
              : Linking.openSettings();
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
    return;
  }

  // Configure Geolocation with multiple timeout and accuracy strategies
  const geolocationOptions = {
    enableHighAccuracy: true, // Try high accuracy first
    timeout: 15000, // 15 seconds timeout
    maximumAge: 10000, // Use cached location up to 10 seconds old
  };

  // Fallback location (you can replace with a default location or last known location)
  const fallbackLocation = {
    coords: {
      latitude: 0,
      longitude: 0,
      accuracy: 0
    }
  };

  // Attempt to get location with multiple strategies
  const getLocationWithFallback = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          // Successful high accuracy location
          if (position.coords.accuracy < 100) {
            resolve(position);
          } else {
            // If accuracy is low, try network location or fallback
            Geolocation.getCurrentPosition(
              (networkPosition) => resolve(networkPosition),
              () => resolve(fallbackLocation),
              { 
                enableHighAccuracy: false, 
                timeout: 5000, 
                maximumAge: 0 
              }
            );
          }
        },
        (error) => {
          console.error("Location Error Details:", error);
          
          // Detailed error handling
          switch(error.code) {
            case 1: // PERMISSION_DENIED
              Alert.alert(
                "Permission Denied", 
                "Location permission was denied. Please enable in settings."
              );
              break;
            case 2: // POSITION_UNAVAILABLE
              Alert.alert(
                "Location Unavailable", 
                "Unable to determine location. Check device settings and try again."
              );
              break;
            case 3: // TIMEOUT
              Alert.alert(
                "Location Timeout", 
                "Could not get location in time. Please try again in an open area."
              );
              break;
            default:
              Alert.alert(
                "Location Error", 
                "An unexpected error occurred while getting location."
              );
          }
          
          // Resolve with fallback location to prevent complete failure
          resolve(fallbackLocation);
        },
        geolocationOptions
      );
    });
  };

  try {
    // Get location with fallback
    const position = await getLocationWithFallback();
    const { latitude, longitude } = position.coords;

    // Create multiple location links
    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const appleMapsLink = `https://maps.apple.com/?ll=${latitude},${longitude}`;
    const openStreetMapsLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}`;

    // Location message with accuracy information
    const locationMessage = `
🌍 My Current Location 📍

Google Maps: ${googleMapsLink}
Apple Maps: ${appleMapsLink}
OpenStreetMap: ${openStreetMapsLink}

Latitude: ${latitude}
Longitude: ${longitude}
Accuracy: ${position.coords.accuracy.toFixed(2)} meters
Timestamp: ${new Date().toLocaleString()}

${latitude === 0 && longitude === 0 ? "⚠️ Fallback/Placeholder Location" : ""}
    `;

    // Attempt to share
    const result = await Share.share({
      message: locationMessage,
      title: 'Share My Location',
      url: googleMapsLink 
    });

    // Handle sharing result
    if (result.action === Share.sharedAction) {
      Platform.OS === 'android'
        ? ToastAndroid.show('Location shared successfully!', ToastAndroid.SHORT)
        : Alert.alert("Location Shared", "Your location has been shared successfully.");
    }
  } catch (error) {
    console.error('Sharing error:', error);
    Alert.alert(
      "Sharing Error", 
      "An error occurred while trying to share location."
    );
  }
};


  return (
    <View style={{flex: 1}}>
      <View style={{height: "23%"}}>
        <Image
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover",
          }}
          source={require("../../../assets/icons/wellcome.png")}
        />
        <IconButton
          icon="arrow-left"
          size={30}
          iconColor="green"
          style={{left: 10, marginVertical: -160}}
          onPress={() => navigation.navigate("BottomTabs", {screen: "Home"})}
        />
        <View
          style={{
            position: "absolute",
            padding: 60,
            //left: 10,
            width: "50%",
          }}>
          <Text style={{fontSize: 15, color: "black"}}>Welcome to</Text>
          <Text style={{fontSize: 25, fontWeight: "bold", color: "green"}}>
            My Profile
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}>
        <Image
          style={{
            height: 60,
            width: 60,
            marginVertical: 10,
            marginRight: "5%",
          }}
          source={require("../../../assets/icons/profilepic.png")}
        />

        <Text style={{fontSize: 16, color: "black", fontWeight: "bold"}}>
          {user?.userName}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          // marginLeft: "30%",
        }}>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 5,
            color: "#333",
            fontWeight: "bold",
          }}>
          Email Id:{" "}
          <Text style={{fontWeight: "normal"}}>{user?.userEmail}</Text>
        </Text>
        <Text style={{fontSize: 12, color: "#333", fontWeight: "bold"}}>
          User Id: <Text style={{fontWeight: "normal"}}>{user?.userId}</Text>
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: -30,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            borderWidth: 2,
            backgroundColor: "green",
            width: "94%",
            height: "20%",
            opacity: 0.7,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => handleLogout()}>
          <Text
            style={{
              fontSize: 15,
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          padding: 20,
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "black",
            left: -110,
          }}>
          Sharing location with
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "grey",
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "#333",
              width: "45%",
            }}>
            Family:
          </Text>
          <Text style={{fontSize: 14, color: "#333", width: "55%"}}>
            03139560175
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "grey",
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "#333",
              width: "45%",
            }}>
            Friends:
          </Text>
          <Text style={{fontSize: 14, color: "#333", width: "55%"}}>
            03131345235
          </Text>
        </View>

        <TouchableOpacity
          onPress={shareLocation}
          style={{
            backgroundColor: "#28a745",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            marginTop: 20,
            width: 130,
          }}>
          <Text style={{color: "#fff", fontWeight: "bold"}}>
            Share location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
