import { exists } from './utils'

/** A pass action */
class Pass {
  /** 
   * Create a pass action.
   * @param {Object} args - The properties of the pass.
   * @param {number} args.playerNumber - The number of the player passing.
   * @param {Match} args.match - The match.
   */
  constructor(args) {
    /** @member {number} */
    this.playerNumber = args.playerNumber;

    /** @member {Match} */
    this.match = args.match;
  }

  /**
   * The result of passing.
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

    return { name: 'PassValid', message: '' };
  }
}

export default Pass
