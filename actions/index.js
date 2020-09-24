import { getDecks } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE-DECKS";
export const CREATE_DECK = "CREATE_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_CARD = "ADD_CARD";

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

export function deleteDeck(id) {
  return {
    type: DELETE_DECK,
    id,
  };
}

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  };
}
