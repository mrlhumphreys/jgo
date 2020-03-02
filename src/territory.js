/** An unoccupied area surrounded by a player's stones */
class Territory {
  /** 
   * Create a Territory.
   * @param {Object} args - The properties of a territory.
   * @param {Point[]} args.points - The points in the territory.
   */
  constructor(args) {
    /** @member {Point[]} */
    this.points = args.points;
  }

  /**
   * Does this territory include the point?
   * @param {Point} point - The point.
   * @return {boolean}
   */
  includes(point) {
    return this.points.filter(function(p) {
      return p.id === point.id;
    }).length > 0;
  }

  /**
   * How many points in the territory?
   * @return {number}
   */
  get length() {
    return this.points.length;
  }
}

export default Territory;
