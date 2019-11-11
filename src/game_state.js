import { exists, maxBy, sum } from './utils'
import PointSet from './point_set'
import PlayerStat from './player_stat'

class GameState {
  constructor(args) {
    this.currentPlayerNumber = args.current_player_number;
    this.points = new PointSet({points: args.points});
    this.playerStats = args.player_stats.map(function(ps) {
      return new PlayerStat(ps); 
    });;
    this.previousState = exists(args.previous_state) ? args.previous_state : null;
    this.errors = [];
  }

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

  move(playerNumber, pointId) {
    let point = this.points.findById(pointId); 

    this.playerStats.filter((ps) => {
      return ps.playerNumber === this._nextPlayerNumber; 
    })[0].markAsContinuing()

    this.previousState = this.points.minify

    let stoneCount = this.points.performMove(point, playerNumber);

    this.playerStats.filter((ps) => {
      return ps.playerNumber === playerNumber; 
    })[0].addToPrisonerCount(stoneCount);

    this._passTurn();
  }

  pass(playerNumber) {
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
  }

  get score() {
    return [
      { playerNumber: 1, score: this._playerScore(1) },
      { playerNumber: 2, score: this._playerScore(2) }
    ];
  }

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
