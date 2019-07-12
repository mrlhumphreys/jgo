import GameState from '../src/game_state'
import PointSet from '../src/point_set'

describe('GameState', () => {
  describe('initialize', () => {
    it('must set attributes', () => {
      let gameState = new GameState({
        current_player_number: 1,
        points: [
          { id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 } }
        ],
        prisoner_counts: {
          1: 0,
          2: 0
        },
        previous_state: '1'
      });

      expect(gameState.currentPlayerNumber).toEqual(1);
      expect(gameState.points.constructor).toEqual(PointSet);
      expect(gameState.prisonerCounts.constructor).toEqual(Object);
      expect(gameState.previousState).toEqual('1');
    });
  });

  describe('asJson', () => {
    it('must return an object with attributes', () => {
      let gameState = new GameState({
        current_player_number: 1,
        points: [
          { id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 } }
        ],
        prisoner_counts: {
          1: 0,
          2: 0
        }
      });
      let result = gameState.asJson;
      let expected = {
        current_player_number: 1,
        points: [
          { id: 1, x: 2, y: 3, territory_id: null, stone: { id: 1, player_number: 2, chain_id: null }}
        ],
        prisoner_counts: {
          1: 0,
          2: 0
        },
        previous_state: null
      };
      expect(result).toEqual(expected);
    });
  });

});
