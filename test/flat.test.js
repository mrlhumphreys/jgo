import flat from '../src/flat'

describe('flat', () => {
  describe('default', () => {
    it('flattens the array to one layer of depth', () => {
      let array = [[1,2],[3,[4,5]]];
      let result = flat(array);
      expect(result).toEqual([1,2,3,[4,5]]);
    });
  });

  describe('with depth specified', () => {
    it('flattens the array to the depth specified', () => {
      let array = [[1,2],[3,[4,5]]];
      let result = flat(array, 2);
      expect(result).toEqual([1,2,3,4,5]);
    });
  });
});

