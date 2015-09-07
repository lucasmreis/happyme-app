import Mori from 'mori';

import {goTo, view, remove, startEditing, edit} from '../../src/scripts/data';

let {toClj, get, count, nth} = Mori;

describe('data', () => {
  it('goTo', () => {
    const state = toClj({
      currentSentence: 3,
      screen: 'home'
    });

    const newState = goTo(state, 'read');

    expect(get(newState, 'currentSentence')).to.equal(0);
    expect(get(newState, 'screen')).to.equal('read');
  });

  it('view next', () => {
    const state = toClj({
      currentSentence: 3,
      sentences: [1, 2, 3, 4, 5]
    });

    const newState = view(state, 'next');

    expect(get(newState, 'currentSentence')).to.equal(4);
  });

  it('view previous', () => {
    const state = toClj({
      currentSentence: 3,
      sentences: [1, 2, 3, 4, 5]
    });

    const newState = view(state, 'previous');

    expect(get(newState, 'currentSentence')).to.equal(2);
  });

  it('remove', () => {
    const state = toClj({
      sentences: [
        {id: 'abc', text: 'first'},
        {id: 'def', text: 'second'}
      ]
    });

    const newState = remove(state, 'abc');
    const newSentences = get(newState, 'sentences');
    const firstSentence = nth(newSentences, 0);

    expect(count(newSentences)).to.equal(1);
    expect(get(firstSentence, 'id')).to.equal('def');
    expect(get(firstSentence, 'text')).to.equal('second');
  });

  it('start editing', () => {
    const state = toClj({
      sentences: [
        {id: 'abc', text: 'first'},
        {id: 'def', text: 'second'}
      ]
    });

    const newState = startEditing(state, 'def');
    const newSentences = get(newState, 'sentences');
    const firstSentence = nth(newSentences, 0);
    const secondSentence = nth(newSentences, 1);

    expect(count(newSentences)).to.equal(2);
    expect(get(firstSentence, 'editing')).to.be.null;
    expect(get(secondSentence, 'editing')).to.be.true;
  });

  it('edit', () => {
    const state = toClj({
      sentences: [
        {id: 'abc', text: 'first'},
        {id: 'def', text: 'second', editing: true}
      ]
    });

    const newState = edit(state, {id: 'def', text: 'new text'});
    const newSentences = get(newState, 'sentences');
    const firstSentence = nth(newSentences, 0);
    const secondSentence = nth(newSentences, 1);

    expect(count(newSentences)).to.equal(2);
    expect(get(firstSentence, 'id')).to.equal('abc');
    expect(get(firstSentence, 'text')).to.equal('first');
    expect(get(secondSentence, 'id')).to.equal('def');
    expect(get(secondSentence, 'text')).to.equal('new text');
    expect(get(secondSentence, 'editing')).to.be.false;
  });
});