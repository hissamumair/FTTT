
import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {IconButton} from "react-native-paper";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Bookreg = ({route}) => {
  const navigation = useNavigation();
  const [dateString, setDateString] = useState("Select Date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [numPeople, setNumPeople] = useState("");  // State for number of people
  const [price, setPrice] = useState("");  // State for price input
  const {expedition} = route.params;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const id = await AsyncStorage.getItem("userId");
      const name = await AsyncStorage.getItem("userName");  // Assuming the user's name is stored in AsyncStorage
      const userEmail = await AsyncStorage.getItem("userEmail");  // Assuming the user's email is stored in AsyncStorage
      
      setUserId(id);
      setFullName(name);  // Set the name
      setEmail(userEmail);  // Set the email
    };
    
    fetchUserData();
  }, []);

  // Format date using moment.js
  const formatDate = date => {
    return moment(date).format("MMM Do YY");
  };

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
          mode="date"  // This makes sure only the date is shown
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
        {/* <TextInput
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
        /> */}

        {/* Number of People Input */}
        <TextInput
          placeholder="Number of People"
          value={numPeople}
          onChangeText={setNumPeople}
          keyboardType="numeric"  // Ensures only numbers can be entered
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
              contactNumber,
              numPeople,  // Pass the number of people to the next screen
              price:expedition?.price,  // Pass the price to the next screen
              startDate: date,
              user: userId,
              deposit: expedition?.price,
              status: "Pending",
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

