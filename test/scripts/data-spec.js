import Mori from 'mori';

import {goTo, view} from '../../src/scripts/data';

let {toClj, get} = Mori;

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
});