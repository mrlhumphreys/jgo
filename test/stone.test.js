import Stone from '../src/stone'

describe('Stone', () => {
  describe('initialize', () => {
    it('must set attributes', () => {
      let stone = new Stone({id: 1, player_number: 2, chain_id: 3});
      expect(stone.id).toEqual(1);
      expect(stone.playerNumber).toEqual(2);
      expect(stone.chainId).toEqual(3);
    });
  });

  describe('asJson', () => {
    it('must return serialized', () => {
      let stone = new Stone({id: 1, player_number: 2, chain_id: 3});
      let result = stone.asJson;
      let expected = {
        id: 1,
        player_number: 2,
        chain_id: 3
      };
      expect(result).toEqual(expected);
    });
  });

  describe('joinChain', () => {
    it('must set the chainId to the passed in stone chainId', () => {
      let stone = new Stone({id: 1, player_number: 1, chain_id: 1});
      let otherStone = new Stone({id: 2, player_number: 1, chain_id: 2});
      stone.joinChain(otherStone);
      expect(stone.chainId).toEqual(otherStone.chainId);
    });
  });
});
