import Mori from 'mori';
import Uuid from 'node-uuid';

import {nextIndex, previousIndex} from './util';

let {toClj, list, assoc, updateIn, curry, conj, get, map} = Mori;

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
  id: Uuid.v4(),
  text: text
});

export const add = (state, text) =>
  updateIn(state, ['sentences'], s => conj(s, newSentence(text)));

export const remove = (state, id) =>
  updateIn(state, ['sentences'], s => Mori.remove(x => get(x, 'id') === id, s));

const changeTextIf = (id, text) => s =>
  get(s, 'id') === id ? toClj({id, text, editing: false}) : s;

export const edit = (state, {id, text}) =>
  updateIn(state, ['sentences'], s => map(changeTextIf(id, text), s));

const setToEditingIf = id => s =>
  get(s, 'id') === id ? assoc(s, 'editing', true) : s;

export const startEditing = (state, id) =>
  updateIn(state, ['sentences'], s => map(setToEditingIf(id), s));

export const fresh = () => toClj({
  screen: 'home',
  currentSentence: 0,
  sentences: list(
    {id: 123, text: 'one sentence'},
    {id: 456, text: 'another sentence'},
    {id: 789, text: 'last sentence'})
});