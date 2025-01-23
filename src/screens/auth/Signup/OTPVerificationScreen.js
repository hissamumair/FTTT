
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { baseURL } from "../../../redux/baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OTPVerificationScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigation = useNavigation();

  // Validation schema for 4-digit OTP
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .length(4, "OTP must be 4 digits")
      .required("OTP is required")
      .matches(/^\d+$/, "OTP must only contain digits"),
  });

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const mail = await AsyncStorage.getItem("userEmail");
        if (mail) {
          setUserEmail(mail);
        } else {
          console.log("No email found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };
    getUserEmail();
  }, []);

  const handleOTPVerification = async (values) => {
    if (!userEmail) {
      Alert.alert("Error", "Email not found. Please try again.");
      return;
    }

    setIsLoading(true);
    const data = { code: values.otp, email: userEmail };
    
    try {
      console.log("Sending verification data:", data);
      const response = await fetch(`${baseURL}/api/user/verifyEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Verification response:", result);

      if (result.user) {
        Alert.alert(
          "Success", 
          "OTP verified successfully!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login")
            }
          ]
        );
      } else {
        Alert.alert("Error", result.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert(
        "Error", 
        "Failed to verify OTP. Please check your code and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    // Implement your resend OTP logic here
    Alert.alert("Resend OTP", "OTP has been resent to your email!");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
  onPress={() => navigation.goBack()}
  style={{
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1
  }}>
  <Icon name="arrow-left" size={30} color="green" />
</TouchableOpacity>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit OTP sent to your email
      </Text>

      <Formik
        initialValues={{ otp: "" }}
        validationSchema={validationSchema}
        onSubmit={handleOTPVerification}
      >
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
              label="OTP"
              value={values.otp}
              onChangeText={handleChange("otp")}
              onBlur={handleBlur("otp")}
              mode="outlined"
              keyboardType="numeric"
              maxLength={4}
              style={styles.input}
              error={touched.otp && errors.otp}
            />
            {touched.otp && errors.otp && (
              <Text style={styles.errorText}>{errors.otp}</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.button, isLoading && styles.disabledButton]}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={handleResendOTP}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  resendText: {
    marginTop: 20,
    textAlign: "center",
    color: "green",
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});