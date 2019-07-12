import Chain from '../src/chain'
import Point from '../src/point'

describe('Chain', () => {
  describe('initialize', () => {
    it('must set attributes', () => {
      let point = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2, chain_id: 3}});
      let chain = new Chain({points: [point]});
      expect(chain.points).toEqual([point]);
    });
  });

  describe('includes', () => {
    describe('when point is in chain', () => {
      it('must return true', () => {
        let inPoint = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2, chain_id: 3}});
        let chain = new Chain({points: [inPoint]});
        let result = chain.includes(inPoint);
        expect(result).toBe(true);
      });
    });

    describe('when point is not in chain', () => {
      it('must return false', () => {
        let inPoint = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2, chain_id: 3}});
        let outPoint = new Point({id: 2, x: 3, y: 4, stone: { id: 2, player_number: 3, chain_id: 4}});
        let chain = new Chain({points: [inPoint]});
        let result = chain.includes(outPoint);
        expect(result).toBe(false);

      });
    });
  });

  describe('playerNumber', () => {
    it('must return the player number of the stone in the chain', () => {
      let pointA = new Point({id: 1, x: 0, y: 0, stone: { id: 1, player_number: 2, chain_id: 3}});
      let pointB = new Point({id: 2, x: 1, y: 0, stone: { id: 2, player_number: 2, chain_id: 3}});
      let chain = new Chain({points: [pointA, pointB]});

      expect(chain.playerNumber).toEqual(2);
    });
  });
});
