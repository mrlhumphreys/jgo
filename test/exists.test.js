import exists from '../src/exists'

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
