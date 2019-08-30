import { exists } from './utils'

class Stone {
  constructor(args) {
    this.id = args.id;
    this.playerNumber = args.player_number;
    this.chainId = exists(args.chain_id) ? args.chain_id : null;
  }

  get asJson() {
    return {
      id: this.id,
      player_number: this.playerNumber,
      chain_id: this.chainId
    };
  }

  joinChain(other) {
    this.chainId = other.chainId;
  }
}

export default Stone;
