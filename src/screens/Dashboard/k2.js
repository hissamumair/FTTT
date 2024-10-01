import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { IconButton } from "react-native-paper"; // Import IconButton from React Native Paper
import { useNavigation } from "@react-navigation/native";
import { Card,Divider} from 'react-native-paper';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

// Categories array
const categories = [
  {
    id: "1",
    name: "Hicking",
    source: require("../../assets/icons/hickingtrack.png"),
  },
  {
    id: "2",
    name: "camping ",
    source: require("../../assets/icons/camping.png"),
  },
  { id: "3", name: "gadget", source: require("../../assets/icons/gadget.png") },
  { id: "4", name: "safety ", source: require("../../assets/icons/bus.png") },
  { id: "5", name: "weather", source: require("../../assets/icons/bus.png") }, // Added more categories for better demonstration
  { id: "6", name: "review", source: require("../../assets/icons/bus.png") },
];
const images = [
  require("../../assets/icons/k22.png"),
  require("../../assets/icons/k21.png"),
  require("../../assets/icons/k22.png"),
  require("../../assets/icons/k22.png"),
];
export default function K2() {
  const navigation = useNavigation(); 

  // Handle category card press
  const handleCardPress = (categoryName) => {
    console.log(`${categoryName} card pressed`);
    if (categoryName === "Camping") {
      navigation.navigate("HomeStack", { screen: "Camping" }); // Ensure the screen name matches
    }
  };
  const data = [
    {
      title: "Islamabad to Skardu:",
      day: "Day 1",
      desc: "Fly or drive from Islamabad to Skardu, a small town in the Gilgit-Baltistan region, which serves as the gateway to the Karakoram Range.",
    },
    {
      title: " Skardu to Askole (3,000 m / 9,842 ft):to Skardu:",
      day: "Day 2",
      desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape..",
    },
    {
      title: "Askole to Jhula (3,200 m / 10,499 ft):",
      day: "Day 3",
      desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape..",
    },
    {
      title: "Jhula to Paiju (3,420 m / 11,220 ft):",
      day: "Day 4",
      desc: "Trek through the rugged terrain along the Braldu River to reach Paiju. This campsite offers stunning views of Paiju Peak and the Trango Towers. Trekking time is about 6-7 hours.",
    },
    {
      title: "Paiju to Khoburtse (3,810 m / 12,500 ft):",
      day: "Day 5",
      desc: "Trek through the rugged terrain along the Braldu River to reach Paiju. This campsite offers stunning views of Paiju Peak and the Trango Towers. Trekking time is about 6-7 hours.",
    },
    {
      title: "Khoburtse to Urdukas (4,130 m / 13,550 ft):",
      day: "Day 6",
      desc: ".A short but challenging trek along the Baltoro Glacier to reach Urdukas, a beautiful campsite with views of the Karakoram peaks. Trekking time is about 4-5 hours.",
    },
  ];

  return (
    <ScrollView style={{ padding: 15 }}>
      <View style={{ width: "100%" }}>
        <ImageBackground
          source={require("../../assets/icons/wellcome.png")}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start", // Align items to the left
            paddingLeft: 20, // Add padding to the left for spacing
          }}
          resizeMode="cover"
        >
          <IconButton
            icon="arrow-left" // Use the arrow-left icon
            size={30}
            iconColor="green"
            style={{ left: -10 }} // Position the icon
            onPress={() => navigation.navigate("Home")} // Navigate to Home on press
          />

          <Text style={{ color: "green", fontSize: 36, fontWeight: "bold" }}>
            K2
          </Text>
          <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
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
              }}
            >
              Book
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
        contentContainerStyle={{ paddingVertical: 10 }} // Padding for the content
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id} // Use category.id for a unique key
            onPress={() => handleCardPress(category.name)}
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              margin: 3,
              elevation: 3,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              width: 80,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 8, fontWeight: "bold", marginLeft: 10 }}>
                {category.name}
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

      {data.map((item, index) => (
        <View key={index} style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 13, fontWeight: "600" }}>{item.title}</Text>
          <Text style={{ fontSize: 10, fontWeight: "bold", color: "black" }}>
            {item.day}
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "400" }}>{item.desc}</Text>
        </View>
      ))}

      <View>
        <Text style={{ fontSize: 13, fontWeight: "600" }}>
          Khoburtse to Urdukas (4,130 m / 13,550 ft):
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "bold", color: "black" }}>
          Day 2:
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "400" }}>
          Rest day in Skardu for acclimatization and exploration. Preparations
          for the trek begin here.
        </Text>
      </View>

      <Text style={{ fontSize: 13, fontWeight: "600" }}>
        Skardu to Askole (3,000 m / 9,842 ft)
      </Text>
      <View style={{ marginVertical: 5 }}>
        <Text style={{ fontSize: 10, fontWeight: "bold", color: "black" }}>
          Day 3:
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "400" }}>
          Drive from Skardu to Askole, the last village accessible by road. The
          journey takes about 6-8 hours and offers stunning views of the
          Karakoram landscape.
        </Text>
      </View>

      <Text style={{ fontSize: 13, fontWeight: "600" }}>
        Askole to Jhula (3,200 m / 10,499 ft):
      </Text>
      <View style={{ marginVertical: 5 }}>
        <Text style={{ fontSize: 10, fontWeight: "bold", color: "black" }}>
          Day 4:
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "400" }}>
          Begin the trek from Askole, crossing suspension bridges and following
          the Braldu River to reach Jhula, the first campsite. The trek takes
          about 5-6 hours.
        </Text>
      </View>

      <Text style={{ fontSize: 13, fontWeight: "600" }}>
        Concordia to K2 Base Camp (5,150 m / 16,896 ft):
      </Text>
      <View style={{ marginVertical: 5 }}>
        <Text style={{ fontSize: 10, fontWeight: "bold", color: "black" }}>
          Day 5:
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "400" }}>
          Spend the day exploring the K2 Base Camp, marveling at the towering
          peaks surrounding the area. Trekking time is approximately 6-7 hours.
        </Text>
      </View>
      <Card style={{ backgroundColor: '#B3E5FC', padding: 10, borderRadius: 10 }}> 
      <Card.Title title="Important Notes"  titleStyle={{ color: '#333' }} subtitleStyle={{ color: '#666' }} />
      <Card.Content>
        <Text style={{ marginBottom: 5, color: '#333',fontSize:10 }}>Duration: The entire trek typically takes 19-21 days, depending on weather and conditions.</Text>
        <Divider style={{ marginVertical: 5 }} />
        <Text style={{ marginBottom: 5, color: '#333',fontSize:10 }}>Best Time to Trek: June to August.</Text>
        <Divider style={{ marginVertical: 5 }} />
        <Text style={{ marginBottom: 5, color: '#333',fontSize:10 }}>Physical Fitness: This is a strenuous trek, requiring good physical condition, experience with high-altitude trekking, and mental endurance.</Text>
        <Divider style={{ marginVertical: 5 }} />
        <Text style={{ marginBottom: 5, color: '#333',fontSize:10 }}>Permits: Special permits are required to enter the restricted areas of the Karakoram Range.</Text>
        <Divider style={{ marginVertical: 5 }} />
        <Text style={{ color: '#333',fontSize:10 }}>The K2 Base Camp trek offers an unforgettable experience for trekkers, providing some of the most spectacular mountain views and a true sense of adventure.</Text>
      </Card.Content>
      <Card.Actions>
      </Card.Actions>
    </Card>
    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 18, alignSelf: 'flex-start', color: 'black', marginBottom: 10 }}>
        Hiking Location
      </Text>
      <Image
        source={require('../../assets/icons/mapk2.png')} // Correct path to your image
        style={{ width: "100%",  resizeMode: 'contain',marginTop:-400 }} // Set desired dimensions and resize mode
      />
    </View>
    <View style={{ justifyContent:"center",justifyItem:"center",marginTop:-380 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 ,color:"black"}}>
        Photo Gallery
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={{ width: 100, height: 100, marginRight: 10 }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
    
    
    </ScrollView>
 );
}