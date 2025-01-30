import React, { useState } from "react";
import { View,  Image, ScrollView, Modal, TouchableOpacity } from "react-native";
import { Card,Text, } from "react-native-paper";
import { useGetSafetybyPlaceIdQuery } from "../../../redux/reducers/safety/safetyThunk";

export default function Safety({ expeditionId }) {
  const {
    data: Safetydata,
    isLoading,
    error,
  } = useGetSafetybyPlaceIdQuery(expeditionId);

  const images = [
    require("../../../assets/icons/equipment.png"),
    require("../../../assets/icons/tools3.jpg"),
    require("../../../assets/icons/tools4.jpg"),
    require("../../../assets/icons/tools2.jpg"),
  ];

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

  if (isLoading) {
    return <Text>Loading...</Text>; // Handle loading state
  }

  if (error) {
    return <Text>Error loading data.</Text>; // Handle error state
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", margin: 10 }}>
        <View style={{ marginVertical: 15, marginBottom: 20 }}>
          <>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "black",
                padding: 0,
                marginTop: -20,
              }}
            >
              Safety equipments{" "}
            </Text>
            <Text style={{ fontSize: 11, color: "black", margin: 4 }}>
              {Safetydata.description}
            </Text>
            {Safetydata?.equipments?.map((equipment, index) => (
              <View key={index}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "black",
                    margin: 2,
                  }}
                >
                  {index + 1}: {equipment.name}
                </Text>
                <Text style={{ fontSize: 10, fontWeight: "400", color: "black"  }}>
                  {equipment.description}
                </Text>
              </View>
            ))}
          </>
        </View>

        <View style={{ justifyContent: "center", justifyItem: "center" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 5,
              color: "black",
            }}
          >
            Photos of Safety equipment
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
              {images.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
                  <Image
                    source={image}
                    style={{ width: 120, height: 180, marginRight: 10 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <Card
          style={{
            backgroundColor: "#B3E5FC",
            borderRadius: 10,
            height: "10%",
            width: "95%",
          }}
        >
          <Card.Title
            title="Important Notes"
            titleStyle={{ color: "#333", fontWeight: "bold" }}
            subtitleStyle={{ color: "#666" }}
          />
          <Card.Content>
            <Text
              style={{
                margin: 10,
                color: "#333",
                fontSize: 10,
                marginTop: -10,
                fontWeight: "600",
              }}
            >
              Use these equipment with the complete guide of a professional
              doctor.
            </Text>
          </Card.Content>
          <Card.Actions></Card.Actions>
        </Card>
      </View>

      {/* Modal for Zooming Image */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
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
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>×</Text>
          </TouchableOpacity>
          <Image
            source={selectedImage}
            style={{
              width: "90%",
              height: "80%",
              resizeMode: "contain",
            }}
          />
        </View>
      </Modal>
    </ScrollView>
  );
}
