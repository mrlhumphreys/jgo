import max from '../src/max'

describe('max', () => {
  it('must return the highest element in array', () => {
    let array = [1, 3, 2];
    let result = max(array);
    let expected = 3;
    expect(result).toEqual(expected);
  });

  it('must return null for empty array', () => {
    let array = [];
    let result = max(array);
    let expected = null;
    expect(result).toEqual(expected);
  });
});
