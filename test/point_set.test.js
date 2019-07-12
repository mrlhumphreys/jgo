import PointSet from '../src/point_set'
import Point from '../src/point'
import Stone from '../src/stone'

describe('PointSet', () => {
  describe('initialize', () => {
    it('must set attributes', () => {
      let points = [{ id: 1, x: 2, y: 3, stone: null }];
      let pointSet = new PointSet({points: points});
      expect(pointSet.points.constructor).toBe(Array);
    });

    it('must handle empty array', () => {
      let points = [];
      let pointSet = new PointSet({points: points});
      expect(pointSet.points).toEqual([]);
    });

    it('must handle an array of hashes', () => {
      let points = [{ id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 } }];
      let pointSet = new PointSet({points: points});
      let firstPoint = pointSet.points[0];

      expect(firstPoint.constructor).toEqual(Point);
      expect(firstPoint.id).toEqual(1);
      expect(firstPoint.x).toEqual(2);
      expect(firstPoint.y).toEqual(3);
      expect(firstPoint.stone.constructor).toEqual(Stone);
      expect(firstPoint.stone.id).toEqual(1);
      expect(firstPoint.stone.playerNumber).toEqual(2);
    });

    it('must handle an array of points', () => {
      let points = [new Point({ id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 } })];
      let pointSet = new PointSet({points: points});
      let firstPoint = pointSet.points[0];

      expect(firstPoint.constructor).toEqual(Point);
      expect(firstPoint.id).toEqual(1);
      expect(firstPoint.x).toEqual(2);
      expect(firstPoint.y).toEqual(3);
      expect(firstPoint.stone.constructor).toEqual(Stone);
      expect(firstPoint.stone.id).toEqual(1);
    });
  });

  describe('asJson', () => {
    it('must return an array of objects with attributes', () => {
      let points = [{id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 } }];
      let pointSet = new PointSet({points: points});
      let result = pointSet.asJson;
      let expected = [
        { id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2, chain_id: null }, territory_id: null }
      ];

      expect(result).toEqual(expected);
    });
  });
});
