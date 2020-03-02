import { exists } from './utils'

/** A group of adjacent points */
class Chain {
  /**
   * Create a chain.
   * @param {Object} args - The properties of a chain.
   * @param {Object[]} args.points - An array of point properties.
   */
  constructor(args) {
    /** @member {Point[]} */
    this.points = args.points;     
  }

  /**
   * Does the chain include the point?
   * @param {Point} point - The point.
   * @return {boolean}
   */
  includes(point) {
    return this.points.filter(function(p) {
      return p.id === point.id;
    }).length > 0;
  }

  /**
   * The owner of the chain.
   * @return {(number|null)}
   */
  get playerNumber() {
    let point = this.points[0]; 
    if (exists(point)) {
      return point.stone.playerNumber;
    } else {
      return null; 
    }
  }
}

export default Chain;
