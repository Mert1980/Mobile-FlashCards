import AsyncStorage from "@react-native-community/async-storage";

export const FLASHCARDS_STORAGE_KEY = "mobileflashcards:udacity";

export const data = {
  React: {
    title: "React",
    questions: [
      {
        question: "React is a library for managing user interfaces.",
        answer: true,
      },
      {
        question:
          "Ajax requests are made in componentDidMount lifecycle event in React.",
        answer: true,
      },
      {
        question: "Hooks are used in class-based components.",
        answer: false,
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question:
          "Closure is the combination of a function and the lexical environment within which that function was declared.",
        answer: true,
      },
    ],
  },
};

export const storeData = async (data) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, jsonData);
  } catch (e) {
    console.log(e);
  }
};

export const getDecks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    console.log("fromLocalStorage", jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
