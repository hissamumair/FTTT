import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {IconButton} from "react-native-paper";
import {Dropdown} from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Bookreg = ({route}) => {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dateString, setDateString] = useState("Select Date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const {expedition} = route.params;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fun = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };
    fun();
  }, []);
  const genderOptions = [
    {label: "Male", value: "Male"},
    {label: "Female", value: "Female"},
    {label: "Other", value: "Other"},
  ];

  // Format date using moment.js
  const formatDate = date => {
    return moment(date).format("MMM Do YY");
  };

  const renderItem = item => (
    <View
      style={{
        padding: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          color: "black",
        }}>
        {item.label}
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      {/* Header Section with Image */}
      <View style={{height: "30%"}}>
        <Image
          style={{height: "100%", width: "100%", resizeMode: "cover"}}
          source={require("../../../assets/icons/wellcome.png")}
        />
        <IconButton
          icon="arrow-left"
          size={30}
          iconColor="green"
          style={{position: "absolute", top: 10, left: 10}}
          onPress={() =>
            navigation.navigate("BottomTabs", {screen: "HomeStack"})
          }
        />
        <View style={{position: "absolute", top: "30%", marginHorizontal: 30}}>
          <Text style={{fontSize: 18, color: "black"}}>Welcome to</Text>
          <Text style={{fontSize: 30, fontWeight: "bold", color: "green"}}>
            Book your
          </Text>
          <Text style={{fontSize: 15, color: "black"}}>hiking trip</Text>
          <Text
            style={{
              fontSize: 15,
              color: "black",
              marginVertical: 10,
              fontWeight: "bold",
            }}>
            Price: {expedition?.price}
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={{justifyContent: "center", padding: 20}}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 16,
            color: "black",
            marginTop: 4,
          }}>
          Select departure date:
        </Text>
      </View>

      <View style={{padding: 20}}>
        {/* Date Picker */}
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{position: "relative"}}>
          <TextInput
            value={dateString}
            placeholder="Select Date"
            style={{
              borderWidth: 1,
              borderColor: "green",
              borderRadius: 15,
              padding: 10,
              marginBottom: 10,
              paddingRight: 40,
            }}
            editable={false}
          />
          <Icon
            name="calendar-today"
            size={20}
            color="green"
            style={{position: "absolute", right: 10, top: 12}}
          />
        </TouchableOpacity>

        <DatePicker
          modal
          open={show}
          date={date}
          onConfirm={selectedDate => {
            setShow(false);
            setDate(selectedDate);
            setDateString(formatDate(selectedDate));
          }}
          onCancel={() => {
            setShow(false);
          }}
        />

        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={{
            borderWidth: 1,
            borderColor: "green",
            borderRadius: 15,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <Dropdown
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: isFocus ? "green" : "gray",
            borderRadius: 15,
            paddingHorizontal: 8,
            marginBottom: 10,
            backgroundColor: "white",
          }}
          placeholderStyle={{
            fontSize: 14,
            color: "gray",
          }}
          selectedTextStyle={{
            fontSize: 14,
            color: "black",
          }}
          inputSearchStyle={{
            height: 40,
            fontSize: 14,
          }}
          iconStyle={{
            width: 20,
            height: 20,
          }}
          data={genderOptions}
          search={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select Gender" : "..."}
          value={selectedGender}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSelectedGender(item.value);
            setIsFocus(false);
          }}
          renderItem={renderItem}
          containerStyle={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "green",
          }}
          itemContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: "#EEEEEE",
          }}
          activeColor="#E8F0FE"
        />

        <TextInput
          placeholder="Email Id"
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1,
            borderColor: "green",
            borderRadius: 15,
            padding: 10,
            marginBottom: 10,
          }}
        />
        <TextInput
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          style={{
            borderWidth: 1,
            borderColor: "green",
            borderRadius: 15,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "green",
            borderRadius: 10,
            paddingVertical: 10,
            alignItems: "center",
            marginTop: 10,
            borderWidth: 1,
            width: "70%",
            alignSelf: "center",
            borderColor: "darkgreen",
            opacity: 0.7,
          }}
          onPress={() => {
            navigation.navigate("Bokkpayment", {
              fullName,
              email,
              gender: selectedGender,
              contactNumber,
              startDate: date,
              // endDate,
              user: userId,
              deposit: expedition?.price,
              status: "Available",
              // price: expedition?.price,  // Pass price to the next screen
            });
            console.log("Register button pressed");
          }}>
          <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>
            Register and Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Bookreg;
