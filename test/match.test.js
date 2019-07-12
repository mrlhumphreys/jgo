import Match from '../src/match'
import GameState from '../src/game_state'

describe('Match', () => {
  describe('initialize', () => {
    it('must set attributes', () => {
      let match = new Match({
        id: 1,
        game_state: {
          current_player_number: 1,
          points: [
            { id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 } }
          ],
          prisoner_counts: {
            1: 0,
            2: 0
          },
          previous_state: '1'
        },
        players: [
          { player_number: 1, name: 'aaa', resigned: false }, 
          { player_number: 2, name: 'bbb', resigned: false } 
        ]
      });

      expect(match.id).toEqual(1);
      expect(match.gameState.constructor).toEqual(GameState);
      expect(match.players.length).toEqual(2);
      expect(match.lastAction).toBe(null);
      expect(match.notification).toBe('aaa to move');
    });
  });

  describe('asJson', () => {
    it('must return an object with attributes', () => {
      let match = new Match({
        id: 1,
        game_state: {
          current_player_number: 1,
          points: [
            { id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 } }
          ],
          prisoner_counts: {
            1: 0,
            2: 0
          },
          previous_state: '1'
        },
        players: [
          { player_number: 1, name: 'aaa', resigned: false }, 
          { player_number: 2, name: 'bbb', resigned: false } 
        ]
      });
      let result = match.asJson;
      let expected = {
        id: 1,
        game_state: {
          current_player_number: 1,
          points: [
            { id: 1, x: 2, y: 3, territory_id: null, stone: { id: 1, player_number: 2, chain_id: null } }
          ],
          prisoner_counts: {
            1: 0,
            2: 0
          },
          previous_state: '1'
        },
        players: [
          { player_number: 1, name: 'aaa', resigned: false }, 
          { player_number: 2, name: 'bbb', resigned: false } 
        ],
        last_action: null,
        notification: "aaa to move"
      };

      expect(result).toEqual(expected);
    });
  });
});
