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

export function getData() {
  return data;
}

export async function getDecks() {
  try {
    const jsonValue = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);

    if (jsonValue === null) {
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
    }

    return jsonValue === null ? data : JSON.parse(jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export const saveDeckTitle = (title) => {
  try {
    AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title: title,
          questions: [],
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
};

export async function removeDeck(key) {
  try {
    const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    const decks = JSON.parse(results);
    decks[key] = undefined;
    delete decks[key];
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
  } catch (e) {
    console.log(e);
  }
}

export async function getDeck(deckId) {
  console.log("1-deckId ", deckId);
  try {
    const jsonValue = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    console.log("jsonValue ", jsonValue);

    return JSON.parse(jsonValue)[deckId];
  } catch (e) {
    console.log(e);
  }
}

export async function addCardToDeck(title, card) {
  try {
    const deck = await getDeck(title);
    console.log("deck in API ", deck);
    await AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card),
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
}
