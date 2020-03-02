import { exists } from './utils'

/** A stone that can be placed on the board */
class Stone {
  /** 
   * Create a Stone.
   * @param {Object} args - The properties of the stone.
   * @param {number} args.id - The unique identifier of the stone.
   * @param {number} args.player_number - The number of the player who owns the stone.
   * @param {number} [args.chain_id=null] - The chain id of the chain the stone belongs to.
   */
  constructor(args) {
    /** @member {number} */
    this.id = args.id;

    /** @member {number} */
    this.playerNumber = args.player_number;

    /** @member {number} */
    this.chainId = exists(args.chain_id) ? args.chain_id : null;
  }

  /**
   * The Stone serialized as a simple object.
   * @return {Object}
   */
  get asJson() {
    return {
      id: this.id,
      player_number: this.playerNumber,
      chain_id: this.chainId
    };
  }

  /**
   * Make the stone join another stone's chain.
   * @param {Stone} other - The other stone.
   * @return {boolean}
   */
  joinChain(other) {
    this.chainId = other.chainId;
    return true;
  }
}

export default Stone;
