import { RECEIVE_DECKS, CREATE_DECK, DELETE_DECK } from "../actions/index";
import { removeByKey } from "../utils/helpers";

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case CREATE_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      };
    case DELETE_DECK:
      const { id } = action;
      const { [id]: value, ...remainingDecks } = state;
      console.log("remaining Decks ", remainingDecks);
      return remainingDecks;

    default:
      return state;
  }
}
