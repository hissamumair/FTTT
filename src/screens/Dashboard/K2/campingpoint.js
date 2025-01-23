// import React from "react";
// import {View, Text, Image, ScrollView} from "react-native";
// import {Card, Divider} from "react-native-paper";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHikingData } from './../redux/reducers/features/hikingSlice'; // Import your action to fetch hiking data
// import { useGetCampingByPlaceIdQuery } from "../../../redux/reducers/camping/campingThunk";

// export default function Campingpoint({expeditionId}) {

//   const {data:campData, isLoading, error} = useGetCampingByPlaceIdQuery(expeditionId);
//   console.log("camp", campData,error)

//   const data = [
//     {
//       heading:"Camping points",
//       summary:"The standard trekking route to reach the base of K2 is known as the Baltoro Glacier and Concordia Trek. This is one of the most spectacular and challenging treks in the world, offering breathtaking views of some of the highest peaks in the Karakoram Range. Here's a detailed outline of the typical hiking trail leading to K2 Base Camp",
//     },
//     {
//       title: "Islamabad to Skardu:",
//       day: "Day 1",
//       desc: "Fly or drive from Islamabad to Skardu, a small town in the Gilgit-Baltistan region, which serves as the gateway to the Karakoram Range.",
//     },
//     {
//       title: " Skardu to Askole (3,000 m / 9,842 ft):to Skardu:",
//       day: "Day 2",
//       desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape..",
//     },
//     {
//       title: "Askole to Jhula (3,200 m / 10,499 ft):",
//       day: "Day 3",
//       desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape..",
//     },
//     {
//       title: "Jhula to Paiju (3,420 m / 11,220 ft):",
//       day: "Day 4",
//       desc: "Trek through the rugged terrain along the Braldu River to reach Paiju. This campsite offers stunning views of Paiju Peak and the Trango Towers. Trekking time is about 6-7 hours.",
//     },
//     {
//       title: "Paiju to Khoburtse (3,810 m / 12,500 ft):",
//       day: "Day 5",
//       desc: "Trek through the rugged terrain along the Braldu River to reach Paiju. This campsite offers stunning views of Paiju Peak and the Trango Towers. Trekking time is about 6-7 hours.",
//     },
//     {
//       title: "Khoburtse to Urdukas (4,130 m / 13,550 ft):",
//       day: "Day 6",
//       desc: ".A short but challenging trek along the Baltoro Glacier to reach Urdukas, a beautiful campsite with views of the Karakoram peaks. Trekking time is about 4-5 hours.",
//     },
//   ];

//   const images = [
//     require("../../../assets/icons/k22.png"),
//     require("../../../assets/icons/k21.png"),
//     require("../../../assets/icons/k22.png"),
//     require("../../../assets/icons/k22.png"),
//   ];
//   return (
//     <View>
//          <View style={{marginVertical: 5,marginBottom: 10 }}>
//            <>
//              <Text style={{fontSize: 13, fontWeight: "bold",color:"black"}}>Camping points</Text>
//              <Text style={{fontSize: 11, fontWeight: "400"}}>{campData?.description}</Text>
//            </>
//            {
//           data?.trails?.map((trail,index)=>
//          <View key={index} style={{marginVertical: 5,marginTop:-25}}>
//           <Text style={{fontSize: 13, fontWeight: "600",color:"black"}}>{track?.trackName}</Text>
//           <Text style={{fontSize: 10, fontWeight: "bold", color: "black"}}>
//             {track.day.dayDescription}
//           </Text>
//           <Text style={{fontSize: 10, fontWeight: "400"}}>Height: {track.height.meters}meters/ {track.height.feet}feet</Text>
//         </View> 
//         </View> 
     
     
//       <Card style={{backgroundColor: "#B3E5FC", padding: 10, borderRadius: 10}}>
//         <Card.Title
//           title="Important Notes"
//           titleStyle={{color: "#333"}}
//           subtitleStyle={{color: "#666"}}
//         />
//         <Card.Content>
//           <Text style={{marginBottom: 5, color: "#333", fontSize: 10}}>
//             Duration: The entire trek typically takes 19-21 days, depending on
//             weather and conditions.
//           </Text>
//           <Divider style={{marginVertical: 5}} />
//           <Text style={{marginBottom: 5, color: "#333", fontSize: 10}}>
//             Best Time to Trek: June to August.
//           </Text>
//           <Divider style={{marginVertical: 5}} />
//           <Text style={{marginBottom: 5, color: "#333", fontSize: 10}}>
//             Physical Fitness: This is a strenuous trek, requiring good physical
//             condition, experience with high-altitude trekking, and mental
//             endurance.
//           </Text>
//           <Divider style={{marginVertical: 5}} />
//           <Text style={{marginBottom: 5, color: "#333", fontSize: 10}}>
//             Permits: Special permits are required to enter the restricted areas
//             of the Karakoram Range.
//           </Text>
//           <Divider style={{marginVertical: 5}} />
//           <Text style={{color: "#333", fontSize: 10}}>
//             The K2 Base Camp trek offers an unforgettable experience for
//             trekkers, providing some of the most spectacular mountain views and
//             a true sense of adventure.
//           </Text>
//         </Card.Content>
//         <Card.Actions></Card.Actions>
//       </Card>
//       <View style={{justifyContent: "center", flex: 1, alignItems: "center"}}>
//         <Text
//           style={{
//             fontSize: 18,
//             alignSelf: "flex-start",
//             color: "black",
//             marginBottom: 10,
//           }}>
//           Hiking Location
//         </Text>
//         <Image
//           source={require("../../../assets/icons/mapk2.png")} // Correct path to your image
//           style={{width: "100%", resizeMode: "contain", marginTop: -400}} // Set desired dimensions and resize mode
//         />
//       </View>
//       <View
//         style={{
//           justifyContent: "center",
//           justifyItem: "center",
//           marginTop: -380,
//         }}>
//         <Text
//           style={{
//             fontSize: 15,
//             fontWeight: "bold",
//             marginVertical: 5,
//             color: "black",
//           }}>
//           Photo Gallery
//         </Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View style={{flexDirection: "row", alignItems: "center"}}>
//             {images.map((image, index) => (
//             <Image
//               key={index}
//               source={image}
//               style={{ width: 100, height: 100, marginRight: 10 }}
//             />
//           ))}
//           </View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// }


import React, { useState } from "react";
import { View, Text, Image, ScrollView, Modal, TouchableOpacity } from "react-native";
import { Card, Divider } from "react-native-paper";
import { useGetCampingByPlaceIdQuery } from "../../../redux/reducers/camping/campingThunk";
import ImageComponent from "../../../components/image";

export default function Campingpoint({ expeditionId }) {
  const { data: campData, isLoading, error } = useGetCampingByPlaceIdQuery(expeditionId);


  if (isLoading) {
    return <Text>Loading...</Text>; // Handle loading state
  }

  if (error) {
    return <Text>Error loading data.</Text>; // Handle error state
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ marginVertical: 5, marginBottom: 10 }}>
        <Text style={{ fontSize: 13, fontWeight: "bold", color: "black" }}>
          Camping points
        </Text>
        <Text style={{ fontSize: 11, fontWeight: "400" }}>{campData?.description}</Text>
        {campData?.track?.map((track, index) => (
          <View key={index} style={{ marginVertical: 5 }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }}>
              {track.trackName}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "black" }}>
              {track.day.dayDescription}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "400" }}>
              Height: {track.height.meters} meters / {track.height.feet} feet
            </Text>
          </View>
        ))}
      </View>

      <Card style={{ backgroundColor: "#B3E5FC", padding: 10, borderRadius: 10 }}>
        <Card.Title title="Important Notes" titleStyle={{ color: "#333" }} />
        <Card.Content>
          <Text style={{ marginBottom: 5, color: "#333", fontSize: 10 }}>
            Duration: The entire trek typically takes 19-21 days, depending on weather and conditions.
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ marginBottom: 5, color: "#333", fontSize: 10 }}>
            Best Time to Trek: June to August.
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ marginBottom: 5, color: "#333", fontSize: 10 }}>
            Physical Fitness: This is a strenuous trek, requiring good physical condition, experience with high-altitude trekking, and mental endurance.
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ marginBottom: 5, color: "#333", fontSize: 10 }}>
            Permits: Special permits are required to enter the restricted areas of the Karakoram Range.
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ color: "#333", fontSize: 10 }}>
            The K2 Base Camp trek offers an unforgettable experience for trekkers, providing some of the most spectacular mountain views and a true sense of adventure.
          </Text>
        </Card.Content>
      </Card>
<ImageComponent/>
     

    </View>
  );
}
