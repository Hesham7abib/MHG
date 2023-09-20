import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";

export const configurePushNotification = () => {
  // ... Rest of your PushNotification configuration
  // ... You can add messaging().onMessage and other listeners here

  const pushNotifListener = messaging().onMessage(async (remoteMessage) => {
    console.log("A new FCM message arrived!", remoteMessage);
    pushNotif(remoteMessage);
  });

  // Return the listener so that it can be removed when necessary
  return pushNotifListener;
};