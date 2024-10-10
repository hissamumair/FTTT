import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Avatar, IconButton, Searchbar} from "react-native-paper";
import {TouchableOpacity} from "react-native";
import Menuscreen from "../menuscreen";
// import { IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Import the icons

// import TabNavigator from "../../navigation/TabNavigator";
// import { Screen } from "react-native-screens";
// import Drawer from "../../navigation/Drawer";

// Get screen dimensions
const {width, height} = Dimensions.get("window");

export default function Home() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const expeditions = [
    {
      id: "1",
      title: "K2",
      description:
        "K2, the second-highest mountain in the world, towers at 8,611 meters (28,251 feet)..",
      price: "PKR 15,000",
      source: require("../../assets/icons/k2.png"),
    },
    {
      id: "2",
      title: "Karakorum",
      description: "Karakoram is a mountain range in Pakistan..",
      price: "PKR 15,000",
      source: require("../../assets/icons/parbat.png"),
    },
    {
      id: "3",
      title: "K2",
      description:
        "K2, the second-highest mountain in the world, towers at 8,611 meters (28,251 feet)..",
      price: "PKR 15,000",
      source: require("../../assets/icons/parbat.png"),
    },
    {
      id: "4",
      title: "Karakorum",
      price: "PKR 15,000",
      source: require("../../assets/icons/k2.png"),
    },
    {
      id: "5",
      title: "K2",
      price: "PKR 15,000",
      source: require("../../assets/icons/parbat.png"),
    },
  ];

  const renderExpeditionItem = item => (
    <View
      style={{position: "relative", marginLeft: 10, marginBottom: 15}}
      key={item.id}>
      <TouchableOpacity
        onPress={() => {
          if (item.title === "K2") {
            navigation.navigate("K2");
          }
        }}>
        <Image
          source={item.source}
          style={{
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 14,
            height: 240,
            width: 170,
            overflow: "hidden",
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: 10,
          width: 168,
          alignItems: "center",
        }}>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 4,
          }}>
          {item.title}
        </Text>
        {item.description && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                textAlign: "center",
              }}>
              {item.description}
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={{color: "white", fontSize: 14, textAlign: "center"}}>
            {item.price}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("HomeStack", {
              screen: "K2",
              params: {screen: "K2"},
            })
          }
          style={{
            backgroundColor: "green",
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
            width: "100%",
            alignItems: "center",
          }}>
          <Text style={{color: "white", fontWeight: "bold"}}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={{flex: 1, padding: 10}}>
      <View style={{width: "110%", height: "30%"}}>
      <IconButton
  icon="settings" // Correct icon name
  size={20}
  onPress={() => navigation.navigate("HomeStack", {
    screen: "Menuscreen", // Ensure the screen name matches exactly
    params: { screen: "Menuscreen" } // Optional if you don't have nested navigation
  })}
/>

        <ImageBackground
          source={require("../../assets/icons/wellcome.png")}
          style={{
            flex: 1,
            marginTop: -20,
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
          resizeMode="cover">
          <Text
            style={{
              color: "black",
              fontSize: 18,
            }}>
            Welcome to,
          </Text>
          <Text
            style={{
              color: "green",
              fontSize: 30,
              fontWeight: "bold",
            }}>
            Expedition
          </Text>
          <Text
            style={{
              color: "green",
              fontSize: 20,
              fontWeight: "bold",
            }}>
            Management System
          </Text>
        </ImageBackground>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          justifyContent: "space-between",
        }}>
        <Searchbar
          placeholder="Search location here"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            backgroundColor: "rgba(30, 30, 30, 0.2)",
            borderRadius: 10,
            flex: 1,
          }}
          inputStyle={{
            color: "white",
            paddingLeft: 0,
          }}
          icon={() => null}
          clearIcon={() => null}
        />

        <IconButton
          onPress={handleSearch}
          icon="magnify"
          style={{
            position: "absolute",
            right: 10,
            marginTop: 10,
            color: "red", // Set icon color to green
          }}
        />
      </View>

      <View>
        <Text
          style={{
            fontSize: 15,
            color: "black",
            fontWeight: "bold",
            margin: 10,
          }}>
          Most Popular Places
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10}}>
          {expeditions.map(item => renderExpeditionItem(item))}
        </ScrollView>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          width: width,
          height: height * 0.2,
        }}>
        <Image
          source={require("../../assets/icons/mapmap.png")}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        />
      </View>
      {/* <TabNavigator /> */}
    </ScrollView>
  );
}
