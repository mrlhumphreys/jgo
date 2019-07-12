import exists from './exists'
import PointSet from './point_set'

class GameState {
  constructor(args) {
    this.currentPlayerNumber = args.current_player_number;
    this.points = new PointSet({points: args.points});
    this.prisonerCounts = args.prisoner_counts;
    this.previousState = exists(args.previous_state) ? args.previous_state : null;
  }

  get asJson() {
    return {
      current_player_number: this.currentPlayerNumber,
      points: this.points.asJson,
      prisoner_counts: this.prisonerCounts,
      previous_state: this.previousState
    };
  }
}

export default GameState;
