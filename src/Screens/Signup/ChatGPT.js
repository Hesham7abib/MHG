import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
import firestore from 'firebase/firestore';



// Initialize Firebase
const firebaseConfig = {
    // Add your Firebase coimport firebase from 'firebase/app';

    apiKey: 'AIzaSyAEHmbzrybzYm7O42IzxaswtxwCrjlY6YI',
    authDomain: '1076932314221-jvfqjmq57ge5bsiv47kdhh4dceqd2fbq.apps.googleusercontent.com',
    projectId: 'newlastapp',
    appId: '1:1076932314221:android:c57e83fabe4935ad3beb64',
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const Chat = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const db = firebase.firestore();
        const unsubscribe = db.collection('messages').orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
                const firebaseData = doc.data();
                const data = {
                    _id: doc.id,
                    text: firebaseData.text,
                    createdAt: new Date(firebaseData.createdAt.seconds * 1000),
                    user: {
                        _id: firebaseData.user._id,
                        name: firebaseData.user.name,
                    },
                };
                return data;
            });
            setMessages(messages);
        });
        return () => unsubscribe();
    }, []);
    const onSend = async (newMessages = []) => {
        const userMessage = newMessages[0].text;
        const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
        const prompt = `The following is a conversation with an AI assistant. The assistant helps with general tasks like booking a restaurant, finding a hotel, or making a reservation. \n\nUser: ${userMessage}\nAI:`;
        const data = {
            prompt: prompt,
            max_tokens: 100,
            n: 1,
            stop: '\n',
        };
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + 'YOUR_OPENAI_API_KEY',
        };
        const response = await fetch(openaiEndpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });
        const json = await response.json();
        const aiMessage = json.choices[0].text.trim();
        const db = firebase.firestore();
        const newMessage = {
            text: aiMessage,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            user: {
                _id: 2,
                name: 'AI Assistant',
            },
        };
        db.collection('messages').add(newMessage);
    };
    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
                name: 'User',
            }}
            placeholder="Type your message here..."
            showUserAvatar={true}
            alwaysShowSend={true}
            scrollToBottom={true}
            inverted={false}
            renderUsernameOnMessage={true}
            isTyping={false}
            alignTop={false}
        />
    );
};
export default Chat;