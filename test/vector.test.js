import Vector from '../src/vector'

describe('Vector', () => {
  describe('magnitude', () => {
    describe('with two positions with the same x co-ordinates', () => {
      it('must return the absolute distance between two y co-ordinates', () => {
        let origin = { x: 1, y: 4 };
        let destination = { x: 1, y: 7};
        let vector = new Vector(origin, destination);
        expect(vector.magnitude).toEqual(3);
      });
    });

    describe('with two positions with the same y co-ordinates', () => {
      it('must return the absolute distance between two x co-ordinates', () => {
        let origin = { x: 1, y: 1 };
        let destination = { x: 3, y: 1};
        let vector = new Vector(origin, destination);
        expect(vector.magnitude).toEqual(2);
      });
    });

    describe('with two positions with different x and y co-ordinates', () => {
      it('must return null', () => {
        let origin = { x: 1, y: 1 };
        let destination = { x: 3, y: 3};
        let vector = new Vector(origin, destination);
        expect(vector.magnitude).toBe(null);
      });
    });
  });

  describe('orthogonal', () => {
    describe('when sharing the same x or y co-ordinates', () => {
      it('must return true', () => {
        let origin = { x: 3, y: 1 };
        let destination = { x: 3, y: 3};
        let vector = new Vector(origin, destination);
        expect(vector.orthogonal).toBe(true);
      });
    });

    describe('when not sharing the same x and y co-ordinates', () => {
      it('must return false', () => {
        let origin = { x: 1, y: 1 };
        let destination = { x: 3, y: 3};
        let vector = new Vector(origin, destination);
        expect(vector.orthogonal).toBe(false);
      });
    });
  });
});
