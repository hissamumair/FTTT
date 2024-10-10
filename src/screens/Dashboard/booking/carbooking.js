import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Card, Title } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; 

const { width } = Dimensions.get('window');

const bookingData = [
  { id: '1', name: 'CAR', plate: 'Silver-(RIL456)', price: 'Rs 25,568', seats: 4, doors: 2, auto: true, ac: true, image: require("../../../assets/icons/car.jpg") },
  { id: '2', name: 'VAN', plate: 'Gold-(RIL789)', price: 'Rs 30,000', seats: 5, doors: 4, auto: true, ac: true, image: require('../../../assets/icons/van2.jpg') },
  { id: '3', name: 'JEEP', plate: 'White-(RIL123)', price: 'Rs 20,000', seats: 5, doors: 4, auto: true, ac: true, image: require('../../../assets/icons/jeep.jpg') },
];

export default function Booking() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(null);
  const handleBackPress = () => {
    navigation.goBack("Transportbooking"); 
  };
  // State for text inputs
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const renderVehicleItem = (item) => (
    <Card key={item.id} style={{ width: width * 0.7, marginHorizontal: 10, borderRadius: 10 }}>
      <Card.Content>
        <Image 
          source={item.image} 
          style={{ height: 100, width: '100%', borderRadius: 8}} 
          resizeMode="cover"
        />
        <Title style={{ fontSize: 14, fontWeight: "bold", marginTop: 5, textAlign: 'center' }}>{item.name}</Title>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
          <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5, alignItems: 'center' }}>
            <Text>{item.doors} Doors</Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5, alignItems: 'center' }}>
            <Text>{item.seats} Seats</Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5, alignItems: 'center' }}>
            <Text>{item.auto ? 'Automatic' : 'Manual'}</Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5, alignItems: 'center' }}>
            <Text>{item.ac ? 'AC' : 'Non-AC'}</Text>
          </View>
        </View>

        <Text style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{item.price}</Text>
      </Card.Content>
      <Card.Actions>
       
      </Card.Actions>
      
      <Text style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' ,color:"black",marginRight:110,marginTop:-10}}>Selected Departure Date</Text>
      <ScrollView style={{ paddingHorizontal: 1 ,            margin:0,
}}>
        <TextInput 
          placeholder="Date" 
          value={name} 
          onChangeText={setName} 
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            fontSize: 12,
            marginBottom: 10,
            height:35,
            width:"90%",
          }}
        />
        <TextInput 
          placeholder="From Current Location" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            height:35,
            width:"90%",
            fontSize: 14,
            marginBottom: 10,
          }}
        />
        <TextInput 
          placeholder="Desire Location" 
          value={email} 
          onChangeText={setEmail} 
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            fontSize: 14,
            height:35,
            width:"90%",
            marginBottom: 10,
          }}
        />
        <TextInput 
          placeholder="Full Name" 
          value={date} 
          onChangeText={setDate} 
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            fontSize: 14,
            height:35,
            width:"90%",
            marginBottom: 10,
          }}
        />
        <TextInput 
          placeholder="Select Gender" 
          value={time} 
          onChangeText={setTime} 
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            height:35,
            width:"90%",
            fontSize: 14,
            marginBottom: 10,
          }}
        />
        <TextInput 
          placeholder="Contact No" 
          value={time} 
          onChangeText={setTime} 
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            height:35,
            width:"90%",
            fontSize: 14,
            marginBottom: 10,
          }}
        />
<TouchableOpacity 
  onPress={() => { 
    if (navigation) {
      setSelectedTab('Vehicle Booking'); // Set selected tab
      navigation.navigate('HomeStack', { screen: 'Carbookingconfirm',params:{screen:"Carbookingconfirm"} }); // Navigate to the CarBookingConfirm screen
    } else {
      console.error('Navigation not available');
    }
  }} 
  style={{
    backgroundColor: 'green', 
    height: 30,
    width: '80%',
    marginHorizontal: 20,
    borderRadius: 5, 
    alignItems: 'center', 
    justifyContent: 'center',
  }}
>
  <Text style={{ color: 'white', fontSize: 12 }}>Next</Text>
</TouchableOpacity>



      </ScrollView>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '30%' }}>
        <Image 
          style={{ height: '100%', width: '100%', resizeMode: 'cover' }} 
          source={require('../../../assets/icons/wellcome.png')} 
        />
         <TouchableOpacity 
          style={{
           position: 'absolute', 
            //padding: 20,
            margin:15,
            borderRadius:1,
            borderWidth:1,
            height:20,
            opacity:0.8,
            width:25,
            backgroundColor:"green",
          }} 
          onPress={handleBackPress}
        >
          <MaterialIcon name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <View style={{ position: 'absolute', top: '30%', left: 0, right: 190, alignItems: 'center' }}>
          <Text style={{ fontSize: 15, color: 'black',marginRight:35}}>Welcome to</Text>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: 'green' }}>Book your</Text>
          <Text style={{ fontSize: 15, color: 'black',marginRight:35 }}>hicking trip</Text>

        </View>
      </View>

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
            setSelectedTab('Trip Booking');
            navigation.navigate('HomeStack', { screen: 'TripBooking' });
          }}
        >
          <Text style={{ color: 'green', fontSize: 12 }}>Trip Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{ 
            padding: 10, 
            borderRadius: 5, 
            width: '40%', 
            alignItems: 'center', 
            borderWidth: selectedTab === 'Vehicle Booking' ? 1 : 0, 
            borderColor: selectedTab === 'Vehicle Booking' ? 'green' : 'transparent',
          }} 
          onPress={() => {
            setSelectedTab('Vehicle Booking');
            navigation.navigate('HomeStack', { screen: 'VehicleBooking' });
          }}
        >
          <Text style={{ color: 'green', fontSize: 12 }}>Vehicle Booking</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, paddingVertical: 10 }}>
        {bookingData.map(renderVehicleItem)} 
      </ScrollView>
    </View>
  );
}
