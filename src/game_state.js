import { exists, maxBy, sum } from './utils'
import PointSet from './point_set'
import PlayerStat from './player_stat'

/** A go game state */
class GameState {
  /**
   * Create a game state. 
   * @param {Object} args - The properties of the game state.
   * @param {number} args.current_player_number - The player who's turn it is.
   * @param {Object[]} args.points - An array of point properties. 
   * @param {Object[]} args.player_stats - An array of players statistics.
   * @param {string} [args.previous_state=null] - The previous state of the board.
   * */
  constructor(args) {
    /** @member {number} */
    this.currentPlayerNumber = args.current_player_number;

    /** @member {PointSet} */
    this.points = new PointSet({points: args.points});

    /** @member {PlayerStats[]} */
    this.playerStats = args.player_stats.map(function(ps) {
      return new PlayerStat(ps); 
    });

    /** @member {(string|null)} */
    this.previousState = exists(args.previous_state) ? args.previous_state : null;
  }

  /**
   * The game state serialized as a series of objects.
   * @return {Object}
   */
  get asJson() {
    return {
      current_player_number: this.currentPlayerNumber,
      points: this.points.asJson,
      player_stats: this.playerStats.map(function(ps) {
        return ps.asJson; 
      }),
      previous_state: this.previousState
    };
  }

  /**
   * Make a move.
   * @param {number} playerNumber - The number of the player making the move.
   * @param {number} pointId - The point where the stone is being placed.
   * @return {boolean}
   */
  move(playerNumber, pointId) {
    let point = this.points.findById(pointId); 

    if (exists(point) && playerNumber === this.currentPlayerNumber) {
      this.playerStats.filter((ps) => {
        return ps.playerNumber === this._nextPlayerNumber; 
      })[0].markAsContinuing()

      this.previousState = this.points.minify

      let stoneCount = this.points.performMove(point, playerNumber);

      this.playerStats.filter((ps) => {
        return ps.playerNumber === playerNumber; 
      })[0].addToPrisonerCount(stoneCount);

      this._passTurn();
      return true;
    } else {
      return false;
    }
  }

  
  /**
   * Pass the turn without placing a stone.
   * @param {number} playerNumber - The number of the player passing.
   * @return {boolean}
   */
  pass(playerNumber) {
    if (playerNumber === this.currentPlayerNumber) {
      this.playerStats.filter(function(ps) {
        return ps.playerNumber === playerNumber;
      })[0].markAsPassed();

      let nextPlayerPassed = this.playerStats.filter((ps) => {
        return ps.playerNumber == this._nextPlayerNumber;
      })[0].passed;

      if (nextPlayerPassed) {
        this.points.markTerritories();
      } else {
        this._passTurn();
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get the scores of each player.
   * @return {Object[]}
   */
  get score() {
    return [
      { playerNumber: 1, score: this._playerScore(1) },
      { playerNumber: 2, score: this._playerScore(2) }
    ];
  }

  /**
   * The winner of the game.
   * Returns null if no winner.
   * @return {(number|null)}
   */
  get winner() {
    if (this.playerStats.every(function(ps) { return ps.passed; })) {
      return maxBy(this.score, function(s) { return s.score; }).playerNumber; 
    } else {
      return null;
    }
  }

  _playerScore(playerNumber) {
    return this._prisonerCount(playerNumber) + this._territoryCount(playerNumber);
  }

  _prisonerCount(playerNumber) {
    return this.playerStats.filter(function(ps) {
      return ps.playerNumber === playerNumber; 
    })[0].prisonerCount;
  }

  _territoryCount(playerNumber) {
    return sum(this.points.territoriesFor(playerNumber), function(t) {
      return t.length; 
    });
  }

  _passTurn() {
    this.currentPlayerNumber = this._nextPlayerNumber;
  }

  get _nextPlayerNumber() {
    return this.currentPlayerNumber === 1 ? 2 : 1;
  }
}

export default GameState;
