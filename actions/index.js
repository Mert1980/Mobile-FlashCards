import { getDecks, saveDeckTitle } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE-DECKS";
export const CREATE_DECK = "CREATE_DECK";

function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function handleInitialData() {
  return (dispatch) => {
    return getDecks().then((decks) => {
      dispatch(receiveDecks(decks));
    });
  };
}

export function addDeck(title) {
  return {
    type: CREATE_DECK,
    title,
  };
}
