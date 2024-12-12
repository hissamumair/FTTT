import React, {useState} from "react";
import {View, Text, Image, ScrollView, TouchableOpacity} from "react-native";
import Modal from "react-native-modal";
import {IconButton} from "react-native-paper";
import {useNavigation, useRoute} from "@react-navigation/native";
import {CardField} from "@stripe/stripe-react-native";
import {useCreateBookingMutation} from "../../../redux/reducers/booking/bookingThunk";

const Bokkpayment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {fullName, selectedGender, email, contactNumber,startDate,
    endDate,
    deposit,
    price,
    status,} = route.params;
    console.log("object",route.params)

  const [createBooking, {isLoading}] = useCreateBookingMutation();
  const [isModalVisible, setModalVisible] = useState(false);
  const createBookingHadler = async () => {
    const res = await createBooking(route.params);
    console.log("respon", res);
    setModalVisible(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          paddingBottom: 60,
        }}>
        <View style={{height: "30%"}}>
          <Image
            style={{height: "100%", width: "100%", resizeMode: "cover"}}
            source={require("../../../assets/icons/wellcome.png")}
          />
          <IconButton
            icon="arrow-left"
            size={30}
            iconColor="green"
            style={{left: 10, marginTop: -200}}
            onPress={() => navigation.goBack()}
          />
          <View
            style={{position: "absolute", top: "30%", marginHorizontal: 30}}>
            <Text style={{fontSize: 15, color: "black"}}>Welcome to</Text>
            <Text style={{fontSize: 28, fontWeight: "bold", color: "green"}}>
              Book your
            </Text>
            <Text style={{fontSize: 15, color: "black"}}>hiking trip</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#e0f7fa",
            borderRadius: 10,
            padding: 15,
            marginHorizontal: 20,
            marginBottom: 10,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 4,
            elevation: 5,
          }}>
          <Text style={{fontSize: 18, fontWeight: "bold", marginBottom: 10}}>
            User Information
          </Text>
          <Text style={{fontSize: 16, color: "black", marginBottom: 5}}>
            Full Name: {fullName}
          </Text>
          <Text style={{fontSize: 16, color: "black", marginBottom: 5}}>
            Gender: {selectedGender}
          </Text>
          <Text style={{fontSize: 16, color: "black", marginBottom: 5}}>
            Email ID: {email}
          </Text>
          <Text style={{fontSize: 16, color: "black", marginBottom: 5}}>
            Contact No: {contactNumber}
          </Text>
          <Text style={{ fontSize: 16, color: "black", marginBottom: 5 }}>
        Price: ${price} 
    </Text>
        </View>

        <View style={{padding: "5%"}}>
          <CardField
            postalCodeEnabled={false}
            placeholders={{number: "4242 4242 4242 4242"}}
            cardStyle={{backgroundColor: "#FFFFFF", textColor: "#000000"}}
            style={{width: "100%", height: 50, marginVertical: 20}}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "green",
            borderRadius: 10,
            padding: 10,
            height: 40,
            width: "70%",
            marginHorizontal:60,
            alignItems: "center",
          }}
          onPress={() => createBookingHadler(true)}>
          <Text style={{color: "white", fontWeight: "bold", fontSize: 15,marginLeft:29}}>
            Confirm Payment
          </Text>
        </TouchableOpacity>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
            }}>
            <Text style={{fontSize: 18, fontWeight: "bold", marginBottom: 10}}>
              Payment Confirmed!
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                borderRadius: 10,
                padding: 10,
                marginTop: 20,
              }}
              onPress={() => setModalVisible(false)}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: 15}}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Bokkpayment;
