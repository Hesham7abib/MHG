import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';



const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
  
    // Reference to the 'Chat' collection in Firestore
    const chatRef = firestore().collection('Chat');
  
    // Function to fetch the chat messages from Firestore
    const fetchMessages = async () => {
      try {
        const snapshot = await chatRef.orderBy('timestamp', 'asc').get();
        const fetchedMessages = snapshot.docs.map((doc) => doc.data());
        setMessages(fetchedMessages);
      } catch (error) {
        console.log('Error fetching messages:', error);
      }
    };
  
    // Function to send a new message
    const sendMessage = async () => {
      if (newMessage.trim() === '') {
        return; // Don't send empty messages
      }
  
      try {
        const timestamp = firestore.FieldValue.serverTimestamp(); // Get the server timestamp
        await chatRef.add({
          sender: 'user', // Replace 'user' with a unique identifier for the user (e.g., user's ID or email)
          receiver: 'you', // Replace 'you' with a unique identifier for you (e.g., your ID or email)
          content: newMessage,
          timestamp,
        });
        setNewMessage('');
      } catch (error) {
        console.log('Error sending message:', error);
      }
    };
  
    // Set up a listener to update messages in real-time
    useEffect(() => {
      const unsubscribe = chatRef.orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => doc.data());
        setMessages(updatedMessages);
      });
  
      return () => unsubscribe(); // Unsubscribe from the listener when the component unmounts
    }, []);
  
    // Function to render each chat message
    const renderChatItem = ({ item }) => {
      return (
        <View style={styles.chatItem}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.message}>{item.content}</Text>
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.timestamp.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    chatItem: {
      marginBottom: 10,
    },
    sender: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    message: {
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderColor: '#ccc',
      paddingVertical: 5,
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      fontSize: 16,
    },
    sendButton: {
      paddingHorizontal: 15,
    },
    sendButtonText: {
      color: 'blue',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default ChatScreen;
  