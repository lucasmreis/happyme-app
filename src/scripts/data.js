import Mori from 'mori';

import {nextIndex, previousIndex} from './util';

let {toClj, assoc, updateIn, curry, conj, get} = Mori;

export const goTo = (state, route) => {
  const newScreenState = assoc(state, 'screen', route);
  return assoc(newScreenState, 'currentSentence', 0);
};

export const view = (state, which) => {
  const sentences = get(state, 'sentences');
  const current = get(state, 'currentSentence');
  const next = which === 'next' ?
    nextIndex(sentences, current) :
    previousIndex(sentences, current);
  return assoc(state, 'currentSentence', next);
};

const newSentence = text => toClj({
  id: 1,
  text: text
});

export const add = (state, text) =>
  updateIn(state, ['sentences'], s => conj(s, newSentence(text)));

export const remove = (state, id) =>
  assoc(state, 'sentences', toClj([]));

export const edit = (state, {id, text}) => state;

export const fresh = () => Mori.toClj({
  screen: 'home',
  currentSentence: 0,
  sentences: [
    {id: 123, text: 'one sentence'},
    {id: 456, text: 'another sentence'},
    {id: 789, text: 'last sentence'}
  ]
});