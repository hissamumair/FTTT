import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";

const Bokkpayment = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', paddingBottom: 60 }} // Increased padding at the bottom
      >
        <View style={{ height: "30%" }}>
          <Image
            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
            source={require("../../../assets/icons/wellcome.png")}
          />
          <View style={{ position: "absolute", top: "30%", marginHorizontal: 30 }}>
            <Text style={{ fontSize: 15, color: "black" }}>Welcome to</Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "green" }}>Book your</Text>
            <Text style={{ fontSize: 15, color: "black" }}>hiking trip</Text>
          </View>
        </View>

        <View style={{ justifyContent: "center", padding: 20 }}>
          <Text style={{ fontWeight: "400", fontSize: 14, color: "black", marginTop: 4 }}>
            Select departure date
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#e0f7fa", // Light teal color for the card
            borderRadius: 10,
            padding: 15,
            marginHorizontal: 20,
            marginBottom: 10, // Reduced margin to move it upwards
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>User Information</Text>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, color: "black", marginBottom: 5 }}>Full Name: Dummy Name</Text>
            <Text style={{ fontSize: 16, color: "black", marginBottom: 5 }}>Gender: Male</Text>
            <Text style={{ fontSize: 16, color: "black", marginBottom: 5 }}>Email ID: dummy@example.com</Text>
            <Text style={{ fontSize: 16, color: "black", marginBottom: 5 }}>Contact No: +1234567890</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#e0f7fa", // Light teal color for the card
            borderRadius: 10,
            padding: 15,
            marginHorizontal: 20,
            marginBottom: 20, // Maintained margin
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Card Details</Text>

          <TextInput
            placeholder="Card Number"
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: "green",
              borderRadius: 10,
              padding: 10,
              marginBottom: 15,
            }}
          />

          <TextInput
            placeholder="Amount"
            keyboardType="numeric"
            value="100.00" // Dummy amount to pay
            editable={false} // Make this field non-editable
            style={{
              borderWidth: 1,
              borderColor: "green",
              borderRadius: 10,
              padding: 10,
              marginBottom: 15,
            }}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TextInput
              placeholder="Exp Date (MM/YY)"
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "green",
                borderRadius: 10,
                padding: 10,
                flex: 1,
                marginRight: 10,
              }}
            />
            <TextInput
              placeholder="Issue Date"
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "green",
                borderRadius: 10,
                padding: 10,
                flex: 1,
              }}
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center", 
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "green", 
            borderRadius: 10,
            padding: 10,
            height: 40, 
            width: "70%", 
            alignItems: "center", 
          }}
          onPress={() => {
            console.log("Payment confirmed");
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
              textAlign: "center", // Center the text
            }}
          >
            Confirm Payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Bokkpayment;