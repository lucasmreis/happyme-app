import Mori from 'mori';

let {toClj, assoc, updateIn, conj} = Mori;

export const goTo = (state, route) =>
  assoc(state, 'screen', route);

export const view = (state, which) => state;

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
  sentences: [
    {id: 123, text: 'one sentence'},
    {id: 456, text: 'another sentence'},
    {id: 789, text: 'last sentence'}
  ]
});