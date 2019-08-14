import min from '../src/min'

describe('min', () => {
  it('must return the lowest element in array', () => {
    let array = [3, 1, 2];
    let result = min(array);
    let expected = 1;
    expect(result).toEqual(expected);
  });

  it('must return null for empty array', () => {
    let array = [];
    let result = min(array);
    let expected = null;
    expect(result).toEqual(expected);
  });
});
