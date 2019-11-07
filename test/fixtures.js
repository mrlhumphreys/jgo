import { exists } from '../src/utils'
import Match from '../src/match'
import GameState from '../src/game_state'
import PointSet from '../src/point_set'
import Point from '../src/point'

const fixtureDefinitions = {
  match: {
    klass: Match,
    args: {
      id: 1,
      game_state: {
        current_player_number: 1,
        points: [
          { id: 0, x: 0, y: 0, stone: null },
          { id: 1, x: 1, y: 0, stone: null },
          { id: 2, x: 2, y: 0, stone: null },
          { id: 3, x: 0, y: 1, stone: null },
          { id: 4, x: 1, y: 1, stone: null },
          { id: 5, x: 2, y: 1, stone: null },
          { id: 6, x: 0, y: 2, stone: null },
          { id: 7, x: 1, y: 2, stone: { id: 2, player_number: 2, chain_id: 2 } },
          { id: 8, x: 1, y: 3, stone: { id: 1, player_number: 1, chain_id: 1 } }
        ],
        player_stats: [
          { player_number: 1, passed: false, prisoner_count: 0 },
          { player_number: 2, passed: false, prisoner_count: 1 },
        ],
        previous_state: null
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      lastAction: null,
      notification: null
    }
  },
  surroundedByOpponentMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: {
        current_player_number: 2,
        points: [
          { id: 0, x: 0, y: 0, stone: null },
          { id: 1, x: 1, y: 0, stone: null },
          { id: 2, x: 2, y: 0, stone: null },
          { id: 3, x: 3, y: 0, stone: null },
          { id: 4, x: 4, y: 0, stone: null },

          { id: 5, x: 0, y: 1, stone: null },
          { id: 6, x: 1, y: 1, stone: { id: 1, player_number: 1, chain_id: 1 } },
          { id: 7, x: 2, y: 1, stone: { id: 2, player_number: 1, chain_id: 1 } },
          { id: 8, x: 3, y: 1, stone: { id: 3, player_number: 1, chain_id: 1 } },
          { id: 9, x: 4, y: 1, stone: null },

          { id: 10, x: 0, y: 2, stone: null },
          { id: 11, x: 1, y: 2, stone: { id: 4, player_number: 1, chain_id: 1 } },
          { id: 12, x: 2, y: 2, stone: null },
          { id: 13, x: 3, y: 2, stone: { id: 5, player_number: 1, chain_id: 1 } },
          { id: 14, x: 4, y: 2, stone: null },
  
          { id: 15, x: 0, y: 3, stone: null },
          { id: 16, x: 1, y: 3, stone: { id: 6, player_number: 1, chain_id: 1 } },
          { id: 17, x: 2, y: 3, stone: { id: 7, player_number: 1, chain_id: 1 } },
          { id: 18, x: 3, y: 3, stone: { id: 8, player_number: 1, chain_id: 1 } },
          { id: 19, x: 4, y: 3, stone: null },

          { id: 20, x: 0, y: 4, stone: null },
          { id: 21, x: 1, y: 4, stone: null },
          { id: 22, x: 2, y: 4, stone: null },
          { id: 23, x: 3, y: 4, stone: null },
          { id: 24, x: 4, y: 4, stone: null }
        ],
        player_stats: [
          { player_number: 1, passed: false, prisoner_count: 0 },
          { player_number: 2, passed: false, prisoner_count: 0 }
        ]
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      lastAction: null,
      notification: null
    }
  },
  deprivesLibertyMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: {
        current_player_number: 2,
        points: [
          { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
          { id: 1, x: 1, y: 0, stone: { id: 2, player_number: 1, chain_id: 1 } },
          { id: 2, x: 2, y: 0, stone: { id: 3, player_number: 1, chain_id: 1 } },
          { id: 3, x: 3, y: 0, stone: { id: 4, player_number: 1, chain_id: 1 } },
          { id: 4, x: 4, y: 0, stone: { id: 5, player_number: 1, chain_id: 1 } },

          { id: 5, x: 0, y: 1, stone: { id: 6, player_number: 1, chain_id: 1 } },
          { id: 6, x: 1, y: 1, stone: { id: 7, player_number: 2, chain_id: 2 } },
          { id: 7, x: 2, y: 1, stone: { id: 8, player_number: 2, chain_id: 2 } },
          { id: 8, x: 3, y: 1, stone: { id: 9, player_number: 2, chain_id: 2 } },
          { id: 9, x: 4, y: 1, stone: { id: 10, player_number: 1, chain_id: 1 } },

          { id: 10, x: 0, y: 2, stone: { id: 11, player_number: 1, chain_id: 1 } },
          { id: 11, x: 1, y: 2, stone: { id: 12, player_number: 2, chain_id: 2 } },
          { id: 12, x: 2, y: 2, stone: null },
          { id: 13, x: 3, y: 2, stone: { id: 13, player_number: 2, chain_id: 2 } },
          { id: 14, x: 4, y: 2, stone: { id: 14, player_number: 1, chain_id: 1 } },

          { id: 15, x: 0, y: 3, stone: { id: 15, player_number: 1, chain_id: 1 } },
          { id: 16, x: 1, y: 3, stone: { id: 16, player_number: 2, chain_id: 2 } },
          { id: 17, x: 2, y: 3, stone: { id: 17, player_number: 2, chain_id: 2 } },
          { id: 18, x: 3, y: 3, stone: { id: 18, player_number: 2, chain_id: 2 } },
          { id: 19, x: 4, y: 3, stone: { id: 19, player_number: 1, chain_id: 1 } },

          { id: 20, x: 0, y: 4, stone: { id: 20, player_number: 1, chain_id: 1 } },
          { id: 21, x: 1, y: 4, stone: { id: 21, player_number: 1, chain_id: 1 } },
          { id: 22, x: 2, y: 4, stone: { id: 22, player_number: 1, chain_id: 1 } },
          { id: 23, x: 3, y: 4, stone: { id: 23, player_number: 2, chain_id: 1 } },
          { id: 24, x: 4, y: 4, stone: { id: 24, player_number: 1, chain_id: 1 } }
        ],
        player_stats: [
          { player_number: 1, passed: false, prisoner_count: 0 },
          { player_number: 2, passed: false, prisoner_count: 0 }
        ]
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      lastAction: null,
      notification: null
    }
  },
  surroundedWithLibertyMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: {
        current_player_number: 2,
        points: [
          { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
          { id: 1, x: 1, y: 0, stone: null },
          { id: 2, x: 2, y: 0, stone: null },
          { id: 3, x: 3, y: 0, stone: null },
          { id: 4, x: 4, y: 0, stone: { id: 5, player_number: 1, chain_id: 1 } },

          { id: 5, x: 0, y: 1, stone: { id: 6, player_number: 1, chain_id: 1 } },
          { id: 6, x: 1, y: 1, stone: { id: 7, player_number: 2, chain_id: 2 } },
          { id: 7, x: 2, y: 1, stone: { id: 8, player_number: 2, chain_id: 2 } },
          { id: 8, x: 3, y: 1, stone: { id: 9, player_number: 2, chain_id: 2 } },
          { id: 9, x: 4, y: 1, stone: { id: 10, player_number: 1, chain_id: 1 } },

          { id: 10, x: 0, y: 2, stone: { id: 11, player_number: 1, chain_id: 1 } },
          { id: 11, x: 1, y: 2, stone: { id: 12, player_number: 2, chain_id: 2 } },
          { id: 12, x: 2, y: 2, stone: null },
          { id: 13, x: 3, y: 2, stone: { id: 13, player_number: 2, chain_id: 2 } },
          { id: 14, x: 4, y: 2, stone: { id: 14, player_number: 1, chain_id: 1 } },

          { id: 15, x: 0, y: 3, stone: { id: 15, player_number: 1, chain_id: 1 } },
          { id: 16, x: 1, y: 3, stone: { id: 16, player_number: 2, chain_id: 2 } },
          { id: 17, x: 2, y: 3, stone: { id: 17, player_number: 2, chain_id: 2 } },
          { id: 18, x: 3, y: 3, stone: { id: 18, player_number: 2, chain_id: 2 } },
          { id: 19, x: 4, y: 3, stone: { id: 19, player_number: 1, chain_id: 1 } },

          { id: 20, x: 0, y: 4, stone: { id: 20, player_number: 1, chain_id: 1 } },
          { id: 21, x: 1, y: 4, stone: { id: 21, player_number: 1, chain_id: 1 } },
          { id: 22, x: 2, y: 4, stone: { id: 22, player_number: 1, chain_id: 1 } },
          { id: 23, x: 3, y: 4, stone: { id: 23, player_number: 1, chain_id: 1 } },
          { id: 24, x: 4, y: 4, stone: { id: 24, player_number: 1, chain_id: 1 } }
        ],
        player_stats: [
          { player_number: 1, prisoner_count: 0, passed: false },
          { player_number: 2, prisoner_count: 0, passed: false }
        ]
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      lastAction: null,
      notification: null
    }
  },
  surroundedDeprivesLibertyMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: {
        current_player_number: 1,
        points: [
          { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
          { id: 1, x: 1, y: 0, stone: { id: 2, player_number: 1, chain_id: 1 } },
          { id: 2, x: 2, y: 0, stone: { id: 3, player_number: 1, chain_id: 1 } },
          { id: 3, x: 3, y: 0, stone: { id: 4, player_number: 1, chain_id: 1 } },
          { id: 4, x: 4, y: 0, stone: { id: 5, player_number: 1, chain_id: 1 } },

          { id: 5, x: 0, y: 1, stone: { id: 6, player_number: 1, chain_id: 1 } },
          { id: 6, x: 1, y: 1, stone: { id: 7, player_number: 2, chain_id: 2 } },
          { id: 7, x: 2, y: 1, stone: { id: 8, player_number: 2, chain_id: 2 } },
          { id: 8, x: 3, y: 1, stone: { id: 9, player_number: 2, chain_id: 2 } },
          { id: 9, x: 4, y: 1, stone: { id: 10, player_number: 1, chain_id: 1 } },

          { id: 10, x: 0, y: 2, stone: { id: 11, player_number: 1, chain_id: 1 } },
          { id: 11, x: 1, y: 2, stone: { id: 12, player_number: 2, chain_id: 2 } },
          { id: 12, x: 2, y: 2, stone: null },
          { id: 13, x: 3, y: 2, stone: { id: 13, player_number: 2, chain_id: 2 } },
          { id: 14, x: 4, y: 2, stone: { id: 14, player_number: 1, chain_id: 1 } },

          { id: 15, x: 0, y: 3, stone: { id: 15, player_number: 1, chain_id: 1 } },
          { id: 16, x: 1, y: 3, stone: { id: 16, player_number: 2, chain_id: 2 } },
          { id: 17, x: 2, y: 3, stone: { id: 17, player_number: 2, chain_id: 2 } },
          { id: 18, x: 3, y: 3, stone: { id: 18, player_number: 2, chain_id: 2 } },
          { id: 19, x: 4, y: 3, stone: { id: 19, player_number: 1, chain_id: 1 } },

          { id: 20, x: 0, y: 4, stone: { id: 20, player_number: 1, chain_id: 1 } },
          { id: 21, x: 1, y: 4, stone: { id: 21, player_number: 1, chain_id: 1 } },
          { id: 22, x: 2, y: 4, stone: { id: 22, player_number: 1, chain_id: 1 } },
          { id: 23, x: 3, y: 4, stone: { id: 23, player_number: 1, chain_id: 1 } },
          { id: 24, x: 4, y: 4, stone: { id: 24, player_number: 1, chain_id: 1 } }
        ],
        player_stats: [ 
          { player_number: 1, prisoner_count: 0, passed: false },
          { player_number: 2, prisoner_count: 1, passed: false }
        ] 
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      lastAction: null,
      notification: null
    }
  },
  withPreviousPositionMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: {
        current_player_number: 2,
        points: [
          { id: 0, x: 0, y: 0, stone: null },
          { id: 1, x: 1, y: 0, stone: null },
          { id: 2, x: 2, y: 0, stone: null },
          { id: 3, x: 3, y: 0, stone: null },
          { id: 4, x: 4, y: 0, stone: null },

          { id: 5, x: 0, y: 1, stone: null },
          { id: 6, x: 1, y: 1, stone: null },
          { id: 7, x: 2, y: 1, stone: { id: 1, player_number: 1, chain_id: 1 } },
          { id: 8, x: 3, y: 1, stone: { id: 5, player_number: 2, chain_id: 5 } },
          { id: 9, x: 4, y: 1, stone: null },

          { id: 10, x: 0, y: 2, stone: null },
          { id: 11, x: 1, y: 2, stone: { id: 2, player_number: 1, chain_id: 2 } },
          { id: 12, x: 2, y: 2, stone: null },
          { id: 13, x: 3, y: 2, stone: { id: 3, player_number: 1, chain_id: 3 } },
          { id: 14, x: 4, y: 2, stone: { id: 6, player_number: 2, chain_id: 6 } },

          { id: 15, x: 0, y: 3, stone: null },
          { id: 16, x: 1, y: 3, stone: null },
          { id: 17, x: 2, y: 3, stone: { id: 4, player_number: 1, chain_id: 4 } },
          { id: 18, x: 3, y: 3, stone: { id: 7, player_number: 2, chain_id: 7 } },
          { id: 19, x: 4, y: 3, stone: null },

          { id: 20, x: 0, y: 4, stone: null },
          { id: 21, x: 1, y: 4, stone: null },
          { id: 22, x: 2, y: 4, stone: null },
          { id: 23, x: 3, y: 4, stone: null },
          { id: 24, x: 4, y: 4, stone: null }
        ],
        player_stats: [
          { player_number: 1, passed: false, prisoner_count: 0 },
          { player_number: 2, passed: false, prisoner_count: 0 }
        ],
        previous_state: '-------12--12-2--12------'
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      lastAction: null,
      notification: null
    }
  },
  matchComplete: {
    klass: Match,
    args: {
      id: 1,
      game_state: {
        current_player_number: 2,
        points: [
          { id: 0, x: 0, y: 0, stone: null, territory_id: 1 },
          { id: 1, x: 1, y: 0, stone: null, territory_id: 1 },
          { id: 2, x: 2, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
          { id: 3, x: 3, y: 0, stone: null, territory_id: 2 },
          { id: 4, x: 4, y: 0, stone: null, territory_id: 2 },

          { id: 5, x: 0, y: 1, stone: null, territory_id: 1 },
          { id: 6, x: 1, y: 1, stone: { id: 2, player_number: 1, chain_id: 1 } },
          { id: 7, x: 2, y: 1, stone: { id: 3, player_number: 1, chain_id: 1 } },
          { id: 8, x: 3, y: 1, stone: null, territory_id: 2 },
          { id: 9, x: 4, y: 1, stone: null, territory_id: 2 },

          { id: 10, x: 0, y: 2, stone: { id: 4, player_number: 1, chain_id: 1 } },
          { id: 11, x: 1, y: 2, stone: { id: 5, player_number: 1, chain_id: 1 } },
          { id: 12, x: 2, y: 2, stone: null, territory_id: 3 },
          { id: 13, x: 3, y: 2, stone: { id: 6, player_number: 2, chain_id: 2 } },
          { id: 14, x: 4, y: 2, stone: { id: 7, player_number: 2, chain_id: 2 } },

          { id: 15, x: 0, y: 3, stone: null, territory_id: 4 },
          { id: 16, x: 1, y: 3, stone: null, territory_id: 4 },
          { id: 17, x: 2, y: 3, stone: { id: 8, player_number: 2, chain_id: 2 } },
          { id: 18, x: 3, y: 3, stone: { id: 9, player_number: 2, chain_id: 2 } },
          { id: 19, x: 4, y: 3, stone: null, territory_id: 5 },

          { id: 20, x: 0, y: 4, stone: null, territory_id: 4 },
          { id: 21, x: 1, y: 4, stone: null, territory_id: 4 },
          { id: 22, x: 2, y: 4, stone: { id: 10, player_number: 2, chain_id: 2 } },
          { id: 23, x: 3, y: 4, stone: null, territory_id: 5 },
          { id: 24, x: 4, y: 4, stone: null, territory_id: 5 },
        ],
        previous_state: null,
        player_stats: [
          { player_number: 1, passed: true, prisoner_count: 4 },
          { player_number: 2, passed: true, prisoner_count: 2 }
        ]
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      lastAction: null,
      notification: null
    }
  },
  gameState: {
    klass: GameState,
    args: {
      current_player_number: 1,
      points: [
        { id: 0, x: 0, y: 0, stone: null },
        { id: 1, x: 1, y: 0, stone: null },
        { id: 2, x: 2, y: 0, stone: null },
        { id: 3, x: 0, y: 1, stone: null },
        { id: 4, x: 1, y: 1, stone: null },
        { id: 5, x: 2, y: 1, stone: null },
        { id: 6, x: 0, y: 2, stone: null },
        { id: 7, x: 1, y: 2, stone: { id: 2, player_number: 2, chain_id: 2 } },
        { id: 8, x: 1, y: 3, stone: { id: 1, player_number: 1, chain_id: 1 } }
      ],
      player_stats: [
        { player_number: 1, passed: false, prisoner_count: 0 },
        { player_number: 2, passed: false, prisoner_count: 0 }
      ]
    }
  },
  gameStatePassed: { 
    klass: GameState,
    args: {
      current_player_number: 1,
      points: [
        { id: 0, x: 0, y: 0, stone: null },
        { id: 1, x: 1, y: 0, stone: null },
        { id: 2, x: 2, y: 0, stone: null },
        { id: 3, x: 0, y: 1, stone: null },
        { id: 4, x: 1, y: 1, stone: null },
        { id: 5, x: 2, y: 1, stone: null },
        { id: 6, x: 0, y: 2, stone: null },
        { id: 7, x: 1, y: 2, stone: { id: 2, player_number: 2, chain_id: 2 } },
        { id: 8, x: 1, y: 3, stone: { id: 1, player_number: 1, chain_id: 1 } }
      ],
      player_stats: [
        { player_number: 1, passed: true, prisoner_count: 0 },
        { player_number: 2, passed: false, prisoner_count: 0 }
      ]
    }
  },
  gameStateUnjoinedChains: {
    klass: GameState,
    args: {
      current_player_number: 2,
      points: [
        { id: 0, x: 0, y: 0, stone: null },
        { id: 1, x: 1, y: 0, stone: null },
        { id: 2, x: 2, y: 0, stone: null },
        { id: 3, x: 3, y: 0, stone: null },
        { id: 4, x: 4, y: 0, stone: null },

        { id: 5, x: 0, y: 1, stone: null },
        { id: 6, x: 1, y: 1, stone: { id: 1, player_number: 2, chain_id: 1 } },
        { id: 7, x: 2, y: 1, stone: { id: 2, player_number: 2, chain_id: 1 } },
        { id: 8, x: 3, y: 1, stone: { id: 3, player_number: 2, chain_id: 1 } },
        { id: 9, x: 4, y: 1, stone: null },

        { id: 10, x: 0, y: 2, stone: null },
        { id: 11, x: 1, y: 2, stone: null },
        { id: 12, x: 2, y: 2, stone: null },
        { id: 13, x: 3, y: 2, stone: null },
        { id: 14, x: 4, y: 2, stone: null },

        { id: 15, x: 0, y: 3, stone: null },
        { id: 16, x: 1, y: 3, stone: { id: 4, player_number: 2, chain_id: 2 } },
        { id: 17, x: 2, y: 3, stone: { id: 5, player_number: 2, chain_id: 2 } },
        { id: 18, x: 3, y: 3, stone: { id: 6, player_number: 2, chain_id: 2 } },
        { id: 19, x: 4, y: 3, stone: null },

        { id: 20, x: 0, y: 4, stone: null },
        { id: 21, x: 1, y: 4, stone: null },
        { id: 22, x: 2, y: 4, stone: null },
        { id: 23, x: 3, y: 4, stone: null },
        { id: 24, x: 4, y: 4, stone: null }
      ],
      player_stats: [
        { player_number: 1, prisoner_count: 0, passed: false },
        { player_number: 2, prisoner_count: 0, passed: false }
      ]
    }
  },
  gameStateSurroundStone: {
    klass: GameState,
    args: {
      current_player_number: 2,
      points: [
        { id: 0, x: 0, y: 0, stone: null },
        { id: 1, x: 1, y: 0, stone: null },
        { id: 2, x: 2, y: 0, stone: null },
        { id: 3, x: 3, y: 0, stone: null },
        { id: 4, x: 4, y: 0, stone: null },

        { id: 5, x: 0, y: 1, stone: null },
        { id: 6, x: 1, y: 1, stone: { id: 1, player_number: 2, chain_id: 1 } },
        { id: 7, x: 2, y: 1, stone: { id: 2, player_number: 2, chain_id: 1 } },
        { id: 8, x: 3, y: 1, stone: { id: 3, player_number: 2, chain_id: 1 } },
        { id: 9, x: 4, y: 1, stone: null },

        { id: 10, x: 0, y: 2, stone: null },
        { id: 11, x: 1, y: 2, stone: { id: 7, player_number: 2, chain_id: 1 } },
        { id: 12, x: 2, y: 2, stone: { id: 8, player_number: 1, chain_id: 2 } },
        { id: 13, x: 3, y: 2, stone: null },
        { id: 14, x: 4, y: 2, stone: null },

        { id: 15, x: 0, y: 3, stone: null },
        { id: 16, x: 1, y: 3, stone: { id: 4, player_number: 2, chain_id: 1 } },
        { id: 17, x: 2, y: 3, stone: { id: 5, player_number: 2, chain_id: 1 } },
        { id: 18, x: 3, y: 3, stone: { id: 6, player_number: 2, chain_id: 1 } },
        { id: 19, x: 4, y: 3, stone: null },

        { id: 20, x: 0, y: 4, stone: null },
        { id: 21, x: 1, y: 4, stone: null },
        { id: 22, x: 2, y: 4, stone: null },
        { id: 23, x: 3, y: 4, stone: null },
        { id: 24, x: 4, y: 4, stone: null }
      ],
      player_stats: [
        { player_number: 1, prisoner_count: 0, passed: false },
        { player_number: 2, prisoner_count: 0, passed: false }
      ]
    }
  },
  gameStateOtherPlayerPassed: {
    klass: GameState,
    args: {
      current_player_number: 1,
      points: [
        { id: 0, x: 0, y: 0, stone: null },
        { id: 1, x: 1, y: 0, stone: null },
        { id: 2, x: 2, y: 0, stone: null },

        { id: 3, x: 0, y: 1, stone: null },
        { id: 4, x: 1, y: 1, stone: null },
        { id: 5, x: 2, y: 1, stone: null },

        { id: 6, x: 0, y: 2, stone: null },
        { id: 7, x: 1, y: 2, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 8, x: 2, y: 2, stone: { id: 5, player_number: 2, chain_id: 5 } },
      ],
      player_stats: [
        { player_number: 1, prisoner_count: 0, passed: false },
        { player_number: 2, prisoner_count: 0, passed: true }
      ],
      previous_state: null
    }
  },
  gameStateScorable: {
    klass: GameState,
    args: {
      current_player_number: 2,
      points: [
        { id: 0, x: 0, y: 0, stone: null, territory_id: 1 },
        { id: 1, x: 1, y: 0, stone: null, territory_id: 1 },
        { id: 2, x: 2, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 3, x: 3, y: 0, stone: null, territory_id: 2 },
        { id: 4, x: 4, y: 0, stone: null, territory_id: 2 },

        { id: 5, x: 0, y: 1, stone: null, territory_id: 1 },
        { id: 6, x: 1, y: 1, stone: { id: 2, player_number: 1, chain_id: 1 } },
        { id: 7, x: 2, y: 1, stone: { id: 3, player_number: 1, chain_id: 1 } },
        { id: 8, x: 3, y: 1, stone: null, territory_id: 2 },
        { id: 9, x: 4, y: 1, stone: null, territory_id: 2 },

        { id: 10, x: 0, y: 2, stone: { id: 4, player_number: 1, chain_id: 1 } },
        { id: 11, x: 1, y: 2, stone: { id: 5, player_number: 1, chain_id: 1 } },
        { id: 12, x: 2, y: 2, stone: null, territory_id: 3 },
        { id: 13, x: 3, y: 2, stone: { id: 6, player_number: 2, chain_id: 2 } },
        { id: 14, x: 4, y: 2, stone: { id: 7, player_number: 2, chain_id: 2 } },

        { id: 15, x: 0, y: 3, stone: null, territory_id: 4 },
        { id: 16, x: 1, y: 3, stone: null, territory_id: 4 },
        { id: 17, x: 2, y: 3, stone: { id: 8, player_number: 2, chain_id: 2 } },
        { id: 18, x: 3, y: 3, stone: { id: 9, player_number: 2, chain_id: 2 } },
        { id: 19, x: 4, y: 3, stone: null, territory_id: 5 },

        { id: 20, x: 0, y: 4, stone: null, territory_id: 4 },
        { id: 21, x: 1, y: 4, stone: null, territory_id: 4 },
        { id: 22, x: 2, y: 4, stone: { id: 10, player_number: 2, chain_id: 2 } },
        { id: 23, x: 3, y: 4, stone: null, territory_id: 5 },
        { id: 24, x: 4, y: 4, stone: null, territory_id: 5 },
      ],
      previous_state: null,
      player_stats: [
        { player_number: 1, passed: true, prisoner_count: 4 },
        { player_number: 2, passed: true, prisoner_count: 2 }
      ]
    }
  },
  pointSet: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 1, x: 1, y: 0, stone: null },
        { id: 2, x: 2, y: 0, stone: null },
        { id: 3, x: 0, y: 1, stone: null },
        { id: 4, x: 1, y: 1, stone: null },
        { id: 5, x: 2, y: 1, stone: null },
        { id: 6, x: 0, y: 2, stone: null },
        { id: 7, x: 1, y: 2, stone: null },
        { id: 8, x: 2, y: 2, stone: { id: 2, player_number: 2, chain_id: 2 } }
      ]
    }
  },
  pointSetWithChain: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: null },
        { id: 1, x: 1, y: 0, stone: null },
        { id: 2, x: 2, y: 0, stone: null },
        { id: 3, x: 0, y: 1, stone: null },
        { id: 4, x: 1, y: 1, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 5, x: 2, y: 1, stone: { id: 2, player_number: 1, chain_id: 1 } },
        { id: 6, x: 0, y: 2, stone: null },
        { id: 7, x: 1, y: 2, stone: { id: 3, player_number: 2, chain_id: 2 } },
        { id: 8, x: 2, y: 2, stone: { id: 4, player_number: 2, chain_id: 2 } }
      ]
    }
  },
  pointSetWithUChain: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: null },
        { id: 1, x: 1, y: 0, stone: { id: 4, player_number: 1, chain_id: 1 } },
        { id: 2, x: 2, y: 0, stone: { id: 3, player_number: 1, chain_id: 1 } },
        { id: 3, x: 0, y: 1, stone: null },
        { id: 4, x: 1, y: 1, stone: null },
        { id: 5, x: 2, y: 1, stone: { id: 2, player_number: 1, chain_id: 1 } },
        { id: 6, x: 0, y: 2, stone: null },
        { id: 7, x: 1, y: 2, stone: { id: 5, player_number: 1, chain_id: 1 } },
        { id: 8, x: 2, y: 2, stone: { id: 1, player_number: 1, chain_id: 1 } }
      ]
    }
  },
  pointSetWithTerritory: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: null, territory_id: 1 },
        { id: 1, x: 1, y: 0, stone: null, territory_id: 1 },
        { id: 2, x: 2, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 3, x: 3, y: 0, stone: null, territory_id: 2 },
        { id: 4, x: 4, y: 0, stone: null, territory_id: 2 },

        { id: 5, x: 0, y: 1, stone: null, territory_id: 1 },
        { id: 6, x: 1, y: 1, stone: { id: 2, player_number: 1, chain_id: 1 } },
        { id: 7, x: 2, y: 1, stone: { id: 3, player_number: 1, chain_id: 1 } },
        { id: 8, x: 3, y: 1, stone: null, territory_id: 2 },
        { id: 9, x: 4, y: 1, stone: null, territory_id: 2 },

        { id: 10, x: 0, y: 2, stone: { id: 4, player_number: 1, chain_id: 1 } },
        { id: 11, x: 1, y: 2, stone: { id: 5, player_number: 1, chain_id: 1 } },
        { id: 12, x: 2, y: 2, stone: null, territory_id: 3 },
        { id: 13, x: 3, y: 2, stone: { id: 6, player_number: 2, chain_id: 2 } },
        { id: 14, x: 4, y: 2, stone: { id: 7, player_number: 2, chain_id: 2 } },

        { id: 15, x: 0, y: 3, stone: null, territory_id: 4 },
        { id: 16, x: 1, y: 3, stone: null, territory_id: 4 },
        { id: 17, x: 2, y: 3, stone: { id: 8, player_number: 2, chain_id: 2 } },
        { id: 18, x: 3, y: 3, stone: { id: 9, player_number: 2, chain_id: 2 } },
        { id: 19, x: 4, y: 3, stone: null, territory_id: 5 },

        { id: 20, x: 0, y: 4, stone: null, territory_id: 4 },
        { id: 21, x: 1, y: 4, stone: null, territory_id: 4 },
        { id: 22, x: 2, y: 4, stone: { id: 10, player_number: 2, chain_id: 2 } },
        { id: 23, x: 3, y: 4, stone: null, territory_id: 5 },
        { id: 24, x: 4, y: 4, stone: null, territory_id: 5 }
      ]
    }
  },
  pointSetWithLiberties: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 1, x: 1, y: 0, stone: null },
        { id: 2, x: 2, y: 0, stone: { id: 3, player_number: 1, chain_id: 1 } },
        { id: 3, x: 0, y: 1, stone: null },
        { id: 4, x: 1, y: 1, stone: null },
        { id: 5, x: 2, y: 1, stone: { id: 5, player_number: 1, chain_id: 1 } },
        { id: 6, x: 0, y: 2, stone: { id: 6, player_number: 1, chain_id: 1 } },
        { id: 7, x: 1, y: 2, stone: { id: 7, player_number: 1, chain_id: 2 } },
        { id: 8, x: 2, y: 2, stone: { id: 8, player_number: 1, chain_id: 1 } }
      ]
    }
  },
  pointSetWithoutLiberties: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 1, x: 1, y: 0, stone: { id: 2, player_number: 1, chain_id: 1 } },
        { id: 2, x: 2, y: 0, stone: { id: 3, player_number: 1, chain_id: 1 } },
        { id: 3, x: 0, y: 1, stone: { id: 4, player_number: 1, chain_id: 1 } },
        { id: 4, x: 1, y: 1, stone: null },
        { id: 5, x: 2, y: 1, stone: { id: 5, player_number: 1, chain_id: 1 } },
        { id: 6, x: 0, y: 2, stone: { id: 6, player_number: 1, chain_id: 1 } },
        { id: 7, x: 1, y: 2, stone: { id: 7, player_number: 1, chain_id: 2 } },
        { id: 8, x: 2, y: 2, stone: { id: 8, player_number: 1, chain_id: 1 } }
      ]
    }
  },
  pointSetWithOneLiberty: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 1, x: 1, y: 0, stone: { id: 2, player_number: 1, chain_id: 1 } },
        { id: 2, x: 2, y: 0, stone: { id: 3, player_number: 1, chain_id: 1 } },
        { id: 3, x: 0, y: 1, stone: { id: 4, player_number: 1, chain_id: 1 } },
        { id: 4, x: 1, y: 1, stone: null },
        { id: 5, x: 2, y: 1, stone: { id: 5, player_number: 1, chain_id: 1 } },
        { id: 6, x: 0, y: 2, stone: { id: 6, player_number: 1, chain_id: 1 } },
        { id: 7, x: 1, y: 2, stone: { id: 7, player_number: 1, chain_id: 2 } },
        { id: 8, x: 2, y: 2, stone: { id: 8, player_number: 1, chain_id: 1 } }
      ]
    }
  },
  pointSetWithTwoLiberties: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: null },
        { id: 1, x: 1, y: 0, stone: { id: 2, player_number: 2, chain_id: 1 } },
        { id: 2, x: 2, y: 0, stone: { id: 3, player_number: 1, chain_id: 1 } },
        { id: 3, x: 0, y: 1, stone: { id: 4, player_number: 1, chain_id: 1 } },
        { id: 4, x: 1, y: 1, stone: null },
        { id: 5, x: 2, y: 1, stone: { id: 5, player_number: 1, chain_id: 1 } },
        { id: 6, x: 0, y: 2, stone: { id: 6, player_number: 1, chain_id: 1 } },
        { id: 7, x: 1, y: 2, stone: { id: 7, player_number: 1, chain_id: 2 } },
        { id: 8, x: 2, y: 2, stone: { id: 8, player_number: 1, chain_id: 1 } }

      ]
    }
  },
  pointSetDeprivesOpponentsLiberties: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 1, x: 1, y: 0, stone: { id: 2, player_number: 1, chain_id: 1 } },
        { id: 2, x: 2, y: 0, stone: { id: 3, player_number: 1, chain_id: 1 } },
        { id: 3, x: 3, y: 0, stone: { id: 4, player_number: 1, chain_id: 1 } },
        { id: 4, x: 4, y: 0, stone: { id: 5, player_number: 1, chain_id: 1 } },

        { id: 5, x: 0, y: 1, stone: { id: 6, player_number: 1, chain_id: 1 } },
        { id: 6, x: 1, y: 1, stone: { id: 7, player_number: 2, chain_id: 2 } },
        { id: 7, x: 2, y: 1, stone: { id: 8, player_number: 2, chain_id: 2 } },
        { id: 8, x: 3, y: 1, stone: { id: 9, player_number: 2, chain_id: 2 } },
        { id: 9, x: 4, y: 1, stone: { id: 10, player_number: 1, chain_id: 1 } },

        { id: 10, x: 0, y: 2, stone: { id: 11, player_number: 1, chain_id: 1 } },
        { id: 11, x: 1, y: 2, stone: { id: 12, player_number: 2, chain_id: 2 } },
        { id: 12, x: 2, y: 2, stone: null },
        { id: 13, x: 3, y: 2, stone: { id: 13, player_number: 2, chain_id: 2 } },
        { id: 14, x: 4, y: 2, stone: { id: 14, player_number: 1, chain_id: 1 } },

        { id: 15, x: 0, y: 3, stone: { id: 15, player_number: 1, chain_id: 1 } },
        { id: 16, x: 1, y: 3, stone: { id: 16, player_number: 2, chain_id: 2 } },
        { id: 17, x: 2, y: 3, stone: { id: 17, player_number: 2, chain_id: 2 } },
        { id: 18, x: 3, y: 3, stone: { id: 18, player_number: 2, chain_id: 2 } },
        { id: 19, x: 4, y: 3, stone: { id: 19, player_number: 1, chain_id: 1 } },

        { id: 20, x: 0, y: 4, stone: { id: 20, player_number: 1, chain_id: 1 } },
        { id: 21, x: 1, y: 4, stone: { id: 21, player_number: 1, chain_id: 1 } },
        { id: 22, x: 2, y: 4, stone: { id: 22, player_number: 1, chain_id: 1 } },
        { id: 23, x: 3, y: 4, stone: { id: 23, player_number: 1, chain_id: 1 } },
        { id: 24, x: 4, y: 4, stone: { id: 24, player_number: 1, chain_id: 1 } }
      ] 
    }
  },
  pointSetWithAdjacentChains: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 1, x: 1, y: 0, stone: { id: 2, player_number: 1, chain_id: 1 } },
        { id: 2, x: 2, y: 0, stone: { id: 3, player_number: 1, chain_id: 1 } },
        { id: 3, x: 0, y: 1, stone: null },
        { id: 4, x: 1, y: 1, stone: { id: 5, player_number: 1, chain_id: 1 } },
        { id: 5, x: 2, y: 1, stone: null },
        { id: 6, x: 0, y: 2, stone: { id: 6, player_number: 1, chain_id: 2 } },
        { id: 7, x: 1, y: 2, stone: { id: 7, player_number: 1, chain_id: 2 } },
        { id: 8, x: 2, y: 2, stone: { id: 8, player_number: 1, chain_id: 2 } }
      ]
    }
  },
  pointSetWithNoAdjacentChains: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 1, x: 1, y: 0, stone: { id: 2, player_number: 1, chain_id: 1 } },
        { id: 2, x: 2, y: 0, stone: { id: 3, player_number: 1, chain_id: 1 } },
        { id: 3, x: 0, y: 1, stone: null },
        { id: 4, x: 1, y: 1, stone: { id: 5, player_number: 1, chain_id: 1 } },
        { id: 5, x: 2, y: 1, stone: null },
        { id: 6, x: 0, y: 2, stone: null },
        { id: 7, x: 1, y: 2, stone: null },
        { id: 8, x: 2, y: 2, stone: { id: 8, player_number: 1, chain_id: 2 } }
      ]
    }
  },
  pointSetWithNoLiberties: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 1, x: 1, y: 0, stone: { id: 2, player_number: 2, chain_id: 2 } },
        { id: 2, x: 2, y: 0, stone: null },
        { id: 3, x: 0, y: 1, stone: { id: 3, player_number: 2, chain_id: 2 } },
        { id: 4, x: 1, y: 1, stone: null },
        { id: 5, x: 2, y: 1, stone: null },
        { id: 6, x: 0, y: 2, stone: null },
        { id: 7, x: 1, y: 2, stone: null },
        { id: 8, x: 2, y: 2, stone: null }
      ]
    }
  },
  pointSetEmpty: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: null },
        { id: 1, x: 1, y: 0, stone: null },
        { id: 2, x: 2, y: 0, stone: null },
        { id: 3, x: 0, y: 1, stone: null },
        { id: 4, x: 1, y: 1, stone: null },
        { id: 5, x: 2, y: 1, stone: null },
        { id: 6, x: 0, y: 2, stone: null },
        { id: 7, x: 1, y: 2, stone: null },
        { id: 8, x: 2, y: 2, stone: null }
      ]
    }
  },
  pointSetToCapture: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 } },
        { id: 1, x: 1, y: 0, stone: { id: 2, player_number: 2, chain_id: 2 } },
        { id: 2, x: 2, y: 0, stone: null },
        { id: 3, x: 0, y: 1, stone: null },
        { id: 4, x: 1, y: 1, stone: { id: 3, player_number: 2, chain_id: 2 } },
        { id: 5, x: 2, y: 1, stone: null },
        { id: 6, x: 0, y: 2, stone: null },
        { id: 7, x: 1, y: 2, stone: null },
        { id: 8, x: 2, y: 2, stone: null }
      ]
    }
  },
  pointSetEndGame: {
    klass: PointSet,
    args: {
      points: [
        { id: 0, x: 0, y: 0, stone: null, territory_id: 7 },
        { id: 1, x: 1, y: 0, stone: null, territory_id: 7 },
        { id: 2, x: 2, y: 0, stone: { id: 1, player_number: 1, chain_id: 1 }, territory_id: 7 },
        { id: 3, x: 3, y: 0, stone: null, territory_id: 7 },
        { id: 4, x: 4, y: 0, stone: null, territory_id: 7 },

        { id: 5, x: 0, y: 1, stone: null, territory_id: 7 },
        { id: 6, x: 1, y: 1, stone: { id: 2, player_number: 1, chain_id: 1 }, territory_id: 7 },
        { id: 7, x: 2, y: 1, stone: { id: 3, player_number: 1, chain_id: 1 }, territory_id: 7 },
        { id: 8, x: 3, y: 1, stone: null, territory_id: 7 },
        { id: 9, x: 4, y: 1, stone: null, territory_id: 7 },

        { id: 10, x: 0, y: 2, stone: { id: 4, player_number: 1, chain_id: 1 }, territory_id: 7 },
        { id: 11, x: 1, y: 2, stone: { id: 5, player_number: 1, chain_id: 1 }, territory_id: 7 },
        { id: 12, x: 2, y: 2, stone: null, territory_id: 7 },
        { id: 13, x: 3, y: 2, stone: { id: 6, player_number: 2, chain_id: 2 }, territory_id: 7 },
        { id: 14, x: 4, y: 2, stone: { id: 7, player_number: 2, chain_id: 2 }, territory_id: 7 },

        { id: 15, x: 0, y: 3, stone: null, territory_id: 7 },
        { id: 16, x: 1, y: 3, stone: null, territory_id: 7 },
        { id: 17, x: 2, y: 3, stone: { id: 8, player_number: 2, chain_id: 2 }, territory_id: 7 },
        { id: 18, x: 3, y: 3, stone: { id: 9, player_number: 2, chain_id: 2 }, territory_id: 7 },
        { id: 19, x: 4, y: 3, stone: null, territory_id: 7 },

        { id: 20, x: 0, y: 4, stone: null, territory_id: 7 },
        { id: 21, x: 1, y: 4, stone: null, territory_id: 7 },
        { id: 22, x: 2, y: 4, stone: { id: 10, player_number: 2, chain_id: 2 }, territory_id: 7 },
        { id: 23, x: 3, y: 4, stone: null, territory_id: 7 },
        { id: 24, x: 4, y: 4, stone: null, territory_id: 7 }
      ]
    }
  }
};

const deepMerge = function(aObject, bObject) {
  let cObject = {};

  let aObjectKeys = [];
  let bObjectKeys = [];

  if (exists(aObject)) {
    aObjectKeys = Object.keys(aObject);
  }

  if (exists(bObject)) {
    bObjectKeys = Object.keys(bObject);
  }

  let keys = [...new Set([...aObjectKeys, ...bObjectKeys])];

  keys.forEach(function(k) {
    let aValue = undefined;
    let bValue = undefined;

    if (exists(aObject)) {
      aValue = aObject[k];
    }

    if (exists(bObject)) {
      bValue = bObject[k];
    }

    let cValue = undefined;

    if (exists(bValue)) {
      if (bValue.constructor === Object) {
        cValue = deepMerge(aValue, bValue); 
      } else { 
        cValue = bValue;
      }
    } else {
      cValue = aValue;
    }

    cObject[k] = cValue;
  });
  return cObject;
};

const fixtures = function(name, customArgs) {
  let definition = fixtureDefinitions[name];
  if (!exists(definition)) {
    throw new Error(`Undefined fixture: ${name}`);
  }
  let args = {};
  if (exists(customArgs)) {
    args = deepMerge(definition.args, customArgs);
  } else {
    args = Object.assign({}, definition.args);
  }
  return new definition.klass(args);
};

export default fixtures

