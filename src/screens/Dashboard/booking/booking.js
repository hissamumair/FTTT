// import React, { useState } from 'react';
// import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
// import { DataTable, Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation
// import Bookreg from './bookreg';

// export default function Booking() {
//   const navigation = useNavigation(); // Get the navigation object
//   const [selectedTab, setSelectedTab] = useState(null); // Initialize state here

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={{ height: '30%' }}>
//         <Image 
//           style={{ 
//             height: '100%', 
//             width: '100%', 
//             resizeMode: 'cover' 
//           }} 
//           source={require('../../../assets/icons/wellcome.png')} 
//         />
//         <View style={{ 
//           position: 'absolute', 
//           top: '30%', 
//           marginHorizontal: 30,
//         }}>
//           <Text style={{ fontSize: 15, color: 'black' }}>
//             Welcome to
//           </Text>
//           <Text style={{ fontSize: 28, fontWeight: "bold", color: 'green' }}>
//             Book your 
//           </Text>
//           <Text style={{ fontSize: 15, color: 'black' }}>
//             hiking trip
//           </Text>
//         </View>
//       </View>

//       {/* New Buttons Section */}
//       <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
//         <TouchableOpacity 
//           style={{ 
//             //backgroundColor: 'green', 
//             padding: 10, 
//             borderRadius: 5, 
//             width: '40%', 
//             alignItems: 'center', 
//             // borderWidth:1,
//             borderWidth: selectedTab == category.name ? 1 : 0,

//           }} 
//           onPress={() => console.log('Trip Booking Pressed')}
//         >
//           <Text style={{ color: 'green',fontSize:12 }}>Trip Booking</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={{ 
//            // backgroundColor: 'blue', 
//             padding: 10, 
//             borderRadius: 5, 
//             width: '40%', 
//             borderWidth:1,

//             alignItems: 'center' 
//           }} 
//           onPress={() => console.log('Transport Booking Pressed')}
//         >
//           <Text style={{ color: 'green', fontSize:12 }}>Transport Booking</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ justifyContent: "center", padding: 20 }}>
//         <Text style={{ fontWeight: "400", fontSize: 14, color: "black", marginTop: 4 }}>
//           Register and book your slot for K2 base camp trek using the table below:
//         </Text>
//       </View>

//       <ScrollView>
//         <DataTable>
//           <View style={{ flexDirection: 'row', backgroundColor: 'black', borderBottomWidth: 2, borderBottomColor: '#ccc' }}>
//             <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 2, borderRightColor: '#ccc' }}>
//               <Text style={{ color: 'white' }}>Start Date</Text>
//             </View>
//             <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 2, borderRightColor: '#ccc' }}>
//               <Text style={{ color: 'white' }}>End Date</Text>
//             </View>
//             <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 2, borderRightColor: '#ccc' }}>
//               <Text style={{ color: 'white' }}>Deposit Status</Text>
//             </View>
//             <View style={{ flex: 1, alignItems: 'center' }}>
//               <Text style={{ color: 'white' }}>Register</Text>
//             </View>
//           </View>

//           {[
//             { startDate: "12-june", endDate: "20-june", status: "Paid", statusColor: 'green' },
//             { startDate: "15-july", endDate: "23-july", status: "Pending", statusColor: 'red' },
//             { startDate: "10-August", endDate: "18-August", status: "Paid", statusColor: 'green' },
//             { startDate: "25-sep", endDate: "03-oct", status: "Pending", statusColor: 'red' },
//             { startDate: "12-nov", endDate: "20-nov", status: "Paid", statusColor: 'green' },
//             { startDate: "2-jun", endDate: "1-july", status: "Pending", statusColor: 'red' },
//           ].map((item, index) => (
//             <DataTable.Row key={index} style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
//               <DataTable.Cell style={{ borderRightWidth: 1, borderRightColor: '#ccc', justifyContent: "center" }}>{item.startDate}</DataTable.Cell>
//               <DataTable.Cell style={{ borderRightWidth: 1, borderRightColor: '#ccc', justifyContent: "center" }}>{item.endDate}</DataTable.Cell>
//               <DataTable.Cell style={{ borderRightWidth: 1, borderRightColor: '#ccc', justifyContent: "center" }}>
//                 <Text style={{ color: item.statusColor }}>{item.status}</Text>
//               </DataTable.Cell>
//               <DataTable.Cell style={{ flex: 1, alignItems: 'center' }}>
//                 <Button 
//                   mode="contained" 
//                   compact
//                   labelStyle={{ fontSize: 10, color: 'white' }} 
//                   contentStyle={{ justifyContent: 'center', marginTop: -10 }} 
//                   style={{ 
//                     backgroundColor: item.statusColor, 
//                     paddingHorizontal: 12, 
//                     paddingVertical: 6, 
//                     width: '100%', 
//                     height: 40,  
//                   }}
//                   onPress={() => {
//                     if (item.status === "Paid") {
//                       navigation.reset({
//                         index: 0, // Index of the active route
//                         routes: [{ name: 'HomeStack', params: { screen: 'Bookreg' } }], // Resetting to HomeStack with bookreg screen
//                       });
//                     } else {
//                       console.log('Booking is closed.');
//                     }
//                   }}
//                 >
//                   {item.status === "Paid" ? "Book Now" : "Closed"}
//                 </Button>
//               </DataTable.Cell>
//             </DataTable.Row>
//           ))}
//         </DataTable>
//       </ScrollView>
//     </View>
//   );
// }

import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { DataTable, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Bookreg from './bookreg';

export default function Booking() {
  const navigation = useNavigation(); // Get the navigation object
  const [selectedTab, setSelectedTab] = useState(null); // Initialize state here

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '30%' }}>
        <Image 
          style={{ 
            height: '100%', 
            width: '100%', 
            resizeMode: 'cover' 
          }} 
          source={require('../../../assets/icons/wellcome.png')} 
        />
        <View style={{ 
          position: 'absolute', 
          top: '30%', 
          marginHorizontal: 30,
        }}>
          <Text style={{ fontSize: 15, color: 'black' }}>
            Welcome to
          </Text>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: 'green' }}>
            Book your 
          </Text>
          <Text style={{ fontSize: 15, color: 'black' }}>
            hiking trip
          </Text>
        </View>
      </View>

      {/* New Buttons Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
      <TouchableOpacity 
  style={{ 
    padding: 10, 
    borderRadius: 5, 
    width: '40%', 
    alignItems: 'center', 
    borderWidth: selectedTab === 'Trip Booking' ? 1 : 0, 
    borderColor: selectedTab === 'Trip Booking' ? 'green' : 'transparent', 
  }} 
  onPress={() => {
    setSelectedTab('Trip Booking'); // Set selected tab
    navigation.navigate('HomeStack', { screen: 'Booking',params:{screen:"Booking"} }); // Navigate to the Book Payment screen
  }}
>
  <Text style={{ color: 'green', fontSize: 12 }}>Trip Booking</Text>
</TouchableOpacity>

        <TouchableOpacity 
  style={{ 
    padding: 10, 
    borderRadius: 5, 
    width: '40%', 
    borderWidth: selectedTab === 'Transport Booking' ? 1 : 0, 
    borderColor: selectedTab === 'Transport Booking' ? 'green' : 'transparent', 
    alignItems: 'center' 
  }} 
  onPress={() => {
    setSelectedTab('Transport Booking'); // Set selected tab
    navigation.navigate('HomeStack', { screen: 'Transportbooking' }); 
  }}
>
  <Text style={{ color: 'green', fontSize: 12 }}>Transport Booking</Text>
</TouchableOpacity>

      </View>

      <View style={{ justifyContent: "center", padding: 20 }}>
        <Text style={{ fontWeight: "400", fontSize: 14, color: "black", marginTop: 4 }}>
          Register and book your slot for K2 base camp trek using the table below:
        </Text>
      </View>

      <ScrollView>
        <DataTable>
          <View style={{ flexDirection: 'row', backgroundColor: 'black', borderBottomWidth: 2, borderBottomColor: '#ccc' }}>
            <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 2, borderRightColor: '#ccc' }}>
              <Text style={{ color: 'white' }}>Start Date</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 2, borderRightColor: '#ccc' }}>
              <Text style={{ color: 'white' }}>End Date</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 2, borderRightColor: '#ccc' }}>
              <Text style={{ color: 'white' }}>Deposit Status</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Register</Text>
            </View>
          </View>

          {[
            { startDate: "12-june", endDate: "20-june", status: "Paid", statusColor: 'green' },
            { startDate: "15-july", endDate: "23-july", status: "Pending", statusColor: 'red' },
            { startDate: "10-August", endDate: "18-August", status: "Paid", statusColor: 'green' },
            { startDate: "25-sep", endDate: "03-oct", status: "Pending", statusColor: 'red' },
            { startDate: "12-nov", endDate: "20-nov", status: "Paid", statusColor: 'green' },
            { startDate: "2-jun", endDate: "1-july", status: "Pending", statusColor: 'red' },
          ].map((item, index) => (
            <DataTable.Row key={index} style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <DataTable.Cell style={{ borderRightWidth: 1, borderRightColor: '#ccc', justifyContent: "center" }}>{item.startDate}</DataTable.Cell>
              <DataTable.Cell style={{ borderRightWidth: 1, borderRightColor: '#ccc', justifyContent: "center" }}>{item.endDate}</DataTable.Cell>
              <DataTable.Cell style={{ borderRightWidth: 1, borderRightColor: '#ccc', justifyContent: "center" }}>
                <Text style={{ color: item.statusColor }}>{item.status}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1, alignItems: 'center' }}>
                <Button 
                  mode="contained" 
                  compact
                  labelStyle={{ fontSize: 10, color: 'white' }} 
                  contentStyle={{ justifyContent: 'center', marginTop: -10 }} 
                  style={{ 
                    backgroundColor: item.statusColor, 
                    paddingHorizontal: 12, 
                    paddingVertical: 6, 
                    width: '100%', 
                    height: 40,  
                  }}
                  onPress={() => {
                    if (item.status === "Paid") {
                      navigation.reset({
                        index: 0, 
                        routes: [{ name: 'HomeStack', params: { screen: 'Bookreg' } }], 
                      });
                    } else {
                      console.log('Booking is closed.');
                    }
                  }}
                >
                  {item.status === "Paid" ? "Book Now" : "Closed"}
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
}
