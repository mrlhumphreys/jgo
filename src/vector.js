class Vector {
  constructor(origin, destination) {
    this.origin = origin;
    this.destination = destination;
  }

  get magnitude() {
    if (this.dx === 0) {
      return Math.abs(this.dy);
    } else if (this.dy === 0) {
      return Math.abs(this.dx);
    } else {
      return null;
    }
  }

  get orthogonal() {
    return (this.dx === 0 || this.dy === 0);
  }

  get dx() {
    return this.destination.x - this.origin.x;
  }

  get dy() {
    return this.destination.y - this.origin.y;
  }
}

export default Vector;
