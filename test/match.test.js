import Match from '../src/match'
import GameState from '../src/game_state'
import fixtures from './fixtures'

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
          player_stats: [ 
            { player_number: 1, passed: false, prisoner_count: 0 },
            { player_number: 2, passed: false, prisoner_count: 0 }
          ],
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
          player_stats: [ 
            { player_number: 1, passed: false, prisoner_count: 0 },
            { player_number: 2, passed: false, prisoner_count: 0 }
          ],
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
          player_stats: [ 
            { player_number: 1, passed: false, prisoner_count: 0 },
            { player_number: 2, passed: false, prisoner_count: 0 }
          ],
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

  describe('winner', () => {
    describe('with a completed game', () => {
      it('returns the player with the highest score', () => {
        let match = fixtures('matchComplete');
        expect(match.winner).toEqual(1);
      });
    });

    describe('with a not yet scorable game', () => {
      it('returns null', () => {
        let match = fixtures('match');
        expect(match.winner).toBe(null);
      });
    });
  });

  describe('touchPoint', () => {
    describe('with a completed game', () => {
      it('notifies that the game is over', () => {
        let match = fixtures('matchComplete');
        let pointId = 1;
        let playerNumber = 1;
        match.touchPoint(pointId, playerNumber);
        expect(match.notification).toEqual('Game is over.');
      });
    });

    describe('with a valid move', () => {
      it('adds move to last action', () => {
        let match = fixtures('match');
        let pointId = 1;
        let playerNumber = 1;
        match.touchPoint(pointId, playerNumber);
        expect(match.lastAction).toEqual({ kind: 'move', data: { pointId: pointId }});
      });

      it('notifies that it is the next players turn', () => {
        let match = fixtures('match');
        let pointId = 1;
        let playerNumber = 1;
        match.touchPoint(pointId, playerNumber);
        expect(match.notification).toEqual('bbb to move');
      });
    });

    describe('with an invalid move', () => {
      it('notifies that there is an error', () => {
        let match = fixtures('match');
        let pointId = -1;
        let playerNumber = 1;
        match.touchPoint(pointId, playerNumber);
        expect(match.notification).toEqual("Point does not exist.");
      });
    });
  });

  describe('touchPass', () => {
    describe('with a completed game', () => {
      it('it notifies that the game is over', () => {
        let match = fixtures('matchComplete');
        let playerNumber = 1;
        match.touchPass(playerNumber);
        expect(match.notification).toEqual('Game is over.');
      });
    });

    describe('with a valid pass', () => {
      it('adds pass to last action', () => {
        let match = fixtures('match');
        let playerNumber = 1;
        match.touchPass(playerNumber);
        expect(match.lastAction).toEqual({ kind: 'pass', data: {} });
      });

      it('notifies that it is the next players turn', () => {
        let match = fixtures('match');
        let playerNumber = 1;
        match.touchPass(playerNumber);
        expect(match.notification).toEqual('bbb to move');
      });
    });

    describe('with an invalid pass', () => {
      it('notifies that there is an error', () => {
        let match = fixtures('match');
        let playerNumber = 2;
        match.touchPass(playerNumber);
        expect(match.notification).toEqual("It is not the player's turn yet.");
      });
    }); 
  });
});
