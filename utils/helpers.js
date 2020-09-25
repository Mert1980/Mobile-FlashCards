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
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(
          async ({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleNotificationAsync({
                content: {
                  title: "Flashcard Daily Reminder!",
                  body: "👋 You didn't take any quiz today",
                  data: { data: "goes here" },
                },
                trigger: { seconds: (tomorrow.getTime() - Date.now()) / 1000 },
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            } else {
            }
          }
        );
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

export const getDecks = () => {};

export const getDeck = (deckId) => {};

export const saveDeckTitle = (title) => {};

export const addCardToDeck = (title, card) => {};
