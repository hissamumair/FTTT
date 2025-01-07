
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { useGetMessagesQuery, useSendMessageMutation } from '../../../redux/reducers/messages/messageThunk';
import { adminId } from '../../../utils/senderDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessageBubble = ({ message, isSender }) => (
  <View style={{ flexDirection: 'column', alignItems: isSender ? 'flex-end' : 'flex-start', padding: 10 }}>
    <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{isSender ? 'Client' : 'Admin'}</Text>
    <View style={{ 
      backgroundColor: isSender ? '#4CAF50' : '#fff', 
      borderColor: '#4CAF50', 
      borderWidth: 1, 
      borderRadius: 10, 
      padding: 10, 
      maxWidth: '75%' 
    }}>
      <Text style={{ color: isSender ? '#fff' : '#4CAF50' }}>{message.message}</Text>
      <Text style={{ fontSize: 10, color: isSender ? '#E0E0E0' : '#666', marginTop: 5 }}>
        {new Date(message.createdAt).toLocaleTimeString()}
      </Text>
    </View>
  </View>
);

const ChatActions = ({ onPress, iconName, disabled = false }) => (
  <TouchableOpacity style={{ marginLeft: 10 }} onPress={onPress} disabled={disabled}>
    <Icon name={iconName} size={30} color={disabled ? '#A5D6A7' : '#4CAF50'} />
  </TouchableOpacity>
);

export default function StartChat({ groupId }) {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };
    getUserId();
  }, []);

  const { 
    data: chatData, 
    isLoading, 
    error, 
    refetch 
  } = useGetMessagesQuery({
    receiverId: adminId,
    senderId: userId
  }, { 
    skip: !userId // Don't run the query until userId is loaded
  });

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const handleSendMessage = async () => {
    if (message.trim() === '' || isSending) return;

    try {
      await sendMessage({
        receiverId: adminId,
        senderId: userId,
        message: message,
      });
      setMessage('');
      refetch(); // Refresh the messages after sending
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // useEffect hook to auto-refresh messages periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch(); // Fetch new messages every 5 seconds (or adjust interval as needed)
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [refetch]);

  const renderMessage = ({ item }) => (
    <MessageBubble 
      message={item} 
      isSender={item.sender._id === userId}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={chatData?.messages || []}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id}
          style={{ flex: 1 }}
          inverted={true}
          onRefresh={refetch}
          refreshing={isLoading}
        />
      )}

      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10, 
        backgroundColor: '#fff', 
        borderTopWidth: 1, 
        borderColor: '#E0E0E0' 
      }}>
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
          editable={!isSending}
        />

        <ChatActions 
          onPress={handleSendMessage} 
          iconName="send" 
          disabled={isSending || message.trim() === ''} 
        />
      </View>
    </View>
  );
}
