import { exists } from './utils'

class Move {
  constructor(args) {
    this.proposedPointId = args.proposedPointId;
    this.playerNumber = args.playerNumber;
    this.match = args.match;
  }

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
