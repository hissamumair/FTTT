// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
// } from "react-native";
// import React, {useState} from "react";

// export default function ImageComponent() {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImagePress = image => {
//     setSelectedImage(image);
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     setSelectedImage(null);
//   };

//   const images = [
//     require("../assets/icons/k22.png"),
//     require("../assets/icons/k21.png"),
//     require("../assets/icons/k22.png"),
//     require("../assets/icons/k22.png"),
//   ];
//   return (
//     <View style={{flex: 1, marginBottom: 100}}>
//       <Text
//         style={{
//           fontSize: 18,
//           alignSelf: "flex-start",
//           color: "black",
//           // marginBottom: 10,
//         }}>
//       Location
//       </Text>
//       <TouchableOpacity
//         style={{width: "100%"}}
//         onPress={() => handleImagePress(require("../assets/icons/mapk2.png"))}>
//         <Image
//           source={require("./../assets/icons/mapk2.png")}
//           style={{width: "100%", height: 500, resizeMode: "cover"}}
//         />
//       </TouchableOpacity>

//       <View style={{justifyContent: "center", justifyItem: "center"}}>
//         <Text
//           style={{
//             fontSize: 15,
//             fontWeight: "bold",
//             marginVertical: 5,
//             color: "black",
//           }}>
//           Photo Gallery
//         </Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View style={{flexDirection: "row", alignItems: "center"}}>
//             {images.map((image, index) => (
//               <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
//                 <Image
//                   source={image}
//                   style={{width: 100, height: 100, marginRight: 10}}
//                 />
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>
//       </View>

//       {/* Modal for Image Zoom */}
//       <Modal
//         visible={modalVisible}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={handleCloseModal}>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//           }}>
//           <TouchableOpacity
//             style={{
//               position: "absolute",
//               top: 30,
//               right: 20,
//               zIndex: 1,
//             }}
//             onPress={handleCloseModal}>
//             <Text style={{color: "white", fontSize: 30, fontWeight: "bold"}}>
//               ×
//             </Text>
//           </TouchableOpacity>
//           {selectedImage && (
//             <Image
//               source={selectedImage}
//               style={{
//                 width: "90%",
//                 height: "80%",
//                 resizeMode: "contain",
//               }}
//             />
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({});



import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import ImageViewer from "react-native-image-zoom-viewer"; // Import the library

export default function ImageComponent() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const images = [
    require("../assets/icons/k22.png"),
    require("../assets/icons/k21.png"),
    require("../assets/icons/k22.png"),
    require("../assets/icons/k22.png"),
  ];

  // Convert images to a format compatible with ImageViewer
  const imageUrls = images.map((image) => ({ url: "", props: { source: image } }));

  return (
    <View style={{ flex: 1, marginBottom: 100 }}>
      <Text
        style={{
          fontSize: 18,
          alignSelf: "flex-start",
          color: "black",
        }}
      >
        Location
      </Text>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => handleImagePress(require("../assets/icons/mapk2.png"))}
      >
        <Image
          source={require("./../assets/icons/mapk2.png")}
          style={{ width: "100%", height: 500, resizeMode: "cover" }}
        />
      </TouchableOpacity>

      <View style={{ justifyContent: "center", justifyItem: "center" }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginVertical: 5,
            color: "black",
          }}
        >
          Photo Gallery
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
                <Image
                  source={image}
                  style={{ width: 100, height: 100, marginRight: 10 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Modal for Image Zoom */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 30,
              right: 20,
              zIndex: 1,
            }}
            onPress={handleCloseModal}
          >
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              ×
            </Text>
          </TouchableOpacity>
          {selectedImage && (
            <ImageViewer
              imageUrls={[{ url: "", props: { source: selectedImage } }]} // Pass selected image
              enableSwipeDown
              onSwipeDown={handleCloseModal}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
