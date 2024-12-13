
import {useNavigation} from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import {Picker} from "@react-native-picker/picker";
//import AntDesignIcon from 'react-native-vector-icons/AntDesign';  // Import the icon

export default function Currency() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Excluded currencies (including USDT)
  const excludedCurrencies = ["USDT", "BTC", "ETH", "XRP"];

  // Fetch available currencies and set them in the dropdown
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://v6.exchangerate-api.com/v6/617757c9370897d277b010fc/latest/USD`,
    )
      .then(response => response.json())
      .then(data => {
        // Filter out excluded currencies and sort alphabetically
        const filteredCurrencies = Object.keys(data.conversion_rates)
          .filter(currency => !excludedCurrencies.includes(currency))
          .sort();
        setCurrencies(filteredCurrencies);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Error", "Failed to load currencies");
        setIsLoading(false);
      });
  }, []);

  const handleSettingsPress = () => {
    navigation.navigate("HomeStack", {
      screen: "Profileshare",
      params: {screen: "profileshare"},
    });
  };
  const handleBackPress = () => {
    // Navigate back to the HomeScreen
    navigation.navigate("Home");
  };
  const convertCurrency = () => {
    if (amount === "") {
      Alert.alert("Error", "Please enter an amount");
      return;
    }

    if (currencyFrom === currencyTo) {
      Alert.alert("Note", "Selected currencies are the same");
      return;
    }

    setIsLoading(true);
    fetch(
      `https://v6.exchangerate-api.com/v6/617757c9370897d277b010fc/pair/${currencyFrom}/${currencyTo}/${amount}`,
    )
      .then(response => response.json())
      .then(data => {
        setConvertedAmount(data.conversion_result.toFixed(2));
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Error", "Failed to convert currency");
        setIsLoading(false);
      });
  };

  return (
    // <ScrollView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
         
          <AntDesignIcon name="arrowleft" size={35} color="green" />
        </TouchableOpacity>
        <Image
          style={styles.headerImage}
          source={require("../../assets/icons/currency.jpg")}
        />
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettingsPress}>
          <AntDesignIcon name="setting" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Currency Converter</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* <Text style={styles.sectionTitle}>Convert Currency</Text> */}

        <View style={styles.currencySection}>
          <Text style={styles.label}>From</Text>
          <Picker
            selectedValue={currencyFrom}
            onValueChange={itemValue => setCurrencyFrom(itemValue)}
            style={styles.picker}>
            {currencies.map(currency => (
              <Picker.Item
                label={currency}
                value={currency}
                key={currency}
                style={styles.pickerItem}
              />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.currencySection}>
          <Text style={styles.label}>To</Text>
          <Picker
            selectedValue={currencyTo}
            onValueChange={itemValue => setCurrencyTo(itemValue)}
            style={styles.picker}>
            {currencies.map(currency => (
              <Picker.Item
                label={currency}
                value={currency}
                key={currency}
                style={styles.pickerItem}
              />
            ))}
          </Picker>
        </View>

        {convertedAmount !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Converted Amount: {currencyTo} {convertedAmount}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.convertButton}
          onPress={convertCurrency}
          disabled={isLoading}>
          <Text style={styles.convertButtonText}>
            {isLoading ? "Processing..." : "Convert"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>

    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: 'red',
    justifyContent: "center",
  },
  headerContainer: {
    height: "25%",
    flex:1,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 1,
  },
  headerImage: {
   height: '70%',
    width: "100%",
    resizeMode: "cover",
  },
  settingsButton: {
    position: "absolute",
    margin:20,

    right: 15,
    borderRadius: 20,

    backgroundColor: "green",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerTitleContainer: {
    alignSelf: "center",
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  contentContainer: {
    padding: 20,
    marginTop: -40,
    //backgroundColor:"red",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 15,
  },
  currencySection: {
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  pickerItem: {
    fontSize: 16,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: "white",
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e6f3e6",
    borderRadius: 10,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  convertButton: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  convertButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
