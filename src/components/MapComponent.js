import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = () => {
  // Set up state for region, centering on the area including Nanga Parbat, Broad Peak, K2, Rakaposhi, and Lady Finger
  const [region, setRegion] = useState({
    latitude: 35.5, // Central latitude between these peaks
    longitude: 74.9, // Central longitude between these peaks
    latitudeDelta: 0.5, // Adjust zoom level
    longitudeDelta: 0.5,
  });

  // Markers for the mountain peaks
  const [markers, setMarkers] = useState([
    {
      latlng: { latitude: 35.2392, longitude: 74.5886 }, // Nanga Parbat
      title: 'Nanga Parbat',
      description: '8th highest mountain in the world, 8,126 meters',
    },
    {
      latlng: { latitude: 35.7802, longitude: 76.6056 }, // Broad Peak
      title: 'Broad Peak',
      description: '12th highest mountain in the world, 8,051 meters',
    },
    {
      latlng: { latitude: 35.8808, longitude: 76.5157 }, // K2
      title: 'K2',
      description: '2nd highest mountain in the world, 8,611 meters',
    },
    {
      latlng: { latitude: 35.3547, longitude: 74.5862 }, // Rakaposhi
      title: 'Rakaposhi',
      description: '27th highest mountain in the world, 7,788 meters',
    },
    {
      latlng: { latitude: 35.4546, longitude: 75.6959 }, // Lady Finger (Biafo Glacier)
      title: 'Lady Finger',
      description: 'A prominent peak in the Karakoram range, 6,000+ meters',
    },
  ]);

  // Handle region change
  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChange} // Update the region when map is moved
      >
        {/* Render markers dynamically for each mountain */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <Text style={styles.text}>Map of Gilgit-Baltistan Mountain Peaks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  text: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MapComponent;
