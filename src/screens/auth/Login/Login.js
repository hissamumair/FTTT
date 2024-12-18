

import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { TextInput, Button, Checkbox, Menu, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useLoginUserMutation } from "../../../redux/reducers/user/userThunk";
import { handleCurrentLoaginUser } from "../../../redux/reducers/user/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState("Admin");
  const [googleError, setGoogleError] = React.useState(null);

  // Use the mutation hook
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const roles = ["Admin", "User", "Guest"];

  useEffect(() => {
    // Initialize Google Sign In
    GoogleSignin.configure({
      webClientId: '722479852764-4409ccutcqf7krr0mcscqt4rcgjbajg0.apps.googleusercontent.com',
      iosClientId: '722479852764-4409ccutcqf7krr0mcscqt4rcgjbajg0.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginUser({
          email: values.email,
          password: values.password,
        }).unwrap();

        if (response?.user) {
          await AsyncStorage.setItem("userId", response?.user?._id);
          await AsyncStorage.setItem("userName", response?.user?.name);
          await AsyncStorage.setItem("userEmail", response?.user?.email);
          navigation.navigate("BottomTabs");
        } else {
          // Handle login failure
          Alert.alert("Login Failed", "Invalid credentials or server error");
        }
      } catch (err) {
        console.error("Login error:", err);
        Alert.alert("Error", err.message || "An error occurred during login");
      }
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices();
      
      // Get user ID token
      const userInfo = await GoogleSignin.signIn();

      if(!userInfo){
        Alert.alert("Unable to access Google auth. Please complete your purchase then try.");
        return;
      }

      try {
        const response = await loginUser({
          email: userInfo.user.email,
          googleId: userInfo.user.id,
          name: userInfo.user.name,
          photo: userInfo.user.photo,
        }).unwrap();

        if (response?.user) {
          await AsyncStorage.setItem("userId", response?.user?._id);
          await AsyncStorage.setItem("userEmail", userInfo.user.email);
          await AsyncStorage.setItem("userName", userInfo.user.name);
          navigation.navigate("BottomTabs");
        } else {
          // Handle login failure
          Alert.alert("Login Failed", "Unable to authenticate with server");
        }
      } catch (err) {
        console.error("Google sign in server error:", err);
        Alert.alert("Error", err.message || "Failed to authenticate with server");
      }
    } catch (error) {
      Alert.alert("Unable to access Google auth. Please complete your purchase then try.");

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available");
      } else {
        console.log("Other error:", error);
      }
    }
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const selectRole = role => {
    setSelectedRole(role);
    closeMenu();
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        backgroundColor: "#f9f9f9",
        justifyContent: "flex-start",
      }}>
      {isLoading && (
        <View 
          style={{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'rgba(0,0,0,0.3)', 
            zIndex: 1000
          }}
        >
          <ActivityIndicator 
            animating={true} 
            size="large" 
            color="green" 
          />
        </View>
      )}
      
      <View style={{alignContent:"center", marginTop:40}}>
        <Text
          style={{
            fontSize: 38,
            fontWeight: "bold",
            color: "green",
            textAlign: "center",
            marginBottom: 20,
          }}>
          Login
        </Text>

        <TextInput
          label="Email ID"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          mode="outlined"
          style={{ marginBottom: 10, marginTop: 10}}
          keyboardType="email-address"
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={{ color: "red" }}>{formik.errors.email}</Text>
        )}

        <TextInput
          label="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          mode="outlined"
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              name={secureTextEntry ? "eye-off" : "eye"}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
          style={{ marginBottom: 15 }}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: "red" }}>{formik.errors.password}</Text>
        )}
      </View>
      
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
          />
          <Text style={{ fontSize: 14 }}>Remember me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Forgetpassword")}>
          <Text style={{ fontSize: 14, color: "green" }}>Forget password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={formik.handleSubmit}
        disabled={isLoading}
        style={{
          marginBottom: 20,
          opacity: isLoading ? 0.5 : 0.8,
          backgroundColor: "green",
          paddingVertical: 10,
          borderRadius: 5,
          alignItems: "center",
        }}>
        <Text style={{ fontSize: 18, color: "white" }}>
          {isLoading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginVertical: 20, color: "black" }}>
        If you don't have an account. To create an account please{" "}
        <Text
          style={{ color: "green", marginVertical: 10 }}
          onPress={() => navigation.navigate("signup1")}>
          sign up
        </Text>
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}>
        <View
          style={{ flex: 1, height: 1, backgroundColor: "#ccc", marginRight: 10 }}
        />
        <Text style={{ textAlign: "center", marginHorizontal: 10 }}>
          Or login with
        </Text>
        <View
          style={{ flex: 1, height: 1, backgroundColor: "#ccc", marginLeft: 10 }}
        />
      </View>

      {googleError && (
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
          {googleError}
        </Text>
      )}

      <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          onPress={handleGoogleSignIn}
          disabled={isLoading}
          style={{
            width: "90%",
            height: 50,
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            opacity: isLoading ? 0.5 : 1,
          }}>
          <Image
            source={require("../../../assets/icons/google.png")}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
          <Text style={{ fontSize: 16 }}>Google Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}