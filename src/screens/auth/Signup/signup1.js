

import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, Alert} from "react-native";
import {
  TextInput,
  Button,
  Checkbox,
  Menu,
  ActivityIndicator,
} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useRegisterUserMutation} from "../../../redux/reducers/user/userThunk";
import {Formik} from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Screen} from "react-native-screens";

export default function Signup1() {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Admin");
  const roles = ["Admin", "User", "Guest"];
  const navigation = useNavigation();

  const [registerUser, {isLoading, isError, error}] = useRegisterUserMutation();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    contactNo: Yup.string()
      .required("Contact number is required")
      .matches(/^\d+$/, "Contact number must be digits"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignup = async (values, actions) => {
    console.log("Submitting values", values);
    try {
      const response = await registerUser({
        name: values.name,
        contactNo: values.contactNo,
        email: values.email,
        password: values.password,
      });
      if (response?.data?.message) {
        // console.log("asdf", response.data);
        await AsyncStorage.setItem("userId", response.data?.user?._id);
        await AsyncStorage.setItem("userEmail", response.data?.user?.email);
        navigation.navigate("OTPVerificationScreen");
      }
      if (response.error?.data) {
        Alert.alert(response.error?.data?.message);
      }
    } catch (err) {
      console.log("Error during signup:", err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
        justifyContent: "flex-start",
      }}>
      <Text
        style={{
          fontSize: 38,
          fontWeight: "bold",
          color: "green",
          textAlign: "center",
          marginBottom: 20,
        }}>
        Sign Up
      </Text>

      <Formik
        initialValues={{
          name: "",
          contactNo: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignup}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              label="Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              mode="outlined"
              style={{marginBottom: 10, marginTop: 10}}
              error={touched.name && errors.name}
            />
            {touched.name && errors.name && (
              <Text style={{color: "red"}}>{errors.name}</Text>
            )}

            <TextInput
              label="Contact No"
              value={values.contactNo}
              onChangeText={handleChange("contactNo")}
              onBlur={handleBlur("contactNo")}
              mode="outlined"
              style={{marginBottom: 10}}
              keyboardType="phone-pad"
              error={touched.contactNo && errors.contactNo}
            />
            {touched.contactNo && errors.contactNo && (
              <Text style={{color: "red"}}>{errors.contactNo}</Text>
            )}

            <TextInput
              label="Email ID"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              mode="outlined"
              style={{marginBottom: 10, marginTop: 10}}
              keyboardType="email-address"
              error={touched.email && errors.email}
            />
            {touched.email && errors.email && (
              <Text style={{color: "red"}}>{errors.email}</Text>
            )}


            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              mode="outlined"
              secureTextEntry={secureTextEntry}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? "eye-off" : "eye"}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  // Remove color and backgroundColor props
                  style={{marginRight: 10}}
                />
              }
              style={{marginBottom: 10}}
              error={touched.password && errors.password}
            />
            <TextInput
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              mode="outlined"
              secureTextEntry={secureTextEntry}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? "eye-off" : "eye"}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  // Remove color and backgroundColor props
                  style={{marginRight: 10}}
                />
              }
              style={{marginBottom: 15}}
              error={touched.confirmPassword && errors.confirmPassword}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => setChecked(!checked)}
                />
                <Text style={{fontSize: 14}}>Remember me</Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("Forgetpassword")}>
                <Text style={{fontSize: 14, color: "green"}}>
                  Forget password?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              style={{
                marginBottom: 20,
                opacity: isLoading ? 0.7 : 0.8,
                backgroundColor: "green",
                paddingVertical: 10,
                borderRadius: 5,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}>
              {isLoading ? (
                <>
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={{marginRight: 10}}
                  />
                  <Text style={{fontSize: 18, color: "white"}}>
                    Signing Up...
                  </Text>
                </>
              ) : (
                <Text style={{fontSize: 18, color: "white"}}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                console.log("Navigating to Auth -> LoginScreen");
                navigation.navigate("Login");
              }}
              style={{alignItems: "center", marginBottom: 20}}>
              <Text style={{fontSize: 14, color: "green"}}>
                Already have an account? Log In
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 0,
                marginTop: -10,
              }}>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "#ccc",
                  marginRight: 10,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  marginHorizontal: 10,
                  color: "black",
                }}>
                Or login with
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "#ccc",
                  marginLeft: 10,
                }}
              />
            </View>

            <View style={{width: "100%", alignItems: "center", margin: 1}}>
              <TouchableOpacity
                onPress={() => console.log("Google Login")}
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
                }}>
                <Image
                  source={require("../../../assets/icons/google.png")}
                  style={{width: 24, height: 24, marginRight: 10}}
                />
                <Text style={{fontSize: 16}}>Google Account</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
