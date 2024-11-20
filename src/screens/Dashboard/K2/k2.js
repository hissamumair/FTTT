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
import Chatscreen from "./chatscreen";
import Startchat from "./startchat";
// import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectExpeditions } from '../../../redux/reducers/features/expeditionsSlice'; // Adjust the path if necessary
import Details from "./details";

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
    source: require("../../../assets/icons/labour.png"),
  },
  {
    id: "5",
    name: "weather",
    label: "Weather",
    source: require("../../../assets/icons/weather.png"),
  }, // Added more categories for better demonstration
  {
    id: "6",
    label: "Review",
    name: "review",
    source: require("../../../assets/icons/customer-review.png"),
  },
  {
    id: "7",
    label: "Chats",
    name: "chatscreen",
    source: require("../../../assets/icons/chat.png"),
  },
];

export default function K2({ route }) {
  const { expedition } = route.params;
  const navigation = useNavigation();
  const expeditions = useSelector(state=>state.expeditions); // Use selector to get expeditions

  const handleCardPress = categoryName => {
    console.log(`${categoryName} card pressed`);
    setSelectedTab(categoryName.replace(/ /g, ""));
  };
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <ScrollView  style={{padding: 15}}>
      <View style={{width: "110%"}}>
        <ImageBackground
          source={require("../../../assets/icons/wellcome.png")}
          style={{
            flex: 1,
            // height:70,
            justifyContent: "center",
            alignItems: "flex-start", // Align items to the left
            paddingLeft: 20, 
          }}
          resizeMode="cover">
          <IconButton
            icon="arrow-left" 
            size={30}
            iconColor="green"
            style={{left: -10}} 
            onPress={() => navigation.navigate("BottomTabs")} // Navigate to Home on press
          />

          <Text style={{color: "green", fontSize: 30, fontWeight: "bold"}}>
           {expedition?.name}
          </Text>
          <Text style={{color: "black", fontSize: 18, fontWeight: "bold"}}>
            Categories
          </Text>
          <Text style={{color: "black", fontSize: 20, fontWeight: "bold"}}>
           {expedition?.price}
          </Text>
          {/* <Text style={{color: "black", fontSize: 14, fontWeight: "bold"}}>
           Rs 75000
          </Text> */}

     <View style={{
      flex: 1,
      width: '30%'
    }}>
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 20,
         // position: 'absolute',
          right: -236,
          top: -16
        }}
        // onPress={() => navigation.navigate("Bookreg")}
        onPress={() => navigation.navigate("Bookreg", { expedition })}

      >
        <Text
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          Book Now
        </Text>
      </TouchableOpacity>
    </View>
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
        {selectedTab=="" && <Details expedition={expedition} />}
        {selectedTab == "hiking" && <Hickingpoint expeditionId={expedition?._id} />}
        {selectedTab == "camping" && <Campingpoint expeditionId={expedition?._id} />}
        {selectedTab == "gadget" && <Gadget expeditionId={expedition?._id}/>}
        {selectedTab == "safety" && <Safety expeditionId={expedition?._id}/>}
        {selectedTab == "weather" && <Weather expeditionId={expedition?._id}/>}
        {selectedTab == "review" && <Review expeditionId={expedition?._id}/>}
        {selectedTab == "booking" && <Booking expeditionId={expedition?._id}/>}
        {selectedTab == "chatscreen" && <Chatscreen expeditionId={expedition?._id}/>}
        {selectedTab == "Startchat" && <Startchat expeditionId={expedition?._id}/>}
      </View>
    </ScrollView>
  );
}
