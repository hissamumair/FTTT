import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, {useState, useMemo, useRef, useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {ActivityIndicator, Icon, Modal, Searchbar} from "react-native-paper";
import {TouchableOpacity} from "react-native";
import {useGetAllPlacesQuery} from "../../redux/reducers/places/placeThunk";
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from "react-native-maps";

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  welcomeContainer: {
    //width: "100%",
    height: "20%",
  },
  welcomeBackground: {
    //width:"120%",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    color: "black",
    fontSize: 18,
  },
  titleText: {
    color: "green",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitleText: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  searchBar: {
    backgroundColor: "rgba(30, 30, 30, 0.2)",
    borderRadius: 10,
    margin:10,
  },
  searchInput: {
    color: "#000",
    paddingLeft: 0,
  },
  sectionTitle: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    margin: 10,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  expeditionContainer: {
    position: "relative",
    marginLeft: 10,
    marginBottom: 15,
  },
  expeditionImage: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 14,
    height: 240,
    width: 170,
    overflow: "hidden",
  },
  expeditionOverlay: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    width: 168,
    alignItems: "center",
  },
  expeditionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  expeditionDescription: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  expeditionPrice: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  viewDetailsButton: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  viewDetailsText: {
    color: "white",
    fontWeight: "bold",
  },
  mapContainer: {
    height: height * 0.4,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  zoomControls: {
    position: "absolute",
    right: 16,
    bottom: 166,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  zoomButton: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  markerContainer: {
    alignItems: "center",
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  callout: {
    width: 200,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 12,
    color: "#666",
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fullScreenMarkerContainer: {
    alignItems: 'center',
  },
  fullScreenMarkerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
  },
  fullScreenCallout: {
    width: 250,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  fullScreenCalloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  fullScreenCalloutDescription: {
    fontSize: 14,
    color: '#666',
  }
});

export default function Home() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const {data, isLoading} = useGetAllPlacesQuery();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [isFullScreenMapVisible, setIsFullScreenMapVisible] = useState(false);
  const fullScreenMapRef = useRef(null);

  const handleFullScreenMapOpen = location => {
    setSelectedLocation(location);
    setIsFullScreenMapVisible(true);
  };

  const calculateMapRegion = locations => {
    if (!locations || locations.length === 0) {
      return {
        latitude: 35.8989,
        longitude: 71.3601,
        latitudeDelta: 5,
        longitudeDelta: 5,
      };
    }

    let minLat = Number.POSITIVE_INFINITY;
    let maxLat = Number.NEGATIVE_INFINITY;
    let minLng = Number.POSITIVE_INFINITY;
    let maxLng = Number.NEGATIVE_INFINITY;

    locations.forEach(place => {
      const lat = parseFloat(place.latitude) || 35.8989;
      const lng = parseFloat(place.longitude) || 71.3601;

      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    });

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    const latDelta = (maxLat - minLat) * 1.5;
    const lngDelta = (maxLng - minLng) * 1.5;

    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: Math.max(latDelta, 0.1),
      longitudeDelta: Math.max(lngDelta, 0.1),
    };
  };

  useEffect(() => {
    if (data && data.length > 0) {
      // Choose the first place or a specific place to zoom to
      const initialPlace = data[0];

      const initialRegion = {
        latitude: parseFloat(initialPlace.location.latitude) || 35.8989,
        longitude: parseFloat(initialPlace.location.longitude) || 71.3601,
        latitudeDelta: 0.1, // Smaller delta means more zoomed in
        longitudeDelta: 0.1,
      };

      setMapRegion(initialRegion);

      if (mapRef.current) {
        mapRef.current.animateToRegion(initialRegion, 1000);
      }
    }
  }, [data]);

  useEffect(() => {
    if (filteredPlaces) {
      const newRegion = calculateMapRegion(filteredPlaces);
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    }
  }, [filteredPlaces]);

  const filteredPlaces = useMemo(() => {
    if (!data || !searchQuery.trim()) return data;

    const searchTerms = searchQuery.toLowerCase().trim().split(" ");
    return data.filter(place => {
      const placeName = place.name?.toLowerCase() || "";
      const placeDescription = place.description?.toLowerCase() || "";

      return searchTerms.every(
        term => placeName.includes(term) || placeDescription.includes(term),
      );
    });
  }, [data, searchQuery]);

  const handleMarkerPress = location => {
    setSelectedLocation(location);
    navigation.navigate({
      name: "HomeStack",
      params: {screen: "K2", params: {expedition: location}},
    });
  };

  const handleZoomIn = () => {
    mapRef.current?.getCamera().then(cam => {
      cam.zoom += 1;
      mapRef.current?.animateCamera(cam, {duration: 300});
    });
  };

  const handleZoomOut = () => {
    mapRef.current?.getCamera().then(cam => {
      cam.zoom -= 1;
      mapRef.current?.animateCamera(cam, {duration: 300});
    });
  };

  const renderExpeditionItem = item => (
    <View style={styles.expeditionContainer} key={item?._id}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.title);
        }}>
        <Image
          source={
            item.image
              ? {uri: item.image}
              : require("../../assets/icons/rakaposhi.jpg")
          }
          style={styles.expeditionImage}
        />
      </TouchableOpacity>

      <View style={styles.expeditionOverlay}>
        <Text style={styles.expeditionTitle}>{item.name}</Text>
        {item.description && (
          <Text style={styles.expeditionDescription}>{item.description}</Text>
        )}
        <View style={{alignItems: "center"}}>
          <Text style={styles.expeditionPrice}>{item.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate({
              name: "HomeStack",
              params: {screen: "K2", params: {expedition: item}},
            })
          }
          style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <View style={{justifyContent: "center", width: "100%", height: "100%"}}>
          <ImageBackground
            source={require("../../assets/icons/wellcome.png")}
            style={styles.welcomeBackground}
            resizeMode="cover">
            <Text style={styles.welcomeText}>Welcome to,</Text>
            <Text style={styles.titleText}>Expedition</Text>
            <Text style={styles.subtitleText}>Management System</Text>
          </ImageBackground>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search location here"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
        />
      </View>

      {/* Places List */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={styles.sectionTitle}>
            {searchQuery ? "Search Results" : "Most Popular Places"}
          </Text>
          {filteredPlaces?.length === 0 ? (
            <Text style={styles.noResultsText}>
              No places found matching your search
            </Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 10}}>
              {filteredPlaces?.map(renderExpeditionItem)}
            </ScrollView>
          )}
        </View>
      )}

      {/* Map Section */}
      <View style={styles.mapContainer}>
        {!isLoading && (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={mapRegion || calculateMapRegion(data)}>
            {filteredPlaces?.map(place => (
              <Marker
                key={place._id}
                coordinate={{
                  latitude: parseFloat(place.location.latitude) || 35.8989,
                  longitude: parseFloat(place.location.longitude) || 71.3601,
                }}
                onPress={() => handleMarkerPress(place)}>
                <View style={styles.markerContainer}>
                  <Image
                    source={
                      place.image
                        ? {uri: place.image}
                        : require("../../assets/icons/rakaposhi.jpg")
                    }
                    style={styles.markerImage}
                  />
                </View>
                <Callout tooltip>
                  <View style={styles.callout}>
                    <Text style={styles.calloutTitle}>{place.name}</Text>
                    <Text style={styles.calloutDescription}>
                      {place.description?.slice(0, 100)}
                      {place.description?.length > 100 ? "..." : ""}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        )}

        {/* Zoom Controls */}
        <View style={styles.zoomControls}>
          <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
            <Icon source="plus" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
            <Icon source="minus" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.markerContainer}>
          {/* <TouchableOpacity onPress={handleFullScreenMapOpen} style={styles.zoomButton}>
            <Icon source="minus" size={24} color="black" />
          </TouchableOpacity> */}

          </View>

        </View>
      </View>

      {/* Full Screen Map Modal */}
      {/* <Modal
        visible={isf}
        animationType="slide"
        onRequestClose={() => setIsFullScreenMapVisible(false)}>
        <View style={styles.fullScreenModalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsFullScreenMapVisible(false)}>
            <Icon source="close" size={30} color="black" />
          </TouchableOpacity>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={mapRegion || calculateMapRegion(data)}>
            {filteredPlaces?.map(place => (
              <Marker
                key={place._id}
                coordinate={{
                  latitude: parseFloat(place.location.latitude) || 35.8989,
                  longitude: parseFloat(place.location.longitude) || 71.3601,
                }}
                onPress={() => handleMarkerPress(place)}>
                <View style={styles.markerContainer}>
                  <Image
                    source={
                      place.image
                        ? {uri: place.image}
                        : require("../../assets/icons/rakaposhi.jpg")
                    }
                    style={styles.markerImage}
                  />
                </View>
                <Callout tooltip>
                  <View style={styles.callout}>
                    <Text style={styles.calloutTitle}>{place.name}</Text>
                    <Text style={styles.calloutDescription}>
                      {place.description?.slice(0, 100)}
                      {place.description?.length > 100 ? "..." : ""}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      </Modal> */}
    </ScrollView>
  );
}
