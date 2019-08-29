import PlayerStat from '../src/player_stat'

describe('PlayerStat', () => {
  describe('initialize', () => {
    it('must set attributes', () => {
      let playerStat = new PlayerStat({player_number: 1, prisoner_count: 0, passed: false });
      expect(playerStat.playerNumber).toEqual(1);
      expect(playerStat.prisonerCount).toEqual(0);
      expect(playerStat.passed).toBe(false);
    });
  });

  describe('asJson', () => {
    it('must return the attributes as a simple object', () => {
      let playerStat = new PlayerStat({player_number: 1, prisoner_count: 0, passed: false });
      let result = playerStat.asJson;
      let expected = {
        player_number: 1,
        prisoner_count: 0,
        passed: false
      };
      expect(result).toEqual(expected);
    });
  });

  describe('markAsPassed', () => {
    it('must set passed to true', () => {
      let playerStat = new PlayerStat({player_number: 1, prisoner_count: 0, passed: false });
      playerStat.markAsPassed();
      expect(playerStat.passed).toBe(true);

    });
  });

  describe('markAsContinuing', () => {
    it('must set passed to false', () => {
      let playerStat = new PlayerStat({player_number: 1, prisoner_count: 0, passed: true });
      playerStat.markAsContinuing();
      expect(playerStat.passed).toBe(false);
    });
  });

  describe('addToPrisonerCount', () => {
    it('must add that much to prisoner count', () => {
      let playerStat = new PlayerStat({player_number: 1, prisoner_count: 1, passed: false });
      playerStat.addToPrisonerCount(2);
      expect(playerStat.prisonerCount).toEqual(3);
    });
  });
});
