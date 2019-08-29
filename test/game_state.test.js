import GameState from '../src/game_state'
import PointSet from '../src/point_set'
import Stone from '../src/stone'
import uniq from '../src/uniq'
import fixtures from './fixtures'

describe('GameState', () => {
  describe('initialize', () => {
    it('must set attributes', () => {
      let gameState = new GameState({
        current_player_number: 1,
        points: [
          { id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 } }
        ],
        player_stats: [ 
          { player_number: 1, passed: false, prisoner_count: 0 },
          { player_number: 2, passed: false, prisoner_count: 0 }
        ],
        previous_state: '1'
      });

      expect(gameState.currentPlayerNumber).toEqual(1);
      expect(gameState.points.constructor).toEqual(PointSet);
      expect(gameState.playerStats.constructor).toEqual(Array);
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
        player_stats: [ 
          { player_number: 1, passed: false, prisoner_count: 0 },
          { player_number: 2, passed: false, prisoner_count: 0 }
        ] 
      });
      let result = gameState.asJson;
      let expected = {
        current_player_number: 1,
        points: [
          { id: 1, x: 2, y: 3, territory_id: null, stone: { id: 1, player_number: 2, chain_id: null }}
        ],
        player_stats: [ 
          { player_number: 1, passed: false, prisoner_count: 0 },
          { player_number: 2, passed: false, prisoner_count: 0 } 
        ],
        previous_state: null
      };
      expect(result).toEqual(expected);
    });
  });

  describe('move', () => {
    describe('that is valid', () => {
      it('places the stone', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 4; 

        gameState.move(playerNumber, pointId);
        let point = gameState.points.points.filter(function(p) {
          return p.id === pointId;
        })[0];

        let stone = point.stone;

        expect(stone.constructor).toBe(Stone);
        expect(stone.playerNumber).toEqual(playerNumber);
      });

      it('passes the turn', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 4; 

        gameState.move(playerNumber, pointId);
        expect(gameState.currentPlayerNumber).toEqual(2);
      });

      it('sets no errors', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 4; 

        gameState.move(playerNumber, pointId);
        expect(gameState.errors.length).toEqual(0);
      });

      it('returns true', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 4; 

        let result = gameState.move(playerNumber, pointId);
        expect(result).toBe(true);
      });

      it('stores the previous state', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 4; 

        gameState.move(playerNumber, pointId);
        expect(gameState.previousState).toEqual('-------21');
      });
    });

    describe('with the other player passed', () => {
      it('clears the passed state', () => {
        let gameState = fixtures('gameStatePassed');
        let playerNumber = 1;
        let otherPlayerNumber = 2;
        let pointId = 4;

        gameState.move(playerNumber, pointId);

        let result = gameState.playerStats.filter(function(ps) {
          return ps.playerNumber === otherPlayerNumber;
        })[0].passed;

        expect(result).toBe(false);
      });
    });

    describe('when not on players turn', () => {
      it('must not place a stone', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 2;
        let pointId = 1;

        gameState.move(playerNumber, pointId);

        let stone = gameState.points.points.filter(function(p) {
          return p.id === pointId;
        })[0].stone;

        expect(stone).toBe(null);
      });

      it('must set an error', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 2;
        let pointId = 1;

        gameState.move(playerNumber, pointId);

        let error = gameState.errors[0];

        expect(error.name).toEqual('NotPlayersTurn');
      });

      it('must not pass turn', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 2;
        let pointId = 1;

        gameState.move(playerNumber, pointId);

        expect(gameState.currentPlayerNumber).toEqual(1);
      });

      it('must return false', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 2;
        let pointId = 1;

        let result = gameState.move(playerNumber, pointId);

        expect(result).toBe(false);
      });
    });

    describe('when point is occupied', () => {
      it('must not place a stone', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 8;

        let occupyingStone = gameState.points.points.filter(function(p) {
          return p.id === pointId;
        })[0].stone;

        gameState.move(playerNumber, pointId);

        let stone = gameState.points.points.filter(function(p) {
          return p.id === pointId;
        })[0].stone;

        expect(stone).toEqual(occupyingStone);
      });

      it('must set an error', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 8;

        gameState.move(playerNumber, pointId);

        let error = gameState.errors[0];

        expect(error.name).toEqual('PointNotEmptyError');
      });

      it('must not pass turn', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 8;

        gameState.move(playerNumber, pointId);

        expect(gameState.currentPlayerNumber).toEqual(1);
      });

      it('must return false', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 8;

        let result = gameState.move(playerNumber, pointId);

        expect(result).toBe(false);
      });
    });

    describe('when point does not exist', () => {
      it('must set an error', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 999;

        gameState.move(playerNumber, pointId);

        let error = gameState.errors[0];

        expect(error.name).toEqual('PointNotFoundError');
      });

      it('must not pass turn', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 999;

        gameState.move(playerNumber, pointId);

        expect(gameState.currentPlayerNumber).toEqual(1);
      });

      it('must return false', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let pointId = 999;

        let result = gameState.move(playerNumber, pointId);

        expect(result).toBe(false);
      });
    });

    describe('when point is surrounded by opponent', () => {
      it('must not place a stone', () => {
        let gameState = fixtures('gameStateSurroundedByOpponent');
        let playerNumber = 2;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        let stone = gameState.points.points.filter(function(p) {
          return p.id === pointId;
        })[0].stone;

        expect(stone).toBe(null);
      });

      it('must set an error', () => {
        let gameState = fixtures('gameStateSurroundedByOpponent');
        let playerNumber = 2;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        let error = gameState.errors[0];

        expect(error.name).toEqual('NoLibertiesError');
      });

      it('must not pass turn', () => {
        let gameState = fixtures('gameStateSurroundedByOpponent');
        let playerNumber = 2;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        expect(gameState.currentPlayerNumber).toEqual(2);
      });

      it('must return false', () => {
        let gameState = fixtures('gameStateSurroundedByOpponent');
        let playerNumber = 2;
        let pointId = 12;

        let result = gameState.move(playerNumber, pointId);

        expect(result).toBe(false);
      });
    });

    describe('when a point is surrounded and placing a stone deprives the chains liberties', () => {
      it('must not place a stone', () => {
        let gameState = fixtures('gameStateDeprivesLiberty');
        let playerNumber = 2;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        let stone = gameState.points.points.filter(function(p) {
          return p.id === pointId;
        })[0].stone;

        expect(stone).toBe(null);
      });

      it('must set an error', () => {
        let gameState = fixtures('gameStateDeprivesLiberty');
        let playerNumber = 2;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        let error = gameState.errors[0];

        expect(error.name).toEqual('NoLibertiesError');
      });

      it('must not pass turn', () => {
        let gameState = fixtures('gameStateDeprivesLiberty');
        let playerNumber = 2;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        expect(gameState.currentPlayerNumber).toEqual(2);
      });

      it('must return false', () => {
        let gameState = fixtures('gameStateDeprivesLiberty');
        let playerNumber = 2;
        let pointId = 12;

        let result = gameState.move(playerNumber, pointId);

        expect(result).toBe(false);
      });
    });

    describe('when a point is surrounded and placing a stone does not deprive the chains liberties', () => {
      it('must place a stone', () => {
        let gameState = fixtures('gameStateSurroundedWithLiberty');
        let playerNumber = 2;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        let stone = gameState.points.points.filter(function(p) {
          return p.id === pointId;
        })[0].stone;

        expect(stone.constructor).toEqual(Stone);
      });

      it('must not set an error', () => {
        let gameState = fixtures('gameStateSurroundedWithLiberty');
        let playerNumber = 2;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        let error = gameState.errors[0];

        expect(error).toBe(undefined);
      });

      it('must pass the turn', () => {
        let gameState = fixtures('gameStateSurroundedWithLiberty');
        let playerNumber = 2;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        expect(gameState.currentPlayerNumber).toEqual(1);
      });

      it('must return true', () => {
        let gameState = fixtures('gameStateSurroundedWithLiberty');
        let playerNumber = 2;
        let pointId = 12;

        let result = gameState.move(playerNumber, pointId);

        expect(result).toBe(true);
      });
    });

    describe('when a point is surrounded and placing a stone deprives an opposing chains liberties', () => {
      it('must place a stone', () => {
        let gameState = fixtures('gameStateSurroundedDeprivesLiberties');
        let playerNumber = 1;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        let stone = gameState.points.points.filter(function(p) {
          return p.id === pointId;
        })[0].stone;

        expect(stone.constructor).toEqual(Stone);
      });

      it('must not set an error', () => {
        let gameState = fixtures('gameStateSurroundedDeprivesLiberties');
        let playerNumber = 1;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        let error = gameState.errors[0];

        expect(error).toBe(undefined);
      });

      it('must pass the turn', () => {
        let gameState = fixtures('gameStateSurroundedDeprivesLiberties');
        let playerNumber = 1;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        expect(gameState.currentPlayerNumber).toEqual(2);
      });

      it('must return true', () => {
        let gameState = fixtures('gameStateSurroundedDeprivesLiberties');
        let playerNumber = 1;
        let pointId = 12;

        let result = gameState.move(playerNumber, pointId);

        expect(result).toBe(true); 
      });
    });

    describe('move connects stones', () => {
      it('joins them in one chain', () => {
        let gameState = fixtures('gameStateUnjoinedChains');
        let playerNumber = 2;
        let pointId = 12;

        gameState.move(playerNumber, pointId);

        let points = gameState.points.points.filter(function(p) {
          return [6, 7, 8, 12, 16, 17, 18].includes(p.id);
        });

        let chain_ids = uniq(points.map(function(p) {
          return p.stone.chainId;
        }));

        expect(chain_ids.length).toEqual(1);
      });
    });

    describe('move surrounds stone', () => {
      it('removes surrounded stone', () => {
        let gameState = fixtures('gameStateSurroundStone');
        let playerNumber = 2;
        let pointId = 13;

        gameState.move(playerNumber, pointId);

        let capturePoint = gameState.points.points.filter(function(p) {
          return p.id === 12;
        })[0];

        expect(capturePoint.stone).toBe(null);
      });

      it('increments prisoner counts', () => {
        let gameState = fixtures('gameStateSurroundStone');
        let playerNumber = 2;
        let pointId = 13;

        gameState.move(playerNumber, pointId);

        let prisonerCount = gameState.playerStats.filter(function(ps) {
          return ps.playerNumber === playerNumber;
        })[0].prisonerCount;

        expect(prisonerCount).toEqual(1);
      });
    });

    describe('move puts board to previous position', () => {
      it('must not place stone', () => {
        let gameState = fixtures('gameStateWithPreviousPosition');
        let pointId = 12;
        let playerNumber = 2;

        gameState.move(playerNumber, pointId);

        let point = gameState.points.points.filter(function(p) {
          return p.id === pointId;
        })[0];

        expect(point.stone).toBe(null);
      });

      it('must add error', () => {
        let gameState = fixtures('gameStateWithPreviousPosition');
        let pointId = 12;
        let playerNumber = 2;

        gameState.move(playerNumber, pointId);

        let error = gameState.errors[0];

        expect(error.name).toEqual('KoRuleViolationError');
      });

      it('must return false', () => {
        let gameState = fixtures('gameStateWithPreviousPosition');
        let pointId = 12;
        let playerNumber = 2;

        let result = gameState.move(playerNumber, pointId);

        expect(result).toBe(false);
      });
    });
  });

  describe('pass', () => {
    describe('when players turn', () => {
      it('records that the player has passed', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let otherPlayerNumber = 2;
        
        gameState.pass(playerNumber);

        let playerStat = gameState.playerStats.filter(function(ps) {
          return ps.playerNumber === playerNumber;
        })[0];

        expect(playerStat.passed).toBe(true);
      });

      it('passes the turn', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let otherPlayerNumber = 2;
        
        gameState.pass(playerNumber);

        expect(gameState.currentPlayerNumber).toEqual(otherPlayerNumber);
      });

      it('does not add error', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let otherPlayerNumber = 2;
        
        gameState.pass(playerNumber);

        let error = gameState.errors[0];

        expect(error).toBe(undefined);
      });

      it('returns true', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let otherPlayerNumber = 2;
        
        let result = gameState.pass(playerNumber);

        expect(result).toBe(true);
      });
    });

    describe('when not players turn', () => {
      it('does not record that the player has passed', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let otherPlayerNumber = 2;
        
        gameState.pass(otherPlayerNumber);

        let playerStat = gameState.playerStats.filter(function(ps) {
          return ps.playerNumber === otherPlayerNumber;
        })[0];

        expect(playerStat.passed).toBe(false);
      });

      it('does not pass the turn', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let otherPlayerNumber = 2;
        
        gameState.pass(otherPlayerNumber);

        expect(gameState.currentPlayerNumber).toEqual(playerNumber);
      });

      it('adds error', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let otherPlayerNumber = 2;
        
        gameState.pass(otherPlayerNumber);

        let error = gameState.errors[0];

        expect(error.name).toEqual('NotPlayersTurn');
      });

      it('returns false', () => {
        let gameState = fixtures('gameState');
        let playerNumber = 1;
        let otherPlayerNumber = 2;
        
        let result = gameState.pass(otherPlayerNumber);

        expect(result).toBe(false);
      });
    });

    describe('when the other player has passed already', () => {
      it('must not pass turn', () => {
        let gameState = fixtures('gameStateOtherPlayerPassed');
        let playerNumber = 1;

        gameState.pass(playerNumber);

        expect(gameState.currentPlayerNumber).toEqual(playerNumber);
      });

      it('must mark territory', () => {
        let gameState = fixtures('gameStateOtherPlayerPassed');
        let playerNumber = 1;

        gameState.pass(playerNumber);

        let result = gameState.points.points.some(function(p) {
          return p.territoryId !== null;
        });

        expect(result).toBe(true);
      });
    });
  });

  describe('score', () => {
    describe('with territory on the edge', () => {
      it('counts the territory in the score', () => {
        let gameState = fixtures('gameStateScorable');

        let result = gameState.score;
        let expected = [
          { playerNumber: 1, score: 7 },
          { playerNumber: 2, score: 5 }
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('winner', () => {
    describe('when both players have passed', () => {
      it('must return the player with the highest score', () => {
        let gameState = fixtures('gameStateScorable');
        expect(gameState.winner).toEqual(1);
      });
    });

    describe('when both players have not passed', () => {
      it('must return nil', () => {
        let gameState = fixtures('gameState');
        expect(gameState.winner).toBe(null);
      });
    });
  });
});
