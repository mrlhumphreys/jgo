import { exists } from './utils'
import Stone from './stone'

/** A point on the board that a stone is placed on. */
class Point {
  /** 
   * Create a Point 
   * @param {Object} args - The properties of the point.
   * @param {number} args.id - The unique identifier of the point.
   * @param {number} args.x - The x co-ordinate of the point.
   * @param {number} args.y - The y co-ordinate of the point.
   * @param {Object} [args.stone=null] - The properties of the stone.
   * @param {number} [args.territory_id=null] - The territory the point belongs to.
   */
  constructor(args) {
    /** @member {number} */
    this.id = args.id;
    
    /** @member {number} */
    this.x = args.x;

    /** @member {number} */
    this.y = args.y;

    let stoneConstructor = exists(args.stone) ? args.stone.constructor : null;
    switch (stoneConstructor) {
      case Stone:
        this.stone = args.stone;
        break;
      case Object: 
        /** @member {(Stone|null)} */
        this.stone = new Stone(args.stone);
        break;
      default:
        this.stone = null;
    }

    /** @member {(number|null)} */
    this.territoryId = exists(args.territory_id) ? args.territory_id : null;
  }

  /**
   * The point serialized as an object.
   * @return {Object}
   */
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

  /**
   * Is the point occupied?
   * @return {boolean}
   */
  get occupied() {
    return exists(this.stone);
  }

  /**
   * Is the point not occupied?
   * @return {boolean}
   */
  get unoccupied() {
    return !exists(this.stone);
  }

  /**
   * Is the point occupied by the player?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  occupiedBy(playerNumber) {
    return (exists(this.stone) && this.stone.playerNumber === playerNumber);
  }

  /**
   * Is the point occupied by the opponent?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  occupiedByOpponent(playerNumber) {
    return (exists(this.stone) && this.stone.playerNumber !== playerNumber);
  }

  /**
   * Is the point unmarked? 
   * (i.e. It does not belong to a territory.)
   * @return {boolean}
   */
  get unmarked() {
    return !exists(this.territoryId);
  }

  /**
   * Place a stone on the point.
   * @param {Stone} stone - The stone being placed.
   * @return {boolean}
   */
  place(stone) {
    this.stone = stone;
    return true;
  }

  /**
   * Remove a stone from the point.
   * @return {boolean}
   */
  captureStone() {
    this.stone = null;
    return true;
  }

  /**
   * Add the point to the territory.
   * @param {number} territoryId - The id of the territory.
   * @return {boolean}
   */
  addToTerritory(territoryId) {
    this.territoryId = territoryId;
    return true;
  }

  /**
   * Remove the point from the territory.
   * @return {boolean}
   */
  clearTerritory() {
    this.territoryId = null;
    return true;
  }
}

export default Point;
