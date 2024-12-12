import React from "react";
import {View, Text, Image, ScrollView} from "react-native";
import {Card, Divider} from "react-native-paper";
import { setHikingPoints } from './../../../redux/reducers/features/hikingSlice'; // Import the action
import { useSelector } from "react-redux";
import { useGetHikingByPlaceIdQuery } from "../../../redux/reducers/hiking/hikingThunk";

export default function Hickingpoint({expeditionId}) {
  
  const {data, isLoading} = useGetHikingByPlaceIdQuery(expeditionId)

  // const data = [
  //   {
  //     heading:"Hicking Track Details",
  //     summary:"The standard trekking route to reach the base of K2 is known as the Baltoro Glacier and Concordia Trek. This is one of the most spectacular and challenging treks in the world, offering breathtaking views of some of the highest peaks in the Karakoram Range. Here's a detailed outline of the typical hiking trail leading to K2 Base Camp",
  //   },
  //   {
  //     title: "Hicking trail:",
  //     day: "Day3:",

  //     path: "Trail 1 (3,000 m / 9,842 ft):",
      
  //     desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape..",
  //   },
  //   {
  //     day: "Day4:",

  //     path: "Trail 2 (3,000 m / 9,842 ft):",
      
  //     desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape..",
  //   },
  //   {
  //     day: "Day5:",

  //     path: "Trail 3 (3,000 m / 9,842 ft):",
      
  //     desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape..",
  //   },
  //   {
  //     day: "Day6:",

  //     path: "Trail 4 (3,000 m / 9,842 ft):",
      
  //     desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape..",
  //   },
  //   {
  //     day: "Day7:",

  //     path: "Trail 5 (3,000 m / 9,842 ft):",
      
  //     desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape..",
  //   },
  //   {
  //     day: "Day8:",

  //     path: "Trail 6 (3,000 m / 9,842 ft):",
      
  //     desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape..",
  //   },
  // ];

  const images = [
    require("../../../assets/icons/k22.png"),
    require("../../../assets/icons/k21.png"),
    require("../../../assets/icons/k22.png"),
    require("../../../assets/icons/k22.png"),
  ];
  return (
    <View >
      <View  style={{marginVertical: 5,marginBottom: 10 }}>
       
          <>
            <Text style={{fontSize: 14, fontWeight: "bold",color:"black"}}>Hicking Track Details</Text>
            <Text style={{fontSize: 11, fontWeight: "400"}}>{data?.description}</Text>
          </>
        {
          data?.trails?.map((trail,index)=>
        <View key={index} style={{marginVertical: 5, marginTop: 5}}>
          <Text style={{fontSize: 13, fontWeight: "600"}}>{trail?.dayName}</Text>
          <Text style={{fontSize: 10, fontWeight: "bold", color: "black"}}>
            {trail.trailName} ({trail?.height?.meters} m, {trail?.height?.feet} m) 
          </Text>
          {/* <Text style={{fontSize: 10, fontWeight: "bold", color: "black"}}>
            {trail?.height?.meters}
          </Text> */}
          <Text style={{fontSize: 10, fontWeight: "400"}}>{trail?.trailDescription}</Text>
        </View>
          )
        }
      </View>
 

      <Card style={{backgroundColor: "#B3E5FC", padding: 10, borderRadius: 10}}>
        <Card.Title
          title="Important Notes"
          titleStyle={{color: "#333"}}
          subtitleStyle={{color: "#666"}}
        />
        <Card.Content>
          <Text style={{marginBottom: 5, color: "#333", fontSize: 10}}>
            Duration: The entire trek typically takes 19-21 days, depending on
            weather and conditions.
          </Text>
          <Divider style={{marginVertical: 5}} />
          <Text style={{marginBottom: 5, color: "#333", fontSize: 10}}>
            Best Time to Trek: June to August.
          </Text>
          <Divider style={{marginVertical: 5}} />
          <Text style={{marginBottom: 5, color: "#333", fontSize: 10}}>
            Physical Fitness: This is a strenuous trek, requiring good physical
            condition, experience with high-altitude trekking, and mental
            endurance.
          </Text>
          <Divider style={{marginVertical: 5}} />
          <Text style={{marginBottom: 5, color: "#333", fontSize: 10}}>
            Permits: Special permits are required to enter the restricted areas
            of the Karakoram Range.
          </Text>
          <Divider style={{marginVertical: 5}} />
          <Text style={{color: "#333", fontSize: 10}}>
            The K2 Base Camp trek offers an unforgettable experience for
            trekkers, providing some of the most spectacular mountain views and
            a true sense of adventure.
          </Text>
        </Card.Content>
        <Card.Actions></Card.Actions>
      </Card>
      <View style={{justifyContent: "center", flex: 1, alignItems: "center"}}>
        <Text
          style={{
            fontSize: 18,
            alignSelf: "flex-start",
            color: "black",
            marginBottom: 10,
          }}>
          Hiking Location
        </Text>
        <Image
          source={require("../../../assets/icons/mapk2.png")} // Correct path to your image
          style={{width: "100%", resizeMode: "contain", marginTop: -400}} // Set desired dimensions and resize mode
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          justifyItem: "center",
          marginTop: -380,
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginVertical: 5,
            color: "black",
          }}>
          Photo Gallery
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={{ width: 100, height: 100, marginRight: 10 }}
            />
          ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
