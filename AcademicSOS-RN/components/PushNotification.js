import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { database, role } from "../firebase/FireBaseConfig.js";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RegisterForPushNotification(userId) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync(userId).then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
  }, []);
};

async function registerForPushNotificationsAsync(userId) {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    database.ref(`users/${role(userId)}`).child(userId).update({ //Update user push token
      pushToken: token
    });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
export async function sendBookConsultPushNotification(expoPushToken, modCode, bookingId, consultDetails) { //Send Book Consult notifications
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: `Consultation Request for ${modCode}:`,
    body: `Request from: ${consultDetails["creator"]}\nTA: ${consultDetails["ta"].name}\nDate: ${consultDetails["consultDate"]} | Time: ${consultDetails["consultStartTime"]}\nLocation: ${consultDetails["location"]}`,
    data: {bookingId: bookingId},
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export async function sendCreateConsultPushNotification(expoPushToken, modCode, bookingId, consultDetails) { //Send Book Consult notifications
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: `Consultation Suggestion for ${modCode}:`,
    body: `TA: ${consultDetails["ta"].name}\nDate: ${consultDetails["consultDate"]} | Time: ${consultDetails["consultStartTime"]}\nLocation: ${consultDetails["location"]}`,
    data: {bookingId: bookingId},
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
