// import React, {useState, useCallback, useEffect} from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   RefreshControl,
// } from "react-native";
// import {DataTable, Button} from "react-native-paper";
// import {useNavigation} from "@react-navigation/native";
// import Bookreg from "./bookreg";
// import {useGetAllBookingsForUserQuery} from "../../../redux/reducers/booking/bookingThunk";
// import moment from "moment";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function Booking() {
//   const navigation = useNavigation();
//   const [selectedTab, setSelectedTab] = useState("Trip Booking");
//   // const userId = "671149cb0d5d4d7afc1c1187";
//   const {data, error} = useGetAllBookingsForUserQuery(userId, {skip: !userId});
  
//   const [refreshing, setRefreshing] = useState(false);
  
//   const [userId, setUserId] = useState(null);
//   useEffect(() => {
//     const fun = async () => {
//       const id = await AsyncStorage.getItem("userId");
//       setUserId(id);
//     };
//     fun()
//   }, []);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1000);
//   }, []);

//   return (
//     <View style={{flex: 1}}>
//       <View style={{height: "30%"}}>
//         <Image
//           style={{
//             height: "100%",
//             width: "100%",
//             resizeMode: "cover",
//           }}
//           source={require("../../../assets/icons/hickes.jpg")}
//         />
      
//       </View>

//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-around",
//           marginTop: 10,
//         }}>
//         <TouchableOpacity
//           style={{
//             padding: 10,
//             borderRadius: 5,
//             width: "40%",
//             alignItems: "center",
//             borderWidth: selectedTab === "Trip Booking" ? 1 : 0,
//             borderColor:
//               selectedTab === "Trip Booking" ? "green" : "transparent",
//           }}
//           onPress={() => setSelectedTab("Trip Booking")}>
//           <Text style={{color: "green", fontSize: 12}}>Trip Booking</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             padding: 10,
//             borderRadius: 5,
//             width: "40%",
//             borderWidth: selectedTab === "Transport Booking" ? 1 : 0,
//             borderColor:
//               selectedTab === "Transport Booking" ? "green" : "transparent",
//             alignItems: "center",
//           }}
//           onPress={() => {
//             setSelectedTab("Transport Booking");
//             navigation.navigate("HomeStack", {screen: "Transportbooking"});
//           }}>
//           <Text style={{color: "green", fontSize: 12}}>Transport Booking</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{justifyContent: "center", padding: 20}}>
//         <Text
//           style={{
//             fontWeight: "bold",
//             fontSize: 14,
//             color: "black",
//             marginTop: 4,
//           }}>
//           Register and book your slot for K2 base camp trek using the table
//           below:
//         </Text>
//       </View>

//       <ScrollView
//         horizontal
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }>
//         <DataTable>
//           <DataTable.Row>
//             <DataTable.Cell style={{flex: 1}}>Full name</DataTable.Cell>
//             <DataTable.Cell style={{flex: 1}}>Start date</DataTable.Cell>
//             <DataTable.Cell style={{flex: 1}}>End date</DataTable.Cell>
//             <DataTable.Cell style={{flex: 1}}>Status</DataTable.Cell>
//             <DataTable.Cell style={{flex: 1}}>Deposit</DataTable.Cell>
//           </DataTable.Row>

//           {data?.map((item, index) => (
//             <DataTable.Row
//               key={index}
//               style={{borderBottomWidth: 1, borderBottomColor: "#ccc"}}>
//               <DataTable.Cell
//                 style={{
//                   flex: 1,
//                   borderRightWidth: 1,
//                   borderRightColor: "#ccc",
//                   paddingHorizontal: 7,
//                   justifyContent: "center",
//                 }}>
//                 {item.fullName}
//               </DataTable.Cell>
//               <DataTable.Cell
//                 style={{
//                   flex: 1,
//                   borderRightWidth: 1,
//                   borderRightColor: "#ccc",
//                   paddingHorizontal: 7,
//                   justifyContent: "center",
//                 }}>
//                 {moment(item.startDate).format("DD-MM-YY")}
//               </DataTable.Cell>
//               <DataTable.Cell
//                 style={{
//                   flex: 1,
//                   borderRightWidth: 1,
//                   borderRightColor: "#ccc",
//                   paddingHorizontal: 7,
//                   justifyContent: "center",
//                 }}>
//                 {moment(item.endDate).format("DD-MM-YY")}
//               </DataTable.Cell>
//               <DataTable.Cell
//                 style={{
//                   flex: 1,
//                   borderRightWidth: 1,
//                   borderRightColor: "#ccc",
//                   paddingHorizontal: 7,
//                   justifyContent: "center",
//                 }}>
//                 {item.status}
//               </DataTable.Cell>
//               <DataTable.Cell
//                 style={{
//                   flex: 1,
//                   borderRightWidth: 1,
//                   borderRightColor: "#ccc",
//                   paddingHorizontal: 7,
//                   justifyContent: "center",
//                 }}>
//                 {item.deposit}
//               </DataTable.Cell>
//             </DataTable.Row>
//           ))}
//         </DataTable>
//       </ScrollView>
//     </View>
//   );
// }

import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetAllBookingsForUserQuery } from "../../../redux/reducers/booking/bookingThunk";

export default function Booking() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Trip Booking");
  const [userId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch userId from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        if (id) {
          setUserId(id);
        } else {
          // Handle case where userId is not found
          console.error("User ID not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();
  }, []);

  // Query to fetch bookings with proper error handling
  const { data, error, isLoading, refetch } = useGetAllBookingsForUserQuery(userId, {
    skip: !userId, // Skip the query if userId is not available
    refetchOnMountOrArgChange: true, // Refetch when component mounts or userId changes
  });

  // Pull-to-refresh handler with proper error handling
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing bookings:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  // Show login message if no userId
  if (!userId) {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/icons/hickes.jpg")}
          />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>Please log in to view your bookings</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../assets/icons/hickes.jpg")}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "Trip Booking" && styles.selectedTab
          ]}
          onPress={() => setSelectedTab("Trip Booking")}
        >
          <Text style={styles.tabText}>Trip Booking</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Your bookings are displayed in the table below:
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="green" style={styles.loader} />
      ) : error ? (
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>
            {error?.data?.message || "Failed to fetch bookings. Please try again."}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => refetch()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          horizontal
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <DataTable style={styles.dataTable}>
            <DataTable.Header style={styles.dataTableHeader}>
              <DataTable.Title>
                <Text style={styles.headerTitle}>Full Name</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.headerTitle}>Start Date</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.headerTitle}>Status</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.headerTitle}>Deposit</Text>
              </DataTable.Title>
            </DataTable.Header>

            {data?.length > 0 ? (
              data.map((item, index) => (
                <DataTable.Row
                  key={item._id || index}
                  style={[
                    styles.dataTableRow,
                    { 
                      backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#FFFFFF"
                    }
                  ]}
                >
                  <DataTable.Cell>
                    <Text style={styles.cellText}>{item.fullName}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.cellText}>
                      {moment(item.startDate).format("DD-MM-YY")}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text
                      style={[
                        styles.cellText,
                        {
                          color: 
                            item.status === "Confirmed" ? "#2E7D32" : "#D32F2F"
                        }
                      ]}
                    >
                      {item.status}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.cellText}>{item.deposit}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            ) : (
              <DataTable.Row style={styles.noDataRow}>
                <DataTable.Cell>
                  <Text style={styles.noDataText}>No bookings found</Text>
                </DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9"
  },
  imageContainer: {
    height: "30%"
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover"
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center"
  },
  selectedTab: {
    borderWidth: 1,
    borderColor: "green"
  },
  tabText: {
    color: "green",
    fontSize: 12
  },
  titleContainer: {
    justifyContent: "center",
    padding: 20
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    marginTop: 4
  },
  loader: {
    marginTop: 20
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 15
  },
  retryButton: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold"
  },
  dataTable: {
    backgroundColor: "#FFFFFF", 
    borderRadius: 12, 
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  dataTableHeader: {
    backgroundColor: "#E6F3E6", 
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12
  },
  headerTitle: {
    fontWeight: "bold", 
    color: "#2E7D32", 
    fontSize: 13
  },
  dataTableRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0"
  },
  cellText: {
    color: "#424242", 
    fontSize: 12
  },
  noDataRow: {
    justifyContent: "center"
  },
  noDataText: {
    color: "gray",
    textAlign: "center"
  }
});