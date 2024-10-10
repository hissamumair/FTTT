import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'; // Import ScrollView
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { Card, Button, Title } from 'react-native-paper';

// Sample data for vehicles
const bookingData = [
  { id: '1', name: 'Mercedes - Benz', plate: 'Silver-(RIL456)', price: 'Rs 25,568', seats: 4, doors: 2, auto: true, ac: true, image: require("../../../assets/icons/car.jpg") },
  { id: '2', name: 'BMW X5', plate: 'Gold-(RIL789)', price: 'Rs 30,000', seats: 5, doors: 4, auto: true, ac: true, image: require('../../../assets/icons/van2.jpg') },
  { id: '3', name: 'Toyota Corolla', plate: 'White-(RIL123)', price: 'Rs 20,000', seats: 5, doors: 4, auto: true, ac: true, image: require('../../../assets/icons/jeep.jpg') },
];

export default function Booking() {
  const navigation = useNavigation(); // Get the navigation object
  const [selectedTab, setSelectedTab] = useState(null); // Initialize state for selected tab

  // Function to render each vehicle item
  const renderVehicleItem = (item) => (
    <Card key={item.id} style={{ marginBottom: 10,height:"30%"}}>
      <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image 
            source={item.image} 
            style={{ height: 120, width: '40%', borderRadius: 8 }} 
            resizeMode="cover"
          />
          <View style={{ marginLeft: 10, flex: 1 }}> 
            <Title style={{fontSize:14,fontWeight:"bold"}}>{item.name}</Title>
            <Text>{item.plate}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../assets/icons/seat.png')} style={{ width: 15, height: 10 }} />
                <Text style={{fontSize:12}}>{item.seats}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../assets/icons/door.png')} style={{ width: 15, height: 10 }} />
                <Text style={{fontSize:12}}>{item.doors}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../assets/icons/auto.png')} style={{ width: 15, height: 10 }} />
                <Text style={{fontSize:12}}>{item.auto ? 'Auto' : 'Manual'}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../assets/icons/ac.png')} style={{ width: 15, height: 10 }} />
                <Text style={{fontSize:12}}>{item.ac ? 'AC' : 'Non-AC'}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../assets/icons/suitcase.png')} style={{ width: 15, height: 10 }} />
                <Text style={{fontSize:12}}>2</Text> 
              </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 12, marginVertical: 5 }}>{item.price}</Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
      <TouchableOpacity 
      onPress={() => navigation.navigate('Carbooking', { carName: item.name })} 
      style={{
        backgroundColor: 'green', 
        marginVertical: 10,
        height: 25,
        width: 80,
        borderRadius: 5, 
        alignItems: 'center', 
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white', fontSize: 10, alignSelf: 'center', marginTop: -10 }}>
        Book Now
      </Text>
    </TouchableOpacity>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '30%' }}>
        <Image 
          style={{ height: '100%', width: '100%', resizeMode: 'cover' }} 
          source={require('../../../assets/icons/wellcome.png')} 
        />
        <View style={{ position: 'absolute', top: '30%', marginHorizontal: 30 }}>
          <Text style={{ fontSize: 15, color: 'black' }}>Welcome to</Text>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: 'green' }}>Book your</Text>
          <Text style={{ fontSize: 15, color: 'black' }}>hiking trip</Text>
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
            setSelectedTab('Trip Booking'); // Set selected tab
            navigation.navigate('HomeStack', { screen: 'TripBooking' }); // Navigate to the Trip Booking screen
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
            setSelectedTab('Vehicle Booking'); // Set selected tab
            navigation.navigate('HomeStack', { screen: 'VehicleBooking' }); // Navigate to the Vehicle Booking screen
          }}
        >
          <Text style={{ color: 'green', fontSize: 12 }}>Vehicle Booking</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {bookingData.map(renderVehicleItem)} 
      </ScrollView>
    </View>
  );
}
