// import { useNavigation } from '@react-navigation/native';
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
// import AntDesignIcon from 'react-native-vector-icons/AntDesign'; 

// export default function Currency() {
//   const navigation = useNavigation();
//   const [amount, setAmount] = useState('');
//   const [convertedAmount, setConvertedAmount] = useState(null);
//   const [currencyFrom, setCurrencyFrom] = useState('USD'); // Default currency
//   const [currencyTo, setCurrencyTo] = useState('EUR'); // Default currency
//   const [clientName, setClientName] = useState('John Doe'); // Example client name
//   const [clientNumber, setClientNumber] = useState('1234567890'); // Example client number
//   const [clientEmail, setClientEmail] = useState('john.doe@example.com'); // Example client email

//   const handleSettingsPress = () => {
//     navigation.navigate('HomeStack', { screen: "Profileshare", params: { screen: "profileshare" } });
//   };

//   const convertCurrency = () => {
//     const conversionRate = 0.85; // Change as needed
//     const result = parseFloat(amount) * conversionRate;
//     setConvertedAmount(result.toFixed(2)); // Set converted amount to 2 decimal places
//   };

//   return (
//     <View style={{ flex: 1,backgroundColor:"white" }}>
//       <View style={{ height: '23%' }}>
//         <Image 
//           style={{ height: '100%', width: '100%', resizeMode: 'cover' }} 
//           source={require('../../assets/icons/wellcome.png')} 
//         />
//         <TouchableOpacity 
//           style={{
//             position: 'absolute',
//             top: 15,
//             right: 15,
//             borderRadius: 20,
//             height: 30,
//             width: 30,
//             backgroundColor: "green",
//             justifyContent: 'center',
//             alignItems: 'center',
//             opacity: 0.8,
//           }} 
//           onPress={handleSettingsPress}
//         >
//           <AntDesignIcon name="setting" size={20} color="white" />
//         </TouchableOpacity>
//         <View style={{
//           position: 'absolute',
//           padding: 40,
//           width: '50%',
//         }}>
//           <Text style={{ fontSize: 13, color: 'black' }}>
//             Welcome to
//           </Text>
//           <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'green' }}>
//             Currency Converter
//           </Text>
//         </View>
//       </View>

//       {/* Currency Converter Section */}
//       <View style={{ padding: 20, flex: 1 }}>
//         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Convert Currency</Text>

//         {/* From Currency Selection */}
//         <View style={{ marginVertical: 10 }}>
//           <Text style={{ fontWeight: 'bold' }}>From</Text>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <TouchableOpacity 
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 borderColor: 'gray',
//                 borderWidth: 1,
//                 borderRadius: 5,
//                 padding: 10,
//                 flex: 1,
//               }}
//               onPress={() => {
//                 // Add currency selection logic here
//               }}
//             >
//               <Text style={{ marginRight: 10 }}>{currencyFrom}</Text>
//               <AntDesignIcon name="down" size={16} />
//             </TouchableOpacity>
//             <TextInput
//               style={{
//                 borderColor: 'gray',
//                 borderWidth: 1,
//                 borderRadius: 5,
//                 padding: 10,
//                 marginLeft: 10,
//                 flex: 2,
//               }}
//               placeholder="Enter amount"
//               keyboardType="numeric"
//               value={amount}
//               onChangeText={setAmount}
//             />
//           </View>
//         </View>

//         {/* To Currency Selection */}
//         <View style={{ marginVertical: 10 }}>
//           <Text style={{ fontWeight: 'bold' }}>To</Text>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <TouchableOpacity 
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 borderColor: 'gray',
//                 borderWidth: 1,
//                 borderRadius: 5,
//                 padding: 10,
//                 flex: 1,
//               }}
//               onPress={() => {
//                 // Add currency selection logic here
//               }}
//             >
//               <Text style={{ marginRight: 10 }}>{currencyTo}</Text>
//               <AntDesignIcon name="down" size={16} />
//             </TouchableOpacity>
//             <TextInput
//               style={{
//                 borderColor: 'gray',
//                 borderWidth: 1,
//                 borderRadius: 5,
//                 padding: 10,
//                 marginLeft: 10,
//                 flex: 2,
//               }}
//               placeholder="Enter amount"
//               keyboardType="numeric"
//               value={amount}
//               onChangeText={setAmount}
//             />
//           </View>
//         </View>

//         {/* Client Information Section */}
//         <View style={{
//           borderColor: 'gray',
//           borderWidth: 1,
//           borderRadius: 5,
//           padding: 20,
//           marginTop: 30,
//           backgroundColor: '#f9f9f9', // Light background for better visibility
//         }}>
//           <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Client Information</Text>
//           <Text style={{ fontSize: 16, marginBottom: 5 }}>Name: <Text style={{ fontWeight: 'bold' }}>{clientName}</Text></Text>
//           <Text style={{ fontSize: 16, marginBottom: 5 }}>Number: <Text style={{ fontWeight: 'bold' }}>{clientNumber}</Text></Text>
//           <Text style={{ fontSize: 16 }}>Email: <Text style={{ fontWeight: 'bold' }}>{clientEmail}</Text></Text>
//         </View>

//         {/* Conversion Result Button */}
//         <TouchableOpacity 
//           style={{
//             backgroundColor: 'green',
//             borderRadius: 5,
//             padding: 10,
//             alignItems: 'center',
//             marginVertical: 10,
//             position: 'absolute',
//             bottom: 20,
//             left: 20,
//             right: 20,
//           }} 
//           onPress={convertCurrency}
//         >
//           <Text style={{ color: 'white', fontWeight: 'bold' }}>Convert</Text>
//         </TouchableOpacity>

//         {convertedAmount !== null && (
//           <Text style={{ marginTop: 10, fontSize: 16 }}>
//             Converted Amount: {currencyTo} {convertedAmount}
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// }

import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';

export default function Currency() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencyFrom, setCurrencyFrom] = useState('USD'); // Default currency
  const [currencyTo, setCurrencyTo] = useState('EUR'); // Default currency
  const [clientName, setClientName] = useState('John Doe');
  const [clientNumber, setClientNumber] = useState('1234567890');
  const [clientEmail, setClientEmail] = useState('john.doe@example.com');
  const [currencies, setCurrencies] = useState([]); // Store available currencies

  // Fetch available currencies and set them in the dropdown
  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/617757c9370897d277b010fc/latest/USD`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.conversion_rates));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSettingsPress = () => {
    navigation.navigate('HomeStack', { screen: "Profileshare", params: { screen: "profileshare" } });
  };

  const convertCurrency = () => {
    if (amount === '') {
      Alert.alert('Please enter an amount');
      return;
    }
    fetch(`https://v6.exchangerate-api.com/v6/617757c9370897d277b010fc/pair/${currencyFrom}/${currencyTo}/${amount}`)
      .then((response) => response.json())
      .then((data) => {
        setConvertedAmount(data.conversion_result.toFixed(2));
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ height: '23%' }}>
        <Image
          style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
          source={require('../../assets/icons/wellcome.png')}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 15,
            right: 15,
            borderRadius: 20,
            height: 30,
            width: 30,
            backgroundColor: "green",
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.8,
          }}
          onPress={handleSettingsPress}
        >
          <AntDesignIcon name="setting" size={20} color="white" />
        </TouchableOpacity>
        <View style={{
          position: 'absolute',
          padding: 40,
          width: '50%',
        }}>
          <Text style={{ fontSize: 13, color: 'black' }}>Welcome to</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'green' }}>Currency Converter</Text>
        </View>
      </View>

      <View style={{ padding: 20, flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Convert Currency</Text>

        {/* From Currency Selection */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>From</Text>
          <Picker
            selectedValue={currencyFrom}
            onValueChange={(itemValue) => setCurrencyFrom(itemValue)}
            style={{ height: 50, width: '100%', marginBottom: 10 }}
          >
            {currencies.map((currency) => (
              <Picker.Item label={currency} value={currency} key={currency} />
            ))}
          </Picker>
          <TextInput
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
              marginLeft: 10,
              flex: 2,
            }}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* To Currency Selection */}
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>To</Text>
          <Picker
            selectedValue={currencyTo}
            onValueChange={(itemValue) => setCurrencyTo(itemValue)}
            style={{ height: 50, width: '100%', marginBottom: 10 }}
          >
            {currencies.map((currency) => (
              <Picker.Item label={currency} value={currency} key={currency} />
            ))}
          </Picker>
        </View>

        {/* Client Information Section */}
        <View style={{
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          padding: 20,
          marginTop: 30,
          backgroundColor: '#f9f9f9',
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Client Information</Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>Name: <Text style={{ fontWeight: 'bold' }}>{clientName}</Text></Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>Number: <Text style={{ fontWeight: 'bold' }}>{clientNumber}</Text></Text>
          <Text style={{ fontSize: 16 }}>Email: <Text style={{ fontWeight: 'bold' }}>{clientEmail}</Text></Text>
        </View>

        {/* Conversion Result Button */}
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            borderRadius: 5,
            padding: 10,
            alignItems: 'center',
            marginVertical: 10,
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
          }}
          onPress={convertCurrency}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Convert</Text>
        </TouchableOpacity>

        {convertedAmount !== null && (
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            Converted Amount: {currencyTo} {convertedAmount}
          </Text>
        )}
      </View>
    </View>
  );
}
