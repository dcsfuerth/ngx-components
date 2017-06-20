import { expect } from 'chai';

import { random } from './random';

describe('random', () => {
  it('returns the "random" number', () => {
    expect(random()).to.equal(42);
  });
});
