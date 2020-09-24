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
