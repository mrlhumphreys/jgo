import uniq from '../src/uniq'

describe('uniq', () => {
  it('must return a new array of uniq elements', () => {
    let array = [1,1,2];
    let result = uniq(array); 
    let expected = [1,2];
    expect(result).toEqual(expected);
  });
});
