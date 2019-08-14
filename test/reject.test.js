import reject from '../src/reject'

describe('reject', () => {
  it('must return a new array without matching elements', () => {
    let array = [1, 2, 3];
    let result = reject(array, function(e) { return e === 2; });
    let expected = [1, 3];
    expect(result).toEqual(expected);
  }); 
});
