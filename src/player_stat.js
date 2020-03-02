/** The player's statistics */
class PlayerStat {
  /**
   * Create a PlayerStat
   * @param {Object} args - The properties of the PlayerStat.
   * @param {number} args.player_number - The number of the player.
   * @param {number} args.prisoner_count - The number of stones captured by the player.
   * @param {boolean} args.passed - Has the player passed their turn? 
   */
  constructor(args) {
    /** @member {number} */
    this.playerNumber = args.player_number;

    /** @member {number} */
    this.prisonerCount = args.prisoner_count;

    /** @member {boolean} */
    this.passed = args.passed;
  }

  /**
   * The player stat serialized as an object.
   * @return {Object}
   */
  get asJson() {
    return {
      player_number: this.playerNumber,
      prisoner_count: this.prisonerCount,
      passed: this.passed
    };
  }

  /**
   * Mark the player as passed.
   * @return {boolean}
   */
  markAsPassed() {
    this.passed = true;
    return true;
  }

  /** 
   * Mark the player as continuing.
   * @return {boolean}
   */
  markAsContinuing() {
    this.passed = false;
    return true;
  }

  /**
   * Add to the player's prisoner count.
   * Returns the total count.
   * @param {number} number - The number of stones captured.
   * @return {number}
   */
  addToPrisonerCount(number) {
    this.prisonerCount += number;
    return this.prisonerCount;
  }
}

export default PlayerStat;
