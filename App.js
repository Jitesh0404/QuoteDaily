import React, { useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { store } from "./store";

// import {
//   notificationListener,
//   requestUserPermission,
//   initializeFirebase,
//   getToken,
// } from "./src/utils/utils";

export default function App() {
  /*
  useEffect(() => {
    initializeFirebase(); // Add this line to initialize Firebase

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    return unsubscribe;
  }, []);
*/
  /*
  useEffect(() => {
    initializeFirebase();
    requestUserPermission();
    notificationListener();
    getToken();
  }, []); 
  */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
