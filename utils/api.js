import { AsyncStorage } from 'react-native';
import { FLASH_CARDS_STORAGE_KEY } from './flashCards';

export function getDecks () {
  return AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
    .then((results) => {
      return JSON.parse(results);
    });
}

export function getDeck (id) {
  return getDecks().then((data) => {
    return data[id]
  });
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    },
  }))
}

export function removeDeck (title) {
  return AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title] = undefined;
      delete data[title];
      AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title] = data[title] || { title, questions: []};
      data[title].questions.push(card);
      AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(data))
    })
}