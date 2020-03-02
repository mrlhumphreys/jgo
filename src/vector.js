/** A Vector represented by two points. */
class Vector {
  /** 
   * Create a Vector.
   * @param {Point} origin - The origin point.
   * @param {Point} destination - The destination point.
   */
  constructor(origin, destination) {
    /** @member {Point} */
    this.origin = origin;

    /** @member {Point} */
    this.destination = destination;
  }

  /**
   * The magnitude of the vector.
   * @return {(number|null)}
   */
  get magnitude() {
    if (this.dx === 0) {
      return Math.abs(this.dy);
    } else if (this.dy === 0) {
      return Math.abs(this.dx);
    } else {
      return null;
    }
  }

  /**
   * Is the vector orthogonal?
   * @return {boolean}
   */
  get orthogonal() {
    return (this.dx === 0 || this.dy === 0);
  }

  /**
   * The x distance.
   * @return {number}
   */
  get dx() {
    return this.destination.x - this.origin.x;
  }

  /**
   * The y distance.
   * @return {number}
   */
  get dy() {
    return this.destination.y - this.origin.y;
  }
}

export default Vector;
