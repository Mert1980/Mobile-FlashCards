import { AsyncStorage } from "react-native";
import * as Notifications from "expo-notifications";

import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "FlashCardApp:notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date() + 1;
            tomorrow.setDate(tomorrow.getDate());
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleNotificationAsync(
              {
                title: "Log your stats!",
                body: "👋 don't forget to log your stats for today!",
                ios: {
                  sound: true,
                },
                android: {
                  sound: true,
                  sticky: false,
                },
              },
              {
                time: tomorrow.getTime() + 6000, // almost every minute it should show the notification
                repeat: "minute",
              }
            );

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

export const result = (score) => {
  if (score < 50) {
    return "Poor ;(";
  } else if (50 <= score && score < 70) {
    return "Satisfactory!";
  } else if (70 <= score && score < 90) {
    return "Congratulations!";
  } else if (score >= 90) {
    return "Well done!";
  }
};

export function removeByKey(myObj, deleteKey) {
  return Object.keys(myObj)
    .filter((key) => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = myObj[current];
      return result;
    }, {});
}
