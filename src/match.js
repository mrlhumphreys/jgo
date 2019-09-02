import { buildPlayers, buildLastAction, buildNotification, winner, asJson } from '@mrlhumphreys/jboardgame'
import { exists } from './utils'
import GameState from './game_state'

class Match {
  constructor(args) {
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = buildPlayers(args.players);
    this.lastAction = buildLastAction(args.last_action);
    this.notification = buildNotification(this, args.notification);
  }

  get asJson() {
    return asJson(this);
  }

  get winner() {
    return winner(this);
  }

  touchPoint(pointId, playerNumber) {
    this._clearLastAction();

    if (exists(this.winner)) {
      this._notify('Game is over.');
    } else {
      let result = this.gameState.move(playerNumber, pointId);
      if (result) {
        this._addMoveToLastAction(pointId);
        this._notify(buildNotification(this));
      } else {
        let error = this.gameState.errors[0];
        this._notify(error.message);
      }
    }
  }

  touchPass(playerNumber) {
    this._clearLastAction();

    if (exists(this.winner)) {
      this._notify('Game is over.');
    } else {
      let result = this.gameState.pass(playerNumber);
      if (result) {
        this._addPassToLastAction();
        this._notify(buildNotification(this));
      } else {
        let error = this.gameState.errors[0];
        this._notify(error.message);
      }
    }
  }

  _clearLastAction() {
    this.lastAction = null;
  }

  _notify(message) {
    this.notification = message;
  }

  _addMoveToLastAction(pointId) {
    this.lastAction = { kind: 'move', data: { pointId: pointId } };
  }

  _addPassToLastAction() {
    this.lastAction = { kind: 'pass', data: { } };
  }
}

export default Match;
