import Mori from 'mori';

import {nextIndex, previousIndex} from '../../src/scripts/util';

describe('util', () => {
  it('nextIndex', () => {
    const list = Mori.list(1, 2, 3, 4, 5);

    expect(nextIndex(list, 1)).to.equal(2);
    expect(nextIndex(list, 4)).to.equal(0);
  });

  it('previousIndex', () => {
    const list = Mori.list(1, 2, 3, 4, 5);

    expect(previousIndex(list, 3)).to.equal(2);
    expect(previousIndex(list, 0)).to.equal(4);
  });
});