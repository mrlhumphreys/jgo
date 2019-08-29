import sum from '../src/sum'

describe('sum', () => {
  it('must return the sum of the result of all mapped elements', () => {
    let array = [{a: 1}, {a: 2}, {a: 3}];
    let result = sum(array, function(n) { return n.a; });
    let expected = 6;
    expect(result).toBe(expected);
  });
});
