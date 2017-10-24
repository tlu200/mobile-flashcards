import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';
import { createReducer, updateObject } from './reducerUtilities';

function receiveDecks(state, action) {
  return action.decks;
}

function addDeck(state, action) {
  return updateObject(state, {
    [action.title]: {
      title: action.title,
      questions: []
    }
  });
}

function addCard(state, action) {
  const deck = {
    title: action.title,
    questions: state[action.title]
      ? state[action.title].questions.concat([action.card])
      : [action.card]
  };
  return updateObject(state, {
    [action.title]: deck
  });
}

export default createReducer({}, {
  [RECEIVE_DECKS]: receiveDecks,
  [ADD_DECK]: addDeck,
  [ADD_CARD]: addCard
})