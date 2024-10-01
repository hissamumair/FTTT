import {Text, View, Image, ScrollView, ImageBackground} from "react-native";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Avatar, IconButton, Searchbar, icon} from "react-native-paper";
import {TouchableOpacity} from "react-native";
import TabNavigator from "../../navigation/TabNavigator";

export default function Home() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleCardPress = cardName => {
    console.log(`${cardName} card pressed`);
  };

  const expeditions = [
    {
      id: "1",
      title: "K2",
      description:
        "K2, the second-highest mountain in the world, towers at 8,611 meters (28,251 feet)..",
      price: "PKR 15,000",
      source: require("../../assets/icons/parbat.png"),
    },
    {
      id: "2",
      title: "Karakorum",
      description:
        "K2, the second-highest mountain in the world, towers at 8,611 meters (28,251 feet)..",

      price: "PKR 15,000",
      source: require("../../assets/icons/k2.png"), // Replace with your Karakorum image path
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

  const renderExpeditionItem = (item, navigation) => (
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
          width:168,
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
                textAlign: "center", // Center the text
              }}>
              {item.description}
            </Text>
          </View>
        )}
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
          <Text style={{color: "white", fontSize: 14, textAlign: "center"}}>
            {item.price}
          </Text>
         <IconButton
           icon="arrow-right-circle" // Use the arrow-right-circle icon
           iconColor="green"
           style={{ 
             backgroundColor: 'transparent', 
            
           }} 
           onPress={() => navigation.navigate('HomeStack', { screen: 'K2' })} // Navigate to K2 screen with parameters
         />
        </View>
      </View>
    </View>
  );

  const catergories = [
    {id: "1", name: "Hotels", source: require("../../assets/icons/hotel.png")},
    {id: "2", name: "Planes", source: require("../../assets/icons/plane.png")},
    {id: "3", name: "Bus", source: require("../../assets/icons/car.png")},
    {id: "4", name: "Bus", source: require("../../assets/icons/bus.png")},
  ];
  const tracking = [
    {
      id: "1",
      name: "hicking",
      source: require("../../assets/icons/hicking.png"),
    },
    {
      id: "2",
      name: "tracking",
      source: require("../../assets/icons/tracking.png"),
    },
    {
      id: "3",
      name: "hicking",
      source: require("../../assets/icons/hicking.png"),
    },
    {
      id: "4",
      name: "tracking",
      source: require("../../assets/icons/tracking.png"),
    },
  ];

  return (
    <ScrollView style={{flex: 1, padding: 15}}>
      <View style={{width: "100%", height: "20%"}}>
        <ImageBackground
          source={require("../../assets/icons/wellcome.png")}
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
          resizeMode="cover">
          <Text
            style={{
              color: "black",
              fontSize: 18,
              // fontWeight: "bold",
            }}>
            Wellome to,
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
        }}></View>
      <View style={{position: "relative"}}>
        <Searchbar
          placeholder="Search location here"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            backgroundColor: "rgba(30, 30, 30, 0.2)",
            borderRadius: 10,
          }}
          inputStyle={{color: "white"}}
        />
        <IconButton
          onPress={handleSearch}
          style={{
            position: "absolute",
            right: 10,
            marginTop: 10,
            color: "white",
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          margin: 15,
          width: "100%",
          height: "7%",
          marginLeft: -9,
        }}>
        {catergories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(category.name)}>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 15,
                elevation: 3,
                shadowColor: "#000",
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                width: 87,
                marginRight: index < catergories.length - 1 ? 10 : 0,
              }}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{fontSize: 10, marginRight: 10}}>
                  {category.name}
                </Text>
                <Image
                  source={category.source}
                  style={{
                    height: 25,
                    width: 44,
                    marginLeft: -10,
                    resizeMode: "contain",
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <Text style={{fontSize: 15, color: "black", fontWeight: "bold"}}>
          Featured Expeditions
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10}}>
          {expeditions.map(item => renderExpeditionItem(item, navigation))}
        </ScrollView>
      </View>
      <Text style={{fontSize: 17, fontWeight: "bold", color: "black"}}>
        Categories
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          margin: 15,
          width: "100%",
          height: "7%",
          marginLeft: 0,
        }}>
        {tracking.map((track, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(track.name)}>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 15,
                elevation: 1,
                shadowColor: "#000",
                shadowOffset: {width: 0, height: 2},
                width: 77,
                height: 60,
                marginTop: -10,
                marginRight: index < tracking.length - 1 ? 10 : 0,
              }}>
              <View style={{flexDirection: "column", alignItems: "center"}}>
                <Image
                  source={track.source}
                  style={{
                    height: 25,
                    width: 30,
                    marginLeft: -10,
                    marginTop: -8,
                  }}
                />
                <Text style={{fontSize: 10, marginRight: 10, marginTop: 10}}>
                  {track.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* <Image
        size={48}
        source={require("../../assets/icons/map.png")}
        style={
        { marginTop: 20, height: 150, width: "100%", borderRadius: 12 }}
      /> */}

      <View style={{borderRadius: 12, width: "100%"}}>
        <Image
          source={require("../../assets/icons/map.png")}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 12,
          }}
          resizeMode="cover"
        />
      </View>
    </ScrollView>
  );
}
