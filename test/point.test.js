import Point from '../src/point'
import Stone from '../src/stone'

describe('Point', () => {
  describe('initialize', () => {
    it('must set attributes', () => {
      let point = new Point({id: 1, x: 2, y: 3, stone: null});
      expect(point.id).toEqual(1);
      expect(point.x).toEqual(2);
      expect(point.y).toEqual(3);
      expect(point.stone).toBe(null);
      expect(point.territoryId).toBe(null);
    });

    it('must handle a serialized object of stone', () => {
      let point = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2}});
      let stone = point.stone;
      expect(stone.constructor.name).toEqual('Stone');
      expect(stone.id).toEqual(1);
      expect(stone.playerNumber).toEqual(2);
    });

    it('must handle a null object', () => {
      let point = new Point({id: 1, x: 2, y: 3, stone: null});
      expect(point.stone).toBe(null);
    });
  });

  describe('asJson', () => {
    describe('with stone', () => {
      it('must return the serialized object', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 }});
        let result = point.asJson;
        let expected = {
          id: 1,
          x: 2,
          y: 3,
          territory_id: null,
          stone: {
            id: 1,
            player_number: 2,
            chain_id: null
          }
        };
        expect(result).toEqual(expected);
      });
    });

    describe('without stone', () => {
      it('must return the serialized object', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: null});
        let result = point.asJson;
        let expected = {
          id: 1,
          x: 2,
          y: 3,
          territory_id: null,
          stone: null
        };
        expect(result).toEqual(expected);
      });
    });
  });

  describe('place', () => {
    it('must place a stone on the point', () => {
      let stone = new Stone({id: 1, player_number: 2, chain_id: 3});
      let point = new Point({id: 1, x: 2, y: 3, stone: null});
      point.place(stone);

      expect(point.stone.constructor).toBe(Stone);
      expect(point.stone.id).toEqual(stone.id);
    }); 
  });

  describe('occupied', () => {
    describe('with a stone', () => {
      it('must be true', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2, chain_id: 3 }});
        expect(point.occupied).toBe(true);
      });
    });

    describe('without a stone', () => {
      it('must be false', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: null });
        expect(point.occupied).toBe(false);
      });
    });
  });

  describe('unoccupied', () => {
    describe('without a stone', () => {
      it('must be true', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: null});
        expect(point.unoccupied).toBe(true);
      });
    });

    describe('with a stone', () => {
      it('must be false', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2, chain_id: 3 } });
        expect(point.unoccupied).toBe(false);
      });
    });
  });

  describe('occupied_by', () => {
    describe('when occupied by the player', () => {
      it('must return true', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2, chain_id: 3 }});
        expect(point.occupiedBy(2)).toBe(true);
      });
    });

    describe('when occupied by the other player', () => {
      it('must return false', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 1, chain_id: 3 }});
        expect(point.occupiedBy(2)).toBe(false);
      });
    });

    describe('when not occupied', () => {
      it('must return false', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: null});
        expect(point.occupiedBy(2)).toBe(false);
      });
    });
  });

  describe('occupied_by_opponent', () => {
    describe('when occupied by the opponent', () => {
      it('must return true', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2, chain_id: 3 }});
        expect(point.occupiedByOpponent(1)).toBe(true);
      });
    });

    describe('when occupied by the player', () => {
      it('must return false', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 1, chain_id: 3 }});
        expect(point.occupiedByOpponent(1)).toBe(false);
      });
    });

    describe('when not occupied', () => {
      it('must return false', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: null});
        expect(point.occupiedByOpponent(1)).toBe(false);
      });
    });
  });

  describe('unmarked', () => {
    describe('a point without a territory', () => {
      it('must return true', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: null, territory_id: null});
        expect(point.unmarked).toBe(true);
      });
    });

    describe('a point with a territory', () => {
      it('must return false', () => {
        let point = new Point({id: 1, x: 2, y: 3, stone: null, territory_id: 1});
        expect(point.unmarked).toBe(false);
      });
    });
  });

  describe('captureStone', () => {
    it('must set stone to null', () => {
      let point = new Point({id: 1, x: 2, y: 3, stone: { id: 1, player_number: 1, chain_id: 3 }});
      point.captureStone();
      expect(point.stone).toBe(null);
    });
  });

  describe('addToTerritory', () => {
    it('must update the territory id', () => {
      let point = new Point({id: 1, x: 2, y: 3, stone: null, territory_id: null});
      point.addToTerritory(1);
      expect(point.territoryId).toEqual(1);
    });
  });

  describe('clearTerritory', () => {
    it('must set territory to null', () => {
      let point = new Point({id: 1, x: 2, y: 3, stone: null, territory_id: 7});
      point.clearTerritory();
      expect(point.territoryId).toBe(null);
    });
  });
});
