//hissam
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Card, IconButton, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { useGetplaceByIdQuery } from '../../../redux/reducers/places/placeThunk';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'red', // Set your desired color for the icons
  },
};

const Weather = ({ expeditionId }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: placeData, error, isLoading: placeLoading } = useGetplaceByIdQuery(expeditionId);

  useEffect(() => {
    if (placeData?.location) {
      const { latitude, longitude } = placeData.location;
      console.log('Latitude:', latitude, 'Longitude:', longitude);
      fetchWeatherData(latitude, longitude);
      fetchForecastData(latitude, longitude);
    }
  }, [placeData]);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ab977a4eb64014b5cf110444ac1ebf3f`
      );
      const data = await response.json();
      console.log('Weather Data:', data);
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  const fetchForecastData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=ab977a4eb64014b5cf110444ac1ebf3f`
      );
      const data = await response.json();
      console.log('Forecast Data:', data);
      setForecastData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      setLoading(false);
    }
  };

  if (placeLoading || loading) {
    return <Text>Loading...</Text>;
  }

  if (!weatherData || !forecastData) {
    return <Text>Error: Weather or forecast data not available.</Text>;
  }

  const { name, main, weather, sys, dt } = weatherData;
  const { temp, temp_min, temp_max } = main;
  const { description, icon } = weather[0];
  const { country } = sys;

  // Convert temperature from Kelvin to Celsius
  const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

  // Function to get the weather icon URL
  const getWeatherIcon = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}.png`;

  return (
    <ScrollView style={{ padding: 10 }}>
      {/* Current Weather */}
      <Card style={{ marginBottom: 20, padding: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          {name} Weather Now
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -20 }}>
          <IconButton icon="map-marker" color={theme.colors.primary} size={24} />
          <Text style={{ fontSize: 16 }}>{name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 0 }}>
          <View>
            <Text>Min: {kelvinToCelsius(temp_min)}°C</Text>
            <Text>Max: {kelvinToCelsius(temp_max)}°C</Text>
            <Text>{new Date(dt * 1000).toLocaleDateString()}</Text>
          </View>
          <View style={{ justifyContent: "center", marginHorizontal: 40, marginTop: -130 }}>
            <Image source={require('../../../assets/icons/wind.png')} style={{ width: 90, height: 60 }} />
            <Text>{description}</Text>
          </View>
          <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: 0, marginVertical: 20, marginLeft: -25 }}>
            {kelvinToCelsius(temp)}°C
          </Text>
        </View>
      </Card>

      {/* Weekly Forecast */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Weekly Forecast</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        {forecastData.list.slice(0, 7).map((forecast, index) => {
          const { main, weather, dt } = forecast;
          const { temp, temp_min, temp_max } = main;
          const { description, icon } = weather[0];

          return (
            <Card key={index} style={{ padding: 10, alignItems: 'center' }}>
              <Image source={{ uri: getWeatherIcon(icon) }} style={{ width: 40, height: 40 }} />
              <Text>{new Date(dt * 1000).toLocaleDateString()}</Text>
              <Text>{kelvinToCelsius(temp_max)}°C</Text>
              <Text>{description}</Text>
            </Card>
          );
        })}
      </View>

      {/* Rain or Snow Information */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Rain/Snow Information</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {forecastData.list.slice(0, 7).map((forecast, index) => {
          const { rain, snow, dt } = forecast;
          let precipitation = rain ? rain['3h'] : snow ? snow['3h'] : 0;

          return (
            <Card key={index} style={{ padding: 10, alignItems: 'center', marginRight: 10 }}>
              <Text>{new Date(dt * 1000).toLocaleTimeString()}</Text>
              <Text>{precipitation > 0 ? `${precipitation} mm` : 'No rain/snow'}</Text>
            </Card>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

export default Weather;
