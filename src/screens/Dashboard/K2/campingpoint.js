
import React, { useState } from "react";
import { View, Image, ScrollView, Modal, TouchableOpacity } from "react-native";
import { Card, Divider,Text } from "react-native-paper";
import { useGetCampingByPlaceIdQuery } from "../../../redux/reducers/camping/campingThunk";
import ImageComponent from "../../../components/image";

export default function Campingpoint({ expeditionId }) {
  const { data: campData, isLoading, error } = useGetCampingByPlaceIdQuery(expeditionId);


  if (isLoading) {
    return <Text>Loading...</Text>; // Handle loading state
  }

  if (error) {
    return <Text>Error loading data.</Text>; // Handle error state
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ marginVertical: 5, marginBottom: 10 }}>
        <Text style={{ fontSize: 13, fontWeight: "bold", color: "black" }}>
          Camping points
        </Text>
        <Text style={{ fontSize: 11, fontWeight: "400", color: "black" }}>{campData?.description}</Text>
        {campData?.track?.map((track, index) => (
          <View key={index} style={{ marginVertical: 5 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }}>
              {track.trackName}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "black" }}>
              {track.day.dayDescription}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "400" , color: "black" }}>
              Height: {track.height.meters} meters / {track.height.feet} feet
            </Text>
          </View>
        ))}
      </View>

      <Card style={{ backgroundColor: "#B3E5FC", padding: 10, borderRadius: 10 }}>
        <Card.Title title="Important Notes" titleStyle={{ color: "#333" }} />
        <Card.Content>
          <Text style={{ marginBottom: 5, color: "#333", fontSize: 10 }}>
            Duration: The entire trek typically takes 19-21 days, depending on weather and conditions.
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ marginBottom: 5, color: "#333", fontSize: 10 }}>
            Best Time to Trek: June to August.
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ marginBottom: 5, color: "#333", fontSize: 10 }}>
            Physical Fitness: This is a strenuous trek, requiring good physical condition, experience with high-altitude trekking, and mental endurance.
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ marginBottom: 5, color: "#333", fontSize: 10 }}>
            Permits: Special permits are required to enter the restricted areas of the Karakoram Range.
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ color: "#333", fontSize: 10 }}>
            The K2 Base Camp trek offers an unforgettable experience for trekkers, providing some of the most spectacular mountain views and a true sense of adventure.
          </Text>
        </Card.Content>
      </Card>
<ImageComponent/>
     

    </View>
  );
}
