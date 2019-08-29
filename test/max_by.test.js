import maxBy from '../src/max_by'

describe('maxBy', () => {
  it('must return the highest element in the array by transformed property', () => {
    let array = [{a: 1}, {a: 3}, {a: 2}];
    let result = maxBy(array, function(n) { return n.a; });
    let expected = {a: 3};
    expect(result).toEqual(expected);
  });
});
