import Territory from '../src/territory'
import Point from '../src/point'

describe('Territory', () => {
  describe('initialize', () => {
    it('must set attributes', () => {
      let point = new Point({id: 1, x: 2, y: 3, stone: null, territory_id: 3});
      let territory = new Territory({points: [point]});
      expect(territory.points).toEqual([point]);
    });
  });

  describe('includes', () => {
    describe('when point is in the territory', () => {
      it('must return true', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: null, territory_id: 3});
        let territory = new Territory({points: [point]});
        let result = territory.includes(point);
        expect(result).toBe(true);
      });
    });

    describe('when point is not in the territory', () => {
      it('must return false', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: null, territory_id: 3});
        let otherPoint = new Point({id: 2, x: 3, y: 4, stone: null, territory_id: 4});
        let territory = new Territory({points: [point]});
        let result = territory.includes(otherPoint);
        expect(result).toBe(false);
      });
    });
  });

  describe('length', () => {
    it('must return the length of the points', () => {
      let point = new Point({id: 1, x: 2, y: 3, stone: null, territory_id: 3});
      let otherPoint = new Point({id: 2, x: 3, y: 4, stone: null, territory_id: 5});
      let territory = new Territory({points: [point, otherPoint]});
      expect(territory.length).toEqual(2);
    });
  });
});
