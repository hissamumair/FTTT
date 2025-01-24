import React from "react";
import {View, Image, ScrollView} from "react-native";
import {Card, Divider,Text} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {setGadgets} from "./../../../redux/reducers/features/gadgetSlice";
import {useGetGadgetByPlaceIdQuery} from "../../../redux/reducers/gadget/gadgetThunk";
import ImageComponent from "../../../components/image";
export default function Gadget({expeditionId}) {
  const {data, isLoading, error} = useGetGadgetByPlaceIdQuery(expeditionId);
  console.log("data",data)


  
  if (isLoading) {
    return <Text>Loading...</Text>; // Handle loading state
  }

  if (error) {
    return <Text>Error loading data.</Text>; // Handle error state
  }
  return (
    <View style={{flex: 1}}>
      <View style={{marginBottom: 20, margin: 10}}>
        <>
          <Text style={{fontSize: 14, fontWeight: "bold", color: "black"}}>
            Complete hicking gadgets guide
          </Text>
          <Text style={{fontSize: 12, fontWeight: "400", color: "black" }}>
            {data?.description}
          </Text>
        </>
        {data?.categories?.map((category, index) => (
          <View
            key={`${index}`}
            style={{
              justifyContent: "center",
              justifyItem: "center",
              marginTop: 15,
            }}>
            <Text style={{fontSize: 13, fontWeight: "600", color: "black"}}>
             {index + 1}. {category?.categoryName}
            </Text>
            {category?.tools?.map((tool, i) => (
              <View key={i} style={{marginTop:5}}>
                <Text
                  style={{fontSize: 10, fontWeight: "bold", color: "black"}}>
                 {i+1}. {tool?.name}
                </Text>

                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: "400",
                    marginTop: 0,
                    marginBottom: 0,
                     color: "black" 
                  }}>
                  {tool?.description}
                </Text>
              </View>
            ))}
          </View>
        ))}


        
      </View>
      
      













      
<ImageComponent/>
      {/* <View
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
      </View> */}
      {/* <Card
        style={{
          backgroundColor: "#B3E5FC",
          padding: 10,
          borderRadius: 10,
          height: "50%",
          width: "95%",
        }}>
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
      
    </View>
    
    

  );
}
