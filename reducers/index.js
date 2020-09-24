import {
  RECEIVE_DECKS,
  CREATE_DECK,
  DELETE_DECK,
  ADD_CARD,
} from "../actions/index";

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
      return remainingDecks;

    case ADD_CARD:
      const { title, card } = action;
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: [...state[title].questions].concat(card),
        },
      };
    default:
      return state;
  }
}
