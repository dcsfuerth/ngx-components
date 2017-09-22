import { random } from '../src/random';

describe('random', () => {
  it('returns the "random" number', () => {
    expect(random()).toEqual(42);
  });
});
