import React, {useState, useCallback, useEffect} from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {DataTable, Button} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import Bookreg from "./bookreg";
import {useGetAllBookingsForUserQuery} from "../../../redux/reducers/booking/bookingThunk";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Booking() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Trip Booking");
  // const userId = "671149cb0d5d4d7afc1c1187";
  const [userId, setUserId] = useState(null);
  const {data, error} = useGetAllBookingsForUserQuery(userId, {skip: !userId});

  const [refreshing, setRefreshing] = useState(false);
  console.log("object",userId,data,error)
  useEffect(() => {
    const fun = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };
    fun()
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{height: "30%"}}>
        <Image
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover",
          }}
          source={require("../../../assets/icons/wellcome.png")}
        />
        <View style={{position: "absolute", top: "30%", marginHorizontal: 30}}>
          <Text style={{fontSize: 15, color: "black"}}>Welcome to</Text>
          <Text style={{fontSize: 28, fontWeight: "bold", color: "green"}}>
            Book your
          </Text>
          <Text style={{fontSize: 15, color: "black"}}>hiking trip</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 5,
            width: "40%",
            alignItems: "center",
            borderWidth: selectedTab === "Trip Booking" ? 1 : 0,
            borderColor:
              selectedTab === "Trip Booking" ? "green" : "transparent",
          }}
          onPress={() => setSelectedTab("Trip Booking")}>
          <Text style={{color: "green", fontSize: 12}}>Trip Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 5,
            width: "40%",
            borderWidth: selectedTab === "Transport Booking" ? 1 : 0,
            borderColor:
              selectedTab === "Transport Booking" ? "green" : "transparent",
            alignItems: "center",
          }}
          onPress={() => {
            setSelectedTab("Transport Booking");
            navigation.navigate("HomeStack", {screen: "Transportbooking"});
          }}>
          <Text style={{color: "green", fontSize: 12}}>Transport Booking</Text>
        </TouchableOpacity>
      </View>

      <View style={{justifyContent: "center", padding: 20}}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "black",
            marginTop: 4,
          }}>
          Register and book your slot for K2 base camp trek using the table
          below:
        </Text>
      </View>

      <ScrollView
        horizontal
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell style={{flex: 1}}>Full name</DataTable.Cell>
            <DataTable.Cell style={{flex: 1}}>Start date</DataTable.Cell>
            <DataTable.Cell style={{flex: 1}}>End date</DataTable.Cell>
            <DataTable.Cell style={{flex: 1}}>Status</DataTable.Cell>
            <DataTable.Cell style={{flex: 1}}>Deposit</DataTable.Cell>
          </DataTable.Row>

          {data?.map((item, index) => (
            <DataTable.Row
              key={index}
              style={{borderBottomWidth: 1, borderBottomColor: "#ccc"}}>
              <DataTable.Cell
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: "#ccc",
                  paddingHorizontal: 7,
                  justifyContent: "center",
                }}>
                {item.fullName}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: "#ccc",
                  paddingHorizontal: 7,
                  justifyContent: "center",
                }}>
                {moment(item.startDate).format("DD-MM-YY")}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: "#ccc",
                  paddingHorizontal: 7,
                  justifyContent: "center",
                }}>
                {moment(item.endDate).format("DD-MM-YY")}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: "#ccc",
                  paddingHorizontal: 7,
                  justifyContent: "center",
                }}>
                {item.status}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: "#ccc",
                  paddingHorizontal: 7,
                  justifyContent: "center",
                }}>
                {item.deposit}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
}
