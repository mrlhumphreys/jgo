import { exists } from './utils'

class Pass {
  constructor(args) {
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

    return { name: 'PassValid', message: '' };
  }
}

export default Pass
