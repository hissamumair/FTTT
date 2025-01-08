import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Chatscreen() {
  const navigation=useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      {/* Chat Image */}
      <Image
        source={require("../../../assets/icons/chat1.png")} // Replace with your chat image path
        style={{ width: 100, height: 100, marginBottom: 90,marginTop:70 }} // Inline styles for the image
      />

      {/* Message Text */}
      <Text
        style={{
          fontSize: 13,
          textAlign: "center",
          marginBottom: 0,
          color: "black",
          // marginTop:-20,
        }}
      >
        No chat available. Please click the button below to start a chat.
        </Text>

      <View style={{ flex: 1 ,marginBottom:150,}} /> 

      <TouchableOpacity
        style={{
          backgroundColor: "green", // Button color
          paddingVertical: 10,
          paddingHorizontal: 20,
          width:"90%",
          borderRadius: 5,
          opacity:.8,
          marginBottom: 20, // Space from the bottom
        }}
        onPress={() => navigation.navigate("Startchat")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 15,
            textAlign:"center",
            fontWeight: "bold",
          }}
        >
          Start Chatting
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
