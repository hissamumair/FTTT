import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React, {useState} from "react";
import {IconButton} from "react-native-paper"; // Import IconButton from React Native Paper
import {useNavigation} from "@react-navigation/native";
import {Card, Divider} from "react-native-paper";
import Hickingpoint from "./hickingpoint";
import Campingpoint from "./campingpoint";
import Gadget from "./gadget";
import Safety from "./safety";
import Weather from "./weather";
import Review from "./review";
import Booking from "../../../components/Booking";

// Categories array
const categories = [
  {
    id: "1",
    name: "hiking",
    label: "Hiking",
    source: require("../../../assets/icons/hickingtrack.png"),
  },
  {
    id: "2",
    name: "camping",
    label: "Camping",
    source: require("../../../assets/icons/camping.png"),
  },
  {
    id: "3",
    name: "gadget",
    label: "Gadgets",
    source: require("../../../assets/icons/gadget.png"),
  },
  {
    id: "4",
    name: "safety",
    label: "Safety",
    source: require("../../../assets/icons/bus.png"),
  },
  {
    id: "5",
    name: "weather",
    label: "Weather",
    source: require("../../../assets/icons/bus.png"),
  }, // Added more categories for better demonstration
  {
    id: "6",
    label: "Review",
    name: "review",
    source: require("../../../assets/icons/bus.png"),
  },
];

export default function K2() {
  const navigation = useNavigation();

  const handleCardPress = categoryName => {
    console.log(`${categoryName} card pressed`);
    setSelectedTab(categoryName.replace(/ /g, ""));
  };
  const [selectedTab, setSelectedTab] = useState("hiking");

  return (
    <ScrollView style={{padding: 15}}>
      <View style={{width: "100%"}}>
        <ImageBackground
          source={require("../../../assets/icons/wellcome.png")}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start", // Align items to the left
            paddingLeft: 20, // Add padding to the left for spacing
          }}
          resizeMode="cover">
          <IconButton
            icon="arrow-left" // Use the arrow-left icon
            size={30}
            iconColor="green"
            style={{left: -10}} // Position the icon
            onPress={() => navigation.navigate("Home")} // Navigate to Home on press
          />

          <Text style={{color: "green", fontSize: 36, fontWeight: "bold"}}>
            K2
          </Text>
          <Text style={{color: "black", fontSize: 18, fontWeight: "bold"}}>
            Categories
          </Text>

          <TouchableOpacity
            style={{
              position: "absolute", // Use absolute positioning
              right: 20, // Move towards the right
              bottom: 20, // Move towards the bottom
              backgroundColor: "green",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              width: "40%", // Adjust width for a better appearance
            }}
            onPress={() => console.log("Book Me pressed")} // Add navigation or functionality here
          >
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "center",
              }}>
              Book
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
        contentContainerStyle={{paddingVertical: 10}} // Padding for the content
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id} // Use category.id for a unique key
            onPress={() => handleCardPress(category.name)}
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              margin: 3,
              elevation: 3,
              shadowColor: "#000",
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 4,
              width: 80,
              borderColor: "red",
              borderWidth: selectedTab == category.name ? 1 : 0,
              // borderWidth:3,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={{fontSize: 8, fontWeight: "bold", marginLeft: 10}}>
                {category.label}
              </Text>
              <Image
                source={category.source}
                style={{
                  height: 25,
                  width: 44,
                  resizeMode: "contain",
                }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{flex: 1}}>
        {selectedTab == "hiking" && <Hickingpoint />}
        {selectedTab == "camping" && <Campingpoint />}
        {selectedTab == "gadget" && <Gadget />}
        {selectedTab == "safety" && <Safety />}
        {selectedTab == "weather" && <Weather/>}
        {selectedTab == "review" && <Review/>}
        {selectedTab == "booking" && <Booking/>}



      </View>
    </ScrollView>
  );
}
