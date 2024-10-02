import React from "react";
import {View, Text, Image, ScrollView} from "react-native";
import {Card, Divider} from "react-native-paper";

export default function Gadget() {
  const data = [
    {
      heading: "Complete hicking gadgets guide",
      summary:
        "For a successful K2 expedition, especially given the extreme and challenging conditions, a comprehensive gear list is essential. Here’s a full list of gadgets and equipment needed for K2 hiking, ensuring safety, navigation, communication, and overall preparedness.",
    },
    {
      title: "Navigation & Communication:",
      day: "1: GPS Device:",
      device: "Garmin inReach Mini 2:",
      desc: " Lightweight satellite communicator with GPS tracking, weather updates, and two-way messaging.",
    },
    {
      // title: "Navigation & Communication:",
      day: "2: Satellite Phone::",
      device: "Iridium Extreme 9575:",
      desc: " Reliable for voice, data, and messaging in remote areas..",
    },
    {
      // title: "Navigation & Communication:",
      day: "3: Maps & Compass::",
      device: "Suunto MC-2 Compass:",
      desc: " A professional-grade compass with global needle..",
    },
    {
      // title: "Navigation & Communication:",
      day: "4: Personal Locator Beacon (PLB)::",
      device: "ACR ResQLink 400:",
      desc: "Transmits an SOS signal with your GPS location..",
    },
    {
      // title: "Navigation & Communication:",
      day: "5: Emergency Whistle::",
      device: "ACME Tornado 2000:",
      desc: "High-pitched, loud emergency whistle for signaling.",
    },
    {
      // title: "Navigation & Communication:",
      title: "Climbing & Technical Gear:",
      day: "Helmet:",

      // device:"Lightweight yet strong, essential for protection against falling debris.",
      desc: " Lightweight yet strong, essential for protection against falling debris..",
    },
    {
      // title: "Navigation & Communication:",
      day: "Ropes::",
      device: "Mammut Phoenix Dry Rope:",
      desc: " Light, dry-treated rope suitable for high-altitude climbing..",
    },
    {
      // title: "Navigation & Communication:",
      day: "Ice Axe:",
      device: "lack Diamond Raven Pro:",
      desc: "Lightweight and durable for ice climbing.",
    },
    {
      // title: "Navigation & Communication:",
      day: "Carabiners & Quickdraws:",
      device: "DMM Alpha Trad:",
      desc: " Lightweight and durable carabiners for climbing.",
    },
    {
      // title: "Navigation & Communication:",
      title: "Camping & Sleeping Gear:",
      day: "1: Tent:",
      desc: " Lightweight yet strong, essential for protection against falling debris..",
    },
    {
      // title: "Navigation & Communication:",
      day: "2: Sleeping Bag:",
      device: "Mammut Phoenix Dry Rope:",
      desc: " Light, dry-treated rope suitable for high-altitude climbing..",
    },
    {
      // title: "Navigation & Communication:",
      day: "3: Stove & Cooking Equipment:",
      device: "lack Diamond Raven Pro:",
      desc: "Lightweight and durable for ice climbing.",
    },
    {
      // title: "Navigation & Communication:",
      day: "4: Portable Power Bank & Solar Charger:",
      device: "Goal Zero Sherpa 100PD:",
      desc: " For charging gadgets.",
    },
    {
      // title: "Navigation & Communication:",
      title: "Clothing & Footwear:",
      day: "1: Base Layers::",
      device: "Merino Wool Base Layers:",

      desc: " Moisture-wicking and warm.",
    },
    {
      // title: "Navigation & Communication:",
      day: "2:Insulated Jacket:",
      device: "Patagonia DAS Parka:",
      desc: " Light, dry-treated rope suitable for high-altitude climbing..",
    },
    {
      // title: "Navigation & Communication:",
      day: "3:Gloves & Mittens:",
      device: "lBlack Diamond Guide Gloves::",
      desc: "LWarm, waterproof, and durable.",
    },
    {
      // title: "Navigation & Communication:",
      title: "Miscellaneous:",
      day: "1: Camera & Batteries:",
      device: "lack Diamond Raven Pro:",
      desc: " Lightweighion against falling debris..",
    },
    {
      // title: "Navigation & Communication:",
      day: "2: Sunglasses & Goggles:",
      device: "GoPro HERO12 Black:",
      desc: "  For capturing the experience.",
    },
    {
      // title: "Navigation & Communication:",
      day: "3:Trekking Poles:",
      device: "Black Diamond Alpine Carbon Cork:",
      desc: "Durable and lightweight for support..",
    },
  ];

  const images = [
    require("../../../assets/icons/gadget1.png"),
    require("../../../assets/icons/gadget2.png"),
    require("../../../assets/icons/gadget1.png"),
    require("../../../assets/icons/gadget2.png"),
  ];
  return (
    <View style={{flex:1}}>
      {data.map((item, index) => (
        <View key={index} style={{marginBottom: 20, margin: 10}}>
          {item.heading && (
            <>
              <Text style={{fontSize: 13, fontWeight: "bold", color: "black"}}>
                {item.heading}
              </Text>
              <Text style={{fontSize: 11, fontWeight: "400"}}>
                {item.summary}
              </Text>
            </>
          )}
          <View
            key={`content-${index}`}
            style={{
              justifyContent: "center",
              justifyItem: "center",
              marginTop: -35,
            }}>
            <Text style={{fontSize: 13, fontWeight: "600", color: "black"}}>
              {item.title}
            </Text>
            <Text style={{fontSize: 10, fontWeight: "bold", color: "black"}}>
              {item.day}
            </Text>
            {/* <View style={{ marginBottom: 10 }}> */}
            <Text style={{fontSize: 8, fontWeight: "bold", color: "black"}}>
              {item.device}
            </Text>
            {/* </View> */}
            <Text
              style={{
                fontSize: 9,
                fontWeight: "400",
                marginTop: 0,
                marginBottom: 0,
              }}>
              {item.desc}
            </Text>
          </View>
        </View>
      ))}

      {/* <Card style={{backgroundColor: "#B3E5FC", padding: 10, borderRadius: 10}}>
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
      </Card> */}
      {/* <View style={{justifyContent: "center", flex: 1, alignItems: "center"}}>
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
      </View> */}
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
          Photo Gallery
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{flexDirection: "row", alignItems: "center", padding: 15}}>
            {images.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={{width: 100, height: 100, marginRight: 10}}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <Card style={{backgroundColor: "#B3E5FC", padding: 10, borderRadius: 10,height:"50%",width:"95%"}}>
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
    </View>
  );
}
