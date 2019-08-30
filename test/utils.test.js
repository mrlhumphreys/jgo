import { compact, exists, flat, max, maxBy, min, reject, sum, uniq } from '../src/utils'

describe('compact', () => {
  it('must return a new array without nulls', () => {
    let array = [1, null, 3];
    let result = compact(array);
    let expected = [1, 3];
    expect(result).toEqual(expected);
  });
});

describe("exists", () => {
  describe("with null", () => {
    it("must return false", () => {
      let result = exists(null);
      expect(result).toBe(false);
    });
  });

  describe("with undefined", () => {
    it("must return false", () => {
      let result = exists(undefined);
      expect(result).toBe(false);
    });
  });

  describe("with object", () => {
    it("must return true", () => {
      let result = exists({});
      expect(result).toBe(true);
    });
  });

  describe("with array", () => {
    it("must return true", () => {
      let result = exists([]);
      expect(result).toBe(true);
    });
  });

  describe("with string", () => {
    it("must return true", () => {
      let result = exists("string");
      expect(result).toBe(true);
    });
  });

  describe("with number", () => {
    it("must return true", () => {
      let result = exists(1);
      expect(result).toBe(true);
    });
  });
});

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

describe('maxBy', () => {
  it('must return the highest element in the array by transformed property', () => {
    let array = [{a: 1}, {a: 3}, {a: 2}];
    let result = maxBy(array, function(n) { return n.a; });
    let expected = {a: 3};
    expect(result).toEqual(expected);
  });
});

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

describe('reject', () => {
  it('must return a new array without matching elements', () => {
    let array = [1, 2, 3];
    let result = reject(array, function(e) { return e === 2; });
    let expected = [1, 3];
    expect(result).toEqual(expected);
  }); 
});

describe('sum', () => {
  it('must return the sum of the result of all mapped elements', () => {
    let array = [{a: 1}, {a: 2}, {a: 3}];
    let result = sum(array, function(n) { return n.a; });
    let expected = 6;
    expect(result).toBe(expected);
  });
});

describe('uniq', () => {
  it('must return a new array of uniq elements', () => {
    let array = [1,1,2];
    let result = uniq(array); 
    let expected = [1,2];
    expect(result).toEqual(expected);
  });
});
