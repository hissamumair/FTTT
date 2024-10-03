import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Card, IconButton, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'red', // Set your desired color for the icons
    },
  };
const Weather = () => {
  return (
    <ScrollView style={{ padding: 10 }}>
      <Card style={{ marginBottom: 20, padding: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>K2 weather Now</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:-20 }}>
        <IconButton icon="map-marker" color={theme.colors.primary} size={24} /> 
        <Text style={{ fontSize: 16 }}>Karakoram</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 30 }}>
          <View>
            <Text>Min: -2</Text>
            <Text>Max: 25</Text>
            <Text>Sep/27/2024</Text>
          </View>
          <View style={{ justifyContent: "center", marginHorizontal: 40, marginTop: -130 }}>
            {/* Move wind image and text upward by adjusting marginTop */}
            <Image source={require('../../../assets/icons/wind.png')} style={{ width: 90, height: 60 }} />
            <Text>Partly Cold</Text>
          </View>
          <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: -120 }}>{/* Move -5 text upward */}
            -5
          </Text>
        </View>
      </Card>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Daily weather</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        {dailyWeather.map((weather, index) => (
          <Card key={index} style={{ padding: 10, alignItems: 'center' }}>
            <Image source={weather.icon} style={{ width: 40, height: 40 }} />
            <Text>{weather.date}</Text>
            <Text>{weather.day}</Text>
          </Card>
        ))}
      </View>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Today Probability</Text>
      <Text style={{fontSize:15,fontWeight:"700"}}>Rain Probability</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {rainProbability.map((rain, index) => (
          <Card key={index} style={{ padding: 10, alignItems: 'center', marginRight: 10 }}>
            <Text>{rain.time}</Text>
            <Image source={rain.icon} style={{ width: 40, height: 40 }} />
            <Text>{rain.probability}%</Text>
          </Card>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const dailyWeather = [
  { icon: require('../../../assets/icons/rain2.png'), date: '14', day: 'Thursday' },
  { icon: require('../../../assets/icons/sun.png'), date: '25', day: 'Friday' },
  { icon: require('../../../assets/icons/cloud.png'), date: '26', day: 'Saturday' },
  { icon: require('../../../assets/icons/rain.png'), date: '29', day: 'Sunday' },
];

const rainProbability = [
  { time: '15:00', icon: require('../../../assets/icons/wind.png'), probability: '30' },
  { time: '16:00', icon: require('../../../assets/icons/rain2.png'), probability: '15' },
  { time: '17:00', icon: require('../../../assets/icons/cloud.png'), probability: '60' },
  { time: '18:00', icon: require('../../../assets/icons/cloud.png'), probability: '90' },
  { time: '19:00', icon: require('../../../assets/icons/sun.png'), probability: '90' },
];

export default Weather;
