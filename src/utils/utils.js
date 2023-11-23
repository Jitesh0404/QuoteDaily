import messaging from "@react-native-firebase/messaging";
import { firebase } from "@react-native-firebase/messaging";

export const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: "45482217720:android:94c076f3a7e26ce4856b0d",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "quote-daily-df95b",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID",
  };
   // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    messaging().registerDeviceForRemoteMessages();
  }

  messaging().getToken();

  // Initialize Firebase
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    messaging().registerDeviceForRemoteMessages();
  }
  messaging().getToken();

  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    messaging().registerDeviceForRemoteMessages();
  }

  messaging().onTokenRefresh((token) => {
    console.log("Token refreshed:", token);
  });

  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    messaging().registerDeviceForRemoteMessages();
  }

  messaging().onMessage(async (remoteMessage) => {
    console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });
  firebaseConfig()
};


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });
};

export const getToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log("++++++++++++++++TOken++++++++++++++++++++++++");
  console.log(token);
  console.log("++++++++++++++++TOken++++++++++++++++++++++++");
};
