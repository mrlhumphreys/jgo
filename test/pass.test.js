import Pass from '../src/pass'
import fixtures from './fixtures'

describe('Pass', () => {
  describe('when there is a winner', () => {
    it('returns a game over result', () => {
      let match = fixtures('matchComplete');
      let pass = new Pass({
        playerNumber: 1,
        match: match
      });

      let result = pass.result;

      expect(result.name).toEqual('GameOver');
      expect(result.message).toEqual('Game is over.');
    });
  });

  describe('not the players turn', () => {
    it('returns a not players turn result', () => {
      let match = fixtures('match');
      let pass = new Pass({
        playerNumber: 2,
        match: match
      });

      let result = pass.result;

      expect(result.name).toEqual('NotPlayersTurn');
      expect(result.message).toEqual('It is not your turn.');
    });
  });

  describe('a valid pass', () => {
    it('returns a pass valid result', () => {
      let match = fixtures('match');
      let pass = new Pass({
        playerNumber: 1,
        match: match
      });

      let result = pass.result;

      expect(result.name).toEqual('PassValid');
      expect(result.message).toEqual('');
    });
  });
});
