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
import {ActivityIndicator, IconButton, Searchbar} from "react-native-paper";
import {TouchableOpacity} from "react-native";
import {useGetAllPlacesQuery} from "../../redux/reducers/places/placeThunk";
// import TabNavigator from "../../navigation/TabNavigator";

const {width, height} = Dimensions.get("window");

export default function Home() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const renderExpeditionItem = item => (
    <View
      style={{position: "relative", marginLeft: 10, marginBottom: 15}}
      key={item?._id}>
      <TouchableOpacity
        onPress={() => {
          // Assuming you have navigation set up for each place
          navigation.navigate(item.title); // Navigate using the title to the corresponding screen
        }}>
        <Image
          source={
            item.image
              ? {uri: item.image}
              : require("../../assets/icons/rakaposhi.jpg")
          }
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
          {item.name}
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
            navigation.navigate({
              name: "HomeStack",
              params: {screen: "K2", params: {expedition: item}},
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

  const {data, isLoading} = useGetAllPlacesQuery();

  return (
    <ScrollView style={{flex: 1, padding: 10}}>
      <View style={{width: "110%", height: "30%"}}>
        <View style={{justifyContent: "center", width: "100%", height: "100%"}}>
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
            color: "red",
          }}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
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
            {data?.map(renderExpeditionItem)}
          </ScrollView>
        </View>
      )}

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
      {/* <TabNavigator />  */}
    </ScrollView>
  );
}
