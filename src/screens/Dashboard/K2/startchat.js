import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function StartChat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'traveler', text: 'Hi I am Alex' },
    { sender: 'admin', text: 'Hello Alex, how may I help you?' },
    { sender: 'traveler', text: 'Hi I am Alex' },
    { sender: 'admin', text: 'Hello Alex, how may I help you?' },
  ]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setChatHistory([...chatHistory, { sender: 'traveler', text: message }]);
      setMessage('');
    }
  };

  const handleVoiceCall = () => {
    console.log('Voice call initiated');
    // Implement voice call functionality here
  };

  const handleTextToSpeech = () => {
    console.log('Text-to-speech initiated');
    // Implement text-to-speech functionality here
  };

  const renderMessage = ({ item }) => {
    const isTraveler = item.sender === 'traveler';
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: isTraveler ? 'flex-start' : 'flex-end',
          padding: 10,
        }}
      >
        {/* Sender Title */}
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
          {isTraveler ? 'Traveler' : 'Admin'}
        </Text>

        {/* Message Bubble */}
        <View
          style={{
            backgroundColor: isTraveler ? '#4CAF50' : '#fff',
            borderColor: '#4CAF50',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            maxWidth: '75%',
          }}
        >
          <Text style={{ color: isTraveler ? '#fff' : '#4CAF50' }}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      {/* Chat history */}
      <FlatList
        data={chatHistory}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={{ flex: 1 }}
      />

      {/* Message input and actions */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderColor: '#E0E0E0',
        }}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Message here"
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: 25,
            paddingHorizontal: 15,
            marginRight: 10,
          }}
        />

        <TouchableOpacity onPress={sendMessage}>
          <Icon name="send" size={30} color="#4CAF50" />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleVoiceCall}>
          <Icon name="call" size={30} color="#4CAF50" />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleTextToSpeech}>
          <Icon name="mic" size={30} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
