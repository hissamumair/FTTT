// import React from "react";
// import {View, Text, Image, ScrollView} from "react-native";
// import {Card, Divider} from "react-native-paper";
// import { setHikingPoints } from './../../../redux/reducers/features/hikingSlice'; // Import the action
// import { useSelector } from "react-redux";
// import { useGetHikingByPlaceIdQuery } from "../../../redux/reducers/hiking/hikingThunk";

// export default function Hickingpoint({expeditionId}) {
  
//   const {data, isLoading} = useGetHikingByPlaceIdQuery(expeditionId)
//   console.log("data",data)


//   const images = [
//     require("../../../assets/icons/k22.png"),
//     require("../../../assets/icons/k21.png"),
//     require("../../../assets/icons/k22.png"),
//     require("../../../assets/icons/k22.png"),
//   ];
//   return (
//     <View >
//       <View  style={{marginVertical: 5,marginBottom: 10 }}>
       
//           <>
//             <Text style={{fontSize: 14, fontWeight: "bold",color:"black"}}>Hicking Track Details</Text>
//             <Text style={{fontSize: 11, fontWeight: "400"}}>{data?.description}</Text>
//           </>
//         {
//           data?.trails?.map((trail,index)=>
//         <View key={index} style={{marginVertical: 5, marginTop: 5}}>
//           <Text style={{fontSize: 13, fontWeight: "600"}}>{trail?.dayName}</Text>
//           <Text style={{fontSize: 10, fontWeight: "bold", color: "black"}}>
//             {trail.trailName} ({trail?.height?.meters} m, {trail?.height?.feet} m) 
//           </Text>
//           {/* <Text style={{fontSize: 10, fontWeight: "bold", color: "black"}}>
//             {trail?.height?.meters}
//           </Text> */}
//           <Text style={{fontSize: 10, fontWeight: "400"}}>{trail?.trailDescription}</Text>
//         </View>
//           )
//         }
//       </View>
 

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
import { View, Text, Image, ScrollView, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Divider } from "react-native-paper";
import { useGetHikingByPlaceIdQuery } from "../../../redux/reducers/hiking/hikingThunk";
import ImageComponent from "../../../components/image";

export default function Hickingpoint({ expeditionId }) {
  const { data, isLoading } = useGetHikingByPlaceIdQuery(expeditionId);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const openImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };
  

  const closeImage = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View>
      <View style={{ marginVertical: 5, marginBottom: 10 }}>
        <>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "black" }}>Hicking Track Details</Text>
          <Text style={{ fontSize: 11, fontWeight: "400" }}>{data?.description}</Text>
        </>
        {data?.trails?.map((trail, index) => (
          <View key={index} style={{ marginVertical: 5, marginTop: 5 }}>
            <Text style={{ fontSize: 13, fontWeight: "600" }}>{trail?.dayName}</Text>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "black" }}>
              {trail.trailName} ({trail?.height?.meters} m, {trail?.height?.feet} ft)
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "400" }}>{trail?.trailDescription}</Text>
          </View>
        ))}
      </View>

      <Card style={{ backgroundColor: "#B3E5FC", padding: 10, borderRadius: 10 }}>
        <Card.Title
          title="Important Notes"
          titleStyle={{ color: "#333" }}
          subtitleStyle={{ color: "#666" }}
        />
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
        <Card.Actions></Card.Actions>
      </Card>

    
      <ImageComponent/>
     
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
