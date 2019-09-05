import { exists } from './utils'
import Stone from './stone'

class Point {
  constructor(args) {
    this.id = args.id;
    this.x = args.x;
    this.y = args.y;
    let stoneConstructor = exists(args.stone) ? args.stone.constructor : null;
    switch (stoneConstructor) {
      case Stone:
        this.stone = args.stone;
        break;
      case Object: 
        this.stone = new Stone(args.stone);
        break;
      default:
        this.stone = null;
    }
    this.territoryId = exists(args.territory_id) ? args.territory_id : null;
  }

  get asJson() {
    let stoneConstructor = exists(this.stone) ? this.stone.constructor : null;
    let _stone = stoneConstructor === Stone ? this.stone.asJson : null; 
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      territory_id: this.territoryId,
      stone: _stone 
    };
  }

  get occupied() {
    return exists(this.stone);
  }

  get unoccupied() {
    return !exists(this.stone);
  }

  occupiedBy(playerNumber) {
    return (exists(this.stone) && this.stone.playerNumber === playerNumber);
  }

  occupiedByOpponent(playerNumber) {
    return (exists(this.stone) && this.stone.playerNumber !== playerNumber);
  }

  get unmarked() {
    return !exists(this.territoryId);
  }

  place(stone) {
    this.stone = stone;
  }

  captureStone() {
    this.stone = null;
  }

  addToTerritory(territoryId) {
    this.territoryId = territoryId;
  }

  clearTerritory() {
    this.territoryId = null;
  }
}

export default Point;
