class Territory {
  constructor(args) {
    this.points = args.points;
  }

  includes(point) {
    return this.points.filter(function(p) {
      return p.id === point.id;
    }).length > 0;
  }

  get length() {
    return this.points.length;
  }
}

export default Territory;
