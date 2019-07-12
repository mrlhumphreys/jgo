import exists from './exists'
import Point from './point'

class PointSet {
  constructor(args) {
    this.points = args.points.map(function(p) {
      return (p.constructor === Point ? p : new Point(p));
    });
  }

  get asJson() {
    return this.points.map(function(p) {
      return p.asJson;
    });
  }
}

export default PointSet;
