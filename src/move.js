import { exists } from './utils'

/** A move action */
class Move {
  /** 
   * Create a Move
   * @param {Object} args - The properties of the move.
   * @param {number} args.proposedPointId - The id of the point involved this action.
   * @param {number} args.playerNumber - The number of the player performing this action.
   * @param {Match} args.match - The match.
   */
  constructor(args) {
    /** @member {number} */
    this.proposedPointId = args.proposedPointId;

    /** @member {number} */
    this.playerNumber = args.playerNumber;

    /** @member {Match} */
    this.match = args.match;
  }

  /**
   * The result of performing this move.
   * Returns an object with name and message.
   * @return {Object}
   */
  get result() {
    if (exists(this.match.winner)) {
      return { name: 'GameOver', message: 'Game is over.' };
    }

    if (this.match.gameState.currentPlayerNumber !== this.playerNumber) {
      return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
    }

    if (!exists(this._proposedPoint)) {
      return { name: 'PointNotFound', message: 'Point does not exist.' };
    }

    if (this._proposedPoint.occupied) {
      return { name: 'PointOccupied', message: 'Point is already occupied.' };
    }

    if (this._noLiberties && this._deprivesLiberties && !this._deprivesOpponentsLiberties) {
      return { name: 'NoLiberties', message: 'Point has no liberties.' };
    }

    if (this._koRuleViolation) {
      return { name: 'KoRuleViolation', message: 'Move would return board to previous state.' };
    }
    
    return { name: 'MoveValid', message: '' }; 
  }

  get _proposedPoint() {
    return this.match.gameState.points.findById(this.proposedPointId); 
  }

  get _noLiberties() {
    return this.match.gameState.points.libertiesFor(this._proposedPoint) === 0;
  }

  get _deprivesLiberties() {
    return this.match.gameState.points.deprivesLiberties(this._proposedPoint, this.playerNumber);
  }

  get _deprivesOpponentsLiberties() {
    return this.match.gameState.points.deprivesOpponentsLiberties(this._proposedPoint, this.playerNumber);
  }

  get _koRuleViolation() {
    let dupped = this.match.gameState.points.dup;
    dupped.performMove(this._proposedPoint, this.playerNumber);
    return dupped.minify === this.match.gameState.previousState;
  }
}

export default Move;
