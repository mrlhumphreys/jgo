import { buildPlayers, buildLastAction, buildNotification, winner, asJson } from '@mrlhumphreys/jboardgame'
import { exists } from './utils'
import GameState from './game_state'
import Move from './move'
import Pass from './pass'

/** A go match between two players. */
class Match {
  /** 
   * Create a match.
   * @param {Object} args - The properties of the match.
   * @param {number} args.id - The unique identifier of the match.
   * @param {Object} args.game_state - The properties of the game state.
   * @param {Object[]} args.players - The details of the players.
   * @param {Object} [args.last_action=null] - The last action made.
   * @param {string} [args.notification=null] - Notifications for the user.
   */
  constructor(args) {
    /** @member {number} */
    this.id = args.id;

    /** @member {GameState} */
    this.gameState = new GameState(args.game_state);
    
    /** @member {Player[]} */
    this.players = buildPlayers(args.players);

    /** @member {Object} */
    this.lastAction = buildLastAction(args.last_action);

    /** @member {string} */
    this.notification = buildNotification(this, args.notification);
  }

  /**
   * The match serialized as a series of objects.
   * @return {Object}
   */
  get asJson() {
    return asJson(this);
  }

  /**
   * The winner of the match.
   * Returns null if no winner.
   * @return {(number|null)}
   */
  get winner() {
    return winner(this);
  }

  /**
   * Touch a point action.
   * @param {number} pointId - The id of the point being touched.
   * @param {number} playerNumber - The number of the player performing the action. 
   * @return {boolean}
   */
  touchPoint(pointId, playerNumber) {
    this._clearLastAction();

    let move = new Move({
      proposedPointId: pointId,
      playerNumber: playerNumber,
      match: this
    });

    let result = move.result;

    switch (result.name) {
      case 'MoveValid':
        this.gameState.move(playerNumber, pointId);
        this._addMoveToLastAction(pointId);
        this._notify(buildNotification(this));
        return true;
      default:
        this._notify(result.message);
        return false;
    }
  }

  /**
   * Touch the pass button action.
   * @param {number} playerNumber - The number of the player performing the action. 
   * @return {boolean}
   */
  touchPass(playerNumber) {
    this._clearLastAction();

    let pass = new Pass({
      playerNumber: playerNumber,
      match: this
    });

    let result = pass.result;

    switch (result.name) {
      case 'PassValid':
        this.gameState.pass(playerNumber);
        this._addPassToLastAction();
        this._notify(buildNotification(this));
        return true;
      default:
        this._notify(result.message);
        return false;
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
