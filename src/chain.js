import { exists } from './utils'

class Chain {
  constructor(args) {
    this.points = args.points;     
  }

  includes(point) {
    return this.points.filter(function(p) {
      return p.id === point.id;
    }).length > 0;
  }

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
