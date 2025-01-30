import React, { useRef, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Linking } from "react-native";
import Modal from "react-native-modal";
import { IconButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import { useCreateBookingMutation } from "../../../redux/reducers/booking/bookingThunk";

const Bokkpayment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fullName, email, contactNumber, price } = route.params;

  const [isUploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoadingUpload, setLoadingUpload] = useState(false); // Loading state for upload
  const [createBooking] = useCreateBookingMutation();

  const secureURLRef = useRef("");

  const pickImage = async () => {
    const options = {
      mediaType: "photo",
      maxWidth: 800,
      maxHeight: 800,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert("Cancelled", "You did not select any image.");
      } else if (response.errorMessage) {
        Alert.alert("Error", response.errorMessage);
      } else {
        const { uri } = response.assets[0];
        setSelectedImage(uri);
      }
    });
  };

  const uploadImageToCloudinary = async () => {
    if (!selectedImage) {
      Alert.alert("No Image Selected", "Please select an image to upload.");
      return;
    }

    setLoadingUpload(true); // Start loading when upload starts

    const data = new FormData();
    data.append("file", {
      uri: selectedImage,
      type: "image/jpeg",
      name: "payment_screenshot.jpg",
    });
    data.append("upload_preset", "payment_upload");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dduptdo0c/image/upload",
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = await response.json();
      if (response.ok && result.secure_url) {
        secureURLRef.current = result.secure_url;

        // Create the booking once the image is uploaded
        const bookingData = {
          ...route.params,
          contactNumber,
          carName: "No Car", // Replace with the actual car name if available
          paymentScreenshot: secureURLRef.current, // Attach the payment screenshot URL
        };

        const bookingResponse = await createBooking(bookingData);

        if (bookingResponse?.data) {
          Alert.alert(
            "Booking Successful",
            "Your booking has been created successfully!",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("Booking"),
              },
            ]
          );
        } else {
          Alert.alert("Error", "Unable to create the booking. Please try again later.");
        }

        setUploadModalVisible(false);
        setSelectedImage(null);
      } else {
        console.error("Cloudinary Error:", result);
        Alert.alert(
          "Upload Failed",
          "Something went wrong. Please check your configuration."
        );
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Error", "Unable to upload image. Please try again later.");
    } finally {
      setLoadingUpload(false); // Stop loading after the upload is complete
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          paddingBottom: 60,
        }}
      >
        {/* User Information and Payment Details */}
        <View style={{ height: "30%" }}>
          <Image
            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
            source={require("../../../assets/icons/wellcome.png")}
          />
          <IconButton
            icon="arrow-left"
            size={30}
            iconColor="green"
            style={{ left: 10, marginTop: -200 }}
            onPress={() => navigation.goBack()}
          />
          <View style={{ position: "absolute", top: "30%", marginHorizontal: 30 }}>
            <Text style={{ fontSize: 15, color: "black" }}>Welcome to</Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "green" }}>Book your</Text>
            <Text style={{ fontSize: 15, color: "black" }}>hiking trip</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#e0f7fa",
            borderRadius: 10,
            padding: 15,
            marginHorizontal: 20,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>User Information</Text>
          <Text style={{ fontSize: 16, color: "black", marginBottom: 5 }}>Full Name: {fullName}</Text>
          <Text style={{ fontSize: 16, color: "black", marginBottom: 5 }}>Email ID: {email}</Text>
          <Text style={{ fontSize: 16, color: "black", marginBottom: 5, fontWeight: "bold" }}>
            Price: Pkr {price}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#f1f8e9",
            padding: 15,
            borderRadius: 10,
            marginHorizontal: 20,
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "green", marginBottom: 10 }}>
            Please send payment to the following number through Easypaisa:
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", marginBottom: 10 }}>
            03139560175
          </Text>
          <Text style={{ fontSize: 16, color: "black", marginBottom: 10 }}>
            After making the payment, please upload the payment screenshot below.
          </Text>
        </View>

        {/* Upload Screenshot Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#2196F3", // Blue color for the button
            borderRadius: 10,
            paddingVertical: 12,
            paddingHorizontal: 30,
            height: 40,
            marginHorizontal: 60,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            elevation: 5,
          }}
          onPress={() => setUploadModalVisible(true)}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>Upload Screenshot</Text>
        </TouchableOpacity>

        {/* Upload Modal */}
        <Modal isVisible={isUploadModalVisible} onBackdropPress={() => setUploadModalVisible(false)}>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Upload Payment Screenshot
            </Text>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginBottom: 10 }} />
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "#2196F3",
                borderRadius: 10,
                paddingVertical: 12,
                paddingHorizontal: 30,
                marginBottom: 10,
                alignItems: "center",
              }}
              onPress={pickImage}
            >
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#4CAF50",
                borderRadius: 10,
                paddingVertical: 12,
                paddingHorizontal: 30,
                marginBottom: 10,
                alignItems: "center",
              }}
              onPress={uploadImageToCloudinary}
            >
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                {isLoadingUpload ? "Uploading..." : "Upload & Book"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FF5722",
                borderRadius: 10,
                paddingVertical: 12,
                paddingHorizontal: 30,
                alignItems: "center",
              }}
              onPress={() => setUploadModalVisible(false)}
            >
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Bokkpayment;


