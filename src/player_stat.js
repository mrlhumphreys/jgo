class PlayerStat {
  constructor(args) {
    this.playerNumber = args.player_number;
    this.prisonerCount = args.prisoner_count;
    this.passed = args.passed;
  }

  get asJson() {
    return {
      player_number: this.playerNumber,
      prisoner_count: this.prisonerCount,
      passed: this.passed
    };
  }

  markAsPassed() {
    this.passed = true;
  }

  markAsContinuing() {
    this.passed = false;
  }

  addToPrisonerCount(number) {
    this.prisonerCount += number;
  }
}

export default PlayerStat;
