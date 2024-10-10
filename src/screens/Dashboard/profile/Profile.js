import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Profileshare from './profileshare';

export default function Profile() {
  const navigation=useNavigation();
 
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '23%' }}>
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
         padding:40,
          //left: 10, 
          width: '50%', 
        }}>
          <Text style={{ fontSize: 15, color: 'black' }}>
            Welcome to
          </Text>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'green'}}>
             My Profile
          </Text>
          
        </View>
      </View>

      <View style={{  justifyContent: 'center', alignItems: 'center',flexDirection:"row" }}>
        <Image 
        style={{height:60,width:60,marginVertical:10,marginRight:"15%"}}
        source={require("../../../assets/icons/profilepic.png")}/>

        <Text style={{fontSize:16,color:"black",fontWeight:"bold"}}>Hissam Umair</Text>
     


      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '30%',marginTop:-30 }}>
      <Text style={{ fontSize: 12, marginBottom: 5, color: '#333', fontWeight: 'bold' }}>
        Phone No: <Text style={{ fontWeight: 'normal' }}>03139560175</Text>
      </Text>
      <Text style={{ fontSize: 12, marginBottom: 5, color: '#333', fontWeight: 'bold' }}>
        Email Id: <Text style={{ fontWeight: 'normal' }}>hissamyousafzai@gmail.com</Text>
      </Text>
      <Text style={{ fontSize: 12, color: '#333', fontWeight: 'bold' }}>
        Password: <Text style={{ fontWeight: 'normal' }}>********</Text>
      </Text>
     
    </View>
    <View style={{justifyContent:"center",alignItems:"center",marginVertical:-30}}>
    <TouchableOpacity
        style={{borderRadius:5,borderWidth:2,backgroundColor:"green",width:"94%",height:"20%",opacity:0.7}}>
        <Text style={{fontSize:15,color:"white",textAlign:"center",fontWeight:"bold"}}>LogOut</Text>
      </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 ,color:"black",marginTop:-25}}>Expedition History</Text>

      <View style={{  padding: 0, borderWidth: 2, borderColor: '#ccc', borderRadius: 5,backgroundColor:"white" }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Previous History</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5,borderWidth:1,borderRadius:5,borderColor:"grey"}}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333', width: '45%' }}>Place name:</Text>
          <Text style={{ fontSize: 14, color: '#333', width: '55%' }}>Hunza Valley</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 ,borderWidth:1,borderRadius:5,borderColor:"grey"}}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333', width: '45%' }}>Duration:</Text>
          <Text style={{ fontSize: 14, color: '#333', width: '55%' }}>5 Days</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5,borderWidth:1,borderRadius:5,borderColor:"grey" }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333', width: '45%' }}>Cost:</Text>
          <Text style={{ fontSize: 14, color: '#333', width: '55%' }}>26000 Rs</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 ,borderWidth:1,borderRadius:5,borderColor:"grey"}}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333', width: '45%' }}>Start date:</Text>
          <Text style={{ fontSize: 14, color: '#333', width: '55%' }}>5/6/2024</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333', width: '45%' }}>End date:</Text>
          <Text style={{ fontSize: 14, color: '#333', width: '55%' }}>10/6/2024</Text>
        </View>
      </View>
<View style={{justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
<Text style={{ fontSize: 15, fontWeight: 'bold' ,color:"black",left:-110}}>Sharing location with</Text>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 ,borderWidth:1,borderRadius:5,borderColor:"grey"}}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333', width: '45%' }}>Family:</Text>
          <Text style={{ fontSize: 14, color: '#333', width: '55%' }}>03139560175</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 ,borderWidth:1,borderRadius:5,borderColor:"grey"}}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333', width: '45%' }}>Friends:</Text>
          <Text style={{ fontSize: 14, color: '#333', width: '55%' }}>03131345235</Text>
        </View>

        <TouchableOpacity
  onPress={() => navigation.navigate("HomeStack", { screen: "Profileshare", params: { screen: "LocationShare" } })}
  style={{
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: 130,
  }}
>
  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Share location</Text>
</TouchableOpacity>









      </View>
    </View>
  );
}
