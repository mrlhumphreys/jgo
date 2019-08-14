import compact from '../src/compact'

describe('compact', () => {
  it('must return a new array without nulls', () => {
    let array = [1, null, 3];
    let result = compact(array);
    let expected = [1, 3];
    expect(result).toEqual(expected);
  });
});
