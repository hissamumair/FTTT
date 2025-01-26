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




// import React, { useRef, useState } from "react";
// import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Linking } from "react-native";
// import Modal from "react-native-modal";
// import { IconButton } from "react-native-paper";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { launchImageLibrary } from "react-native-image-picker";
// import { useCreateBookingMutation } from "../../../redux/reducers/booking/bookingThunk";

// const Bokkpayment = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { fullName, email, contactNumber, price } = route.params;

//   const secureURLRef = useRef("");

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isUploadModalVisible, setUploadModalVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isLoadingUpload, setLoadingUpload] = useState(false);  // Loading state for upload

//   const [createBooking, { isLoading }] = useCreateBookingMutation();

//   const pickImage = async () => {
//     const options = {
//       mediaType: "photo",
//       maxWidth: 800,
//       maxHeight: 800,
//       quality: 1,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         Alert.alert("Cancelled", "You did not select any image.");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//       } else {
//         const { uri } = response.assets[0];
//         setSelectedImage(uri);
//       }
//     });
//   };

//   const uploadImageToCloudinary = async () => {
//     if (!selectedImage) {
//       Alert.alert("No Image Selected", "Please select an image to upload.");
//       return;
//     }
  
//     setLoadingUpload(true);  // Start loading when upload starts
  
//     const data = new FormData();
//     data.append("file", {
//       uri: selectedImage,
//       type: "image/jpeg",
//       name: "payment_screenshot.jpg",
//     });
//     data.append("upload_preset", "payment_upload");
  
//     try {
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/dduptdo0c/image/upload",
//         {
//           method: "POST",
//           body: data,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       const result = await response.json();
//       if (response.ok && result.secure_url) {
//         secureURLRef.current = result.secure_url;
//         Alert.alert("Upload Successful", "Screenshot uploaded successfully.");
//         setUploadModalVisible(false);
//         setSelectedImage(null);
//       } else {
//         console.error("Cloudinary Error:", result);
//         Alert.alert(
//           "Upload Failed",
//           "Something went wrong. Please check your configuration."
//         );
//       }
//     } catch (error) {
//       console.error("Upload Error:", error);
//       Alert.alert("Error", "Unable to upload image. Please try again later.");
//     } finally {
//       setLoadingUpload(false);  // Stop loading after the upload is complete
//     }
//   };
  

//   const createBookingHandler = async () => {
//     // Check if the payment screenshot has been uploaded
//     if (!secureURLRef.current) {
//       Alert.alert("No Screenshot Uploaded", "Please upload the payment screenshot.");
//       return; // Don't proceed with booking if no screenshot has been uploaded
//     }
  
//     try {
//       // Prepare the booking data
//       const bookingData = {
//         ...route.params,
//         contactNumber: route.params.contactNumber,
//         carName: "No Car", // Replace with the actual car name if available
//         paymentScreenshot: secureURLRef.current, // Attach the payment screenshot URL
//       };
  
//       // Call the createBooking mutation
//       const response = await createBooking(bookingData);
//   console.log("sdfdsf",response)
//       if (response?.data) {
//         // Alert to show booking creation was successful
//         Alert.alert(
//           "Booking Successful",
//           "Your booking has been created successfully!",
//           [
//             {
//               text: "OK",
//               onPress: () => {
//                 // Navigate to the "booking" screen after clicking "OK"
//                 navigation.navigate("Booking");
//               },
//             },
//           ]
//         );
//       } else {
//         Alert.alert("Error", "Unable to create the booking. Please try again later.");
//       }
//     } catch (error) {
//       console.log("object",error)
//       Alert.alert("Error", "Unable to create the booking. Please try again later.");
//     }
//   };

//   // Method to handle email contact
//   const openEmailClient = () => {
//     const email = "support@yourcompany.com"; // Replace with your support email
//     const subject = "Query regarding my booking";
//     const body = "Hello, I have a query regarding my booking.";
//     const url = `mailto:${email}?subject=${subject}&body=${body}`;

//     Linking.openURL(url).catch((err) => console.error("Error opening email client:", err));
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff" }}>
//       <ScrollView
//         contentContainerStyle={{
//           flexGrow: 1,
//           justifyContent: "flex-start",
//           paddingBottom: 60,
//         }}
//       >
//         <View style={{ height: "30%" }}>
//           <Image
//             style={{ height: "100%", width: "100%", resizeMode: "cover" }}
//             source={require("../../../assets/icons/wellcome.png")}
//           />
//           <IconButton
//             icon="arrow-left"
//             size={30}
//             iconColor="green"
//             style={{ left: 10, marginTop: -200 }}
//             onPress={() => navigation.goBack()}
//           />
//           <View style={{ position: "absolute", top: "30%", marginHorizontal: 30 }}>
//             <Text style={{ fontSize: 15, color: "black" }}>Welcome to</Text>
//             <Text style={{ fontSize: 28, fontWeight: "bold", color: "green" }}>Book your</Text>
//             <Text style={{ fontSize: 15, color: "black" }}>hiking trip</Text>
//           </View>
//         </View>

//         <View
//           style={{
//             backgroundColor: "#e0f7fa",
//             borderRadius: 10,
//             padding: 15,
//             marginHorizontal: 20,
//             marginBottom: 10,
//             shadowColor: "#000",
//             shadowOpacity: 0.2,
//             shadowOffset: { width: 0, height: 2 },
//             shadowRadius: 4,
//             elevation: 5,
//           }}
//         >
//           <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
//             User Information
//           </Text>
//           <Text style={{ fontSize: 16, color: "black", marginBottom: 5 }}>
//             Full Name: {fullName}
//           </Text>
//           <Text style={{ fontSize: 16, color: "black", marginBottom: 5 }}>
//             Email ID: {email}
//           </Text>
//           {/* <Text style={{ fontSize: 16, color: "black", marginBottom: 5 }}>
//             Contact No: {contactNumber}
//           </Text> */}
//           <Text style={{ fontSize: 16, color: "black", marginBottom: 5,fontWeight:"bold" }}>
//             Price: Pkr {price}
//           </Text>
//         </View>

//         <View
//           style={{
//             backgroundColor: "#f1f8e9",
//             padding: 15,
//             borderRadius: 10,
//             marginHorizontal: 20,
//             marginBottom: 15,
//           }}
//         >
//           <Text style={{ fontSize: 16, fontWeight: "bold", color: "green", marginBottom: 10 }}>
//             Please send payment to the following number through Easypaisa:
//           </Text>
//           <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", marginBottom: 10 }}>
//             03139560175
//           </Text>
//           <Text style={{ fontSize: 16, color: "black", marginBottom: 10 }}>
//             After making the payment, please upload the payment screenshot below.
//           </Text>
//         </View>

//         <TouchableOpacity
//           style={{
//             backgroundColor: secureURLRef.current ? "#4CAF50" : "#B0BEC5", // Green when active, Gray when disabled
//             borderRadius: 10,
//             paddingVertical: 12,
//             paddingHorizontal: 30,
//             height: 40,
//             marginHorizontal: 60,
//             alignItems: "center",
//             justifyContent: "center",
//             elevation: 5,
//           }}
//           onPress={createBookingHandler}
//           disabled={!secureURLRef.current} // Disable button when no image is uploaded
//         >
//           <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
//             Create Booking
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{
//             backgroundColor: "#2196F3", // Blue color for the button
//             borderRadius: 10,
//             paddingVertical: 12,
//             paddingHorizontal: 30,
//             height: 40,
//             marginHorizontal: 60,
//             alignItems: "center",
//             justifyContent: "center",
//             marginTop: 10,
//             elevation: 5,
//           }}
//           onPress={() => setUploadModalVisible(true)}
//         >
//           <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
//             Upload Screenshot
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{
//             backgroundColor: "#FF5722", // Orange for the email contact button
//             borderRadius: 10,
//             paddingVertical: 12,
//             paddingHorizontal: 30,
//             height: 40,
//             marginHorizontal: 60,
//             alignItems: "center",
//             justifyContent: "center",
//             marginTop: 20, // Adjust the margin as needed
//             elevation: 5,
//           }}
//           onPress={openEmailClient}
//         >
//           <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
//             Contact Us via Gmail
//           </Text>
//         </TouchableOpacity>

//         <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
//           <View
//             style={{
//               backgroundColor: "white",
//               padding: 20,
//               borderRadius: 10,
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
//               Payment Instructions
//             </Text>
//             <Text style={{ fontSize: 16, color: "black", textAlign: "center" }}>
//               Please make your payment to the following number:
//             </Text>
//             <Text style={{ fontSize: 20, fontWeight: "bold", color: "green", marginVertical: 10 }}>
//               +123-456-7890
//             </Text>
//             <Text style={{ fontSize: 16, color: "black", textAlign: "center" }}>
//               Note: Your payment will be manually verified. Once verified, we will confirm your booking.
//             </Text>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "green",
//                 borderRadius: 10,
//                 padding: 10,
//                 marginTop: 20,
//               }}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>

//         <Modal isVisible={isUploadModalVisible} onBackdropPress={() => setUploadModalVisible(false)}>
//           <View
//             style={{
//               backgroundColor: "white",
//               padding: 20,
//               borderRadius: 10,
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
//               Upload Payment Screenshot
//             </Text>
//             {selectedImage && (
//               <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginBottom: 10 }} />
//             )}
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#2196F3", // Blue button for image selection
//                 borderRadius: 10,
//                 paddingVertical: 12,
//                 paddingHorizontal: 30,
//                 height: 50,
//                 marginBottom: 10,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 elevation: 5,
//               }}
//               onPress={pickImage}
//             >
//               <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Choose Image</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#4CAF50", // Green for upload button
//                 borderRadius: 10,
//                 paddingVertical: 12,
//                 paddingHorizontal: 30,
//                 height: 50,
//                 marginBottom: 10,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 elevation: 5,
//               }}
//               onPress={uploadImageToCloudinary}
//             >
//               <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Upload</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#FF5722", // Red for closing modal
//                 borderRadius: 10,
//                 paddingVertical: 12,
//                 paddingHorizontal: 30,
//                 height: 50,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 elevation: 5,
//               }}
//               onPress={() => setUploadModalVisible(false)}
//             >
//               <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </ScrollView>
//     </View>
//   );
// };

// export default Bokkpayment;
