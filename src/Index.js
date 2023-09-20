import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import MainStackNavigation from "./Navigation/MainStackNavigation"
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import messaging from "@react-native-firebase/messaging";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Alert, AppState, StatusBar } from 'react-native';
import PushNotification from "react-native-push-notification";
import configureStore from './store';
import MyStack from './Navigation/MainStackNavigation';
import 'react-native-get-random-values';



const store = configureStore();

const createNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: "channel-id",
      channelName: "My Channel",
      channelDescription: "A channel to categorize your notifications",
      soundName: "default",
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );
};

const src = () => {
  const [isNotificationHandled, setNotificationHandled] = useState(false);

  useEffect(() => {
    StatusBar.setBackgroundColor('#242526'); // Replace 'black' with your desired color
    StatusBar.setBarStyle('light-content'); // Set text color of status bar (light or dark)
    const requestNotificationPermission = async () => {
      try {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      } catch (error) {
        console.log("error in permission request", error);
      }
    };

    const setupNotifications = async () => {
      createNotificationChannel();

      // Request notification permission
      await requestNotificationPermission();

      // Get the FCM token
      const token = await messaging().getToken();
      console.log('==================token==================');
      console.log(token);
      console.log('====================================');

      // Add event listeners for incoming FCM messages, notification opening, and background messages
      messaging().onMessage(async (remoteMessage) => {
        console.log("A new FCM message arrived!", remoteMessage);
        handleNotification(remoteMessage);
      });

      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log("onNotificationOpenedApp: ", JSON.stringify(remoteMessage));
      });

      messaging().getInitialNotification().then((remoteMessage) => {
        if (remoteMessage) {
          console.log("Notification caused app to open from quit state:", JSON.stringify(remoteMessage));
          handleNotification(remoteMessage);
        }
      });

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        if (!isNotificationHandled) {
          console.log("Message handled in the background!", remoteMessage);
          setNotificationHandled(true);
          PushNotification.localNotification({
            channelId: "channel-id",
            title: remoteMessage?.notification?.title || "",
            message: remoteMessage?.notification?.body || "",
            largeIconUrl: "https://i.postimg.cc/W4R7BGMh/MHG-logo.png",
            smallIcon: "https://i.postimg.cc/W4R7BGMh/MHG-logo.png",
            vibrate: true,
            vibration: 300,
            playSound: true,
            color: "red",
          });
        }
      });
    };

    setupNotifications();

  }, [isNotificationHandled]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
};

export default src;
