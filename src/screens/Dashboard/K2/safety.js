import React from "react";
import {View, Text, Image, ScrollView} from "react-native";
import {Card, Divider} from "react-native-paper";

export default function Safety() {
  const data = [
    {
      heading:"Safety equipments",
      summary:"For a safe expedition on K2, it is crucial to have specialized safety equipment due to the extreme conditions and high risks involved. Here's a list of essential ",
    },
    {
      title: "Safety equipment::",
      day: "Avalanche Transceiver: ",
      desc: "(e.g., Black Diamond Guide BT) for locating buried climbers..",
    },
    {
      title: "Personal Safety Devices::",
      day: "Personal Locator Beacon (PLB): ",
      desc: "e.g., ACR ResQLink 400) to send distress signals with GPS location.",
    },
    {
      title: "Weather & Environmental Safety:",
      day: "Weather Meter: ",
      desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape..",
    },
    {
      title: "First Aid & Survival Gear::",
      day: "Comprehensive First Aid Kit:",
      desc: "Customized with items like bandages, antiseptics, painkillers, and altitude sickness medication..",
    },
    {
      title: "Fire & Heat Source:",
      day: "Fire Starter Kit:",
      desc: "Waterproof matches, lighter, and fire starter blocks.",
    },
    {
      title: "Lighting & Visibility:",
      day: "Headlamp:",
      desc: "(e.g., Petzl NAO+) with high luminosity and long battery life for night-time visibility.",
    },
  ];

  const images = [
    require("../../../assets/icons/equipment.png"),
    require("../../../assets/icons/tools3.jpg"),
    require("../../../assets/icons/tools4.jpg"),
    require("../../../assets/icons/tools2.jpg"),
  ];
  return (
    <ScrollView>
    <View style={{flex:1,justifyContent:"center",margin:10}}>
      {data.map((item, index) => (
         <View key={index} style={{marginVertical: 15,marginBottom: 20 }}>
         {item.heading && (
           <>
             <Text style={{fontSize: 13, fontWeight: "bold",color:"black"}}>{item.heading}</Text>
             <Text style={{fontSize: 11, fontWeight: "400"}}>{item.summary}</Text>
           </>
         )}
        <View key={index} style={{marginVertical: 5,marginTop:-25}}>
          <Text style={{fontSize: 13, fontWeight: "600",color:"black"}}>{item.title}</Text>
          <Text style={{fontSize: 10, fontWeight: "bold", color: "black"}}>
            {item.day}
          </Text>
          <Text style={{fontSize: 10, fontWeight: "400"}}>{item.desc}</Text>
        </View>
        </View> // Closing this View here
      ))}
     
     <View
        style={{
          justifyContent: "center",
          justifyItem: "center",
          // marginTop: -380,
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginVertical: 5,
            // marginTop:90,
            color: "black",
          }}>
Photos of Safety equipment        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{flexDirection: "row", alignItems: "center", padding: 15}}>
            {images.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={{width: 120, height: 180, marginRight: 10}}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <Card style={{backgroundColor: "#B3E5FC", borderRadius: 10,height:"10%",width:"95%"}}>
        <Card.Title
          title="Important Notes"
          titleStyle={{color: "#333",fontWeight:"bold"}}
          subtitleStyle={{color: "#666"}}
        />
        <Card.Content>
          <Text style={{margin:10, color: "#333", fontSize: 10,marginTop:-10,fontWeight:"600"}}>
          Use these equipment with the complete guide of a professional doctor.
          </Text>
        
        </Card.Content>
        <Card.Actions></Card.Actions>
      </Card>
    </View>
    </ScrollView>

  );
}



