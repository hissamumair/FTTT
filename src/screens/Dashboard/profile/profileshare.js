import {Text, View, Image, TouchableOpacity} from "react-native";
import React from "react";
import {TextInput} from "react-native-paper";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import {useNavigation, useScrollToTop} from "@react-navigation/native";
// import Icon from 'react-native-vector-icons/AntDesign';

export default function ProfileShare() {
  const [code, setCode] = React.useState("ABC123");
  const navigation = useNavigation();

  const handleCopy = () => {
    console.log("Code copied:", code);
  };

  const handleShare = () => {
    console.log("Code shared:", code);
  };
  const handleBackPress = () => {
    navigation.goBack("Profile");
  };
  const handleSettingsPress = () => {
    // Handle settings icon press action
    navigation.navigate("Profilesetting");
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: "23%"}}>
        <Image
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover",
          }}
          source={require("../../../assets/icons/wellcome.png")}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            margin: 15,

            opacity: 0.8,
          }}
          onPress={handleBackPress}>
          <MaterialIcon name="arrow-back" size={35} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 15, // Adjust top position as needed
            right: 15, // Adjust right position as needed
           
            backgroundColor: "green",
            justifyContent: "center", // Center the icon vertically
            alignItems: "center", // Center the icon horizontally
            opacity: 0.8, // Add some opacity
            borderRadius: 12,
          }}
          onPress={handleSettingsPress}>
          <AntDesignIcon style={{}} name="setting" size={35} color="white" />
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            top: 60,
            left: 20,
            width: "50%",
          }}>
          <Text style={{fontSize: 15, color: "black"}}>Welcome to</Text>
          <Text style={{fontSize: 25, fontWeight: "bold", color: "green"}}>
            My Profile
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: "flex-start",
          marginVertical: 20,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: "black",
            fontWeight: "bold",
            marginBottom: 10,
          }}>
          Send Location Code
        </Text>

        <TextInput
          label="Location Code"
          value={code}
          onChangeText={text => setCode(text)}
          right={<TextInput.Icon icon="content-copy" onPress={handleCopy} />}
          mode="outlined"
          activeOutlineColor="green"
          style={{
            borderColor: "green",
          }}
        />

        <TouchableOpacity
          onPress={handleShare}
          style={{
            marginTop: 20,
            paddingVertical: 10,
            backgroundColor: "green",
            borderRadius: 10,
            borderWidth: 1,
            alignItems: "center",
            height: "12%",
            width: "30%",
            margin: 120,
            opacity: 0.9,
          }}>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
            }}>
            Share Code
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          paddingHorizontal: 20,
          marginTop: -140,
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "black",
            margin: 10,

            alignSelf: "flex-start",
          }}>
          Sharing location with
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "grey",
            padding: 10, // Padding for better text spacing
            width: "100%", // Full width for consistency
          }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "bold",
              color: "#333",
              width: "45%",
            }}>
            Family:
          </Text>
          <Text style={{fontSize: 10, color: "#333", width: "55%"}}>
            03139560175
          </Text>
        </View>

        {/* Friends Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "grey",
            padding: 10,
            width: "100%",
          }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "bold",
              color: "#333",
              width: "45%",
            }}>
            Friends:
          </Text>
          <Text style={{fontSize: 10, color: "#333", width: "55%"}}>
            03131345235
          </Text>
        </View>
      </View>
    </View>
  );
}
