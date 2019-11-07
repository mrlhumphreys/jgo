import Move from '../src/move'
import fixtures from './fixtures'

describe('Move', () => {
  describe('when there is a winner', () => {
    it('returns a game over result', () => {
      let match = fixtures('matchComplete');
      let move = new Move({
        proposedPointId: 1,
        playerNumber: 1,
        match: match
      });

      let result = move.result;

      expect(result.name).toEqual('GameOver');
      expect(result.message).toEqual('Game is over.');
    });
  });

  describe('not the players turn', () => {
    it('returns a not players turn result', () => {
      let match = fixtures('match');
      let move = new Move({
        proposedPointId: 1,
        playerNumber: 2,
        match: match
      });

      let result = move.result;

      expect(result.name).toEqual('NotPlayersTurn');
      expect(result.message).toEqual('It is not your turn.');
    });
  });

  describe('with unknown point', () => {
    it('returns an point not found error', () => {
      let match = fixtures('match');
      let move = new Move({
        proposedPointId: 999,
        playerNumber: 1,
        match: match
      });

      let result = move.result;

      expect(result.name).toEqual('PointNotFound');
      expect(result.message).toEqual('Point does not exist.');
    });
  });

  describe('point is occupied', () => {
    it('returns a point occupied result', () => {
      let match = fixtures('match');
      let move = new Move({
        proposedPointId: 8,
        playerNumber: 1,
        match: match
      });

      let result = move.result;

      expect(result.name).toEqual('PointOccupied');
      expect(result.message).toEqual('Point is already occupied.');
    });
  });

  describe('when point is surrounded by opponent', () => {
    it('returns a no liberties result', () => {
      let match = fixtures('surroundedByOpponentMatch');
      let move = new Move({
        proposedPointId: 12,
        playerNumber: 2,
        match: match
      });

      let result = move.result;

      expect(result.name).toEqual('NoLiberties');
      expect(result.message).toEqual('Point has no liberties.');
    });
  });

  describe('when point is surrounded and placing a stone deprives the chains liberties', () => {
    it('returns a no liberties result', () => {
      let match = fixtures('deprivesLibertyMatch');
      let move = new Move({
        proposedPointId: 12,
        playerNumber: 2,
        match: match
      });

      let result = move.result;

      expect(result.name).toEqual('NoLiberties');
      expect(result.message).toEqual('Point has no liberties.');
    });
  });

  describe('when point is surrounded and placing a stone does not deprive the chains liberties', () => {
    it('returns move valid result', () => {
      let match = fixtures('surroundedWithLibertyMatch');
      let move = new Move({
        proposedPointId: 12,
        playerNumber: 2,
        match: match
      });

      let result = move.result;

      expect(result.name).toEqual('MoveValid');
      expect(result.message).toEqual('');
    });
  });

  describe('when a point is surrounded and placing a stone deprives an opposing chains liberties', () => {
    it('returns a move valid result', () => {
      let match = fixtures('surroundedDeprivesLibertyMatch');
      let move = new Move({
        proposedPointId: 12,
        playerNumber: 1,
        match: match
      });

      let result = move.result;

      expect(result.name).toEqual('MoveValid');
      expect(result.message).toEqual('');
    });
  });

  describe('if a move causes a repeated board state', () => {
    it('returns a ko rule violation result', () => {
      let match = fixtures('withPreviousPositionMatch');
      let move = new Move({
        proposedPointId: 12,
        playerNumber: 2,
        match: match
      });

      let result = move.result;

      expect(result.name).toEqual('KoRuleViolation');
      expect(result.message).toEqual('Move would return board to previous state.');
    });
  });

  describe('a valid move', () => {
    it('returns a move valid result', () => {
      let match = fixtures('match');
      let move = new Move({
        proposedPointId: 1,
        playerNumber: 1,
        match: match
      });

      let result = move.result;

      expect(result.name).toEqual('MoveValid');
      expect(result.message).toEqual('');
    });
  });
});
