import { getDecks } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE-DECKS";

function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function handleInitialData() {
  return async (dispatch) => {
    const decks = await getDecks();
    dispatch(receiveDecks(decks));
  };
}
