import uniq from '../src/uniq'
import exists from '../src/exists'
import PointSet from '../src/point_set'
import Point from '../src/point'
import Stone from '../src/stone'
import Chain from '../src/chain'
import Territory from '../src/territory'
import fixtures from './fixtures'

describe('PointSet', () => {
  describe('initialize', () => {
    it('must set attributes', () => {
      let points = [{ id: 1, x: 2, y: 3, stone: null }];
      let pointSet = new PointSet({points: points});
      expect(pointSet.points.constructor).toBe(Array);
    });

    it('must handle empty array', () => {
      let points = [];
      let pointSet = new PointSet({points: points});
      expect(pointSet.points).toEqual([]);
    });

    it('must handle an array of hashes', () => {
      let points = [{ id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 } }];
      let pointSet = new PointSet({points: points});
      let firstPoint = pointSet.points[0];

      expect(firstPoint.constructor).toEqual(Point);
      expect(firstPoint.id).toEqual(1);
      expect(firstPoint.x).toEqual(2);
      expect(firstPoint.y).toEqual(3);
      expect(firstPoint.stone.constructor).toEqual(Stone);
      expect(firstPoint.stone.id).toEqual(1);
      expect(firstPoint.stone.playerNumber).toEqual(2);
    });

    it('must handle an array of points', () => {
      let points = [new Point({ id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 } })];
      let pointSet = new PointSet({points: points});
      let firstPoint = pointSet.points[0];

      expect(firstPoint.constructor).toEqual(Point);
      expect(firstPoint.id).toEqual(1);
      expect(firstPoint.x).toEqual(2);
      expect(firstPoint.y).toEqual(3);
      expect(firstPoint.stone.constructor).toEqual(Stone);
      expect(firstPoint.stone.id).toEqual(1);
    });
  });

  describe('asJson', () => {
    it('must return an array of objects with attributes', () => {
      let points = [{id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2 } }];
      let pointSet = new PointSet({points: points});
      let result = pointSet.asJson;
      let expected = [
        { id: 1, x: 2, y: 3, stone: { id: 1, player_number: 2, chain_id: null }, territory_id: null }
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('filter', () => {
    it('filters the points property and returns a PointSet', () => {
      let pointSet = fixtures('pointSet');
      let result = pointSet.filter(function(p) {
        return p.id === 1;
      });

      expect(result.constructor).toBe(PointSet);
      expect(result.points[0].id).toEqual(1);
    });
  });

  describe('map', () => {
    it('returns an array of items returned by the function', () => {
      let pointSet = fixtures('pointSet');
      let result = pointSet.map(function(p) {
        return p.id;
      });

      expect(result).toEqual([0,1,2,3,4,5,6,7,8]);
    });
  });

  describe('forEach', () => {
    it('iterates over each point', () => {
      let pointSet = fixtures('pointSet');
      let count = 0;

      pointSet.forEach(function(p) {
        count += 1;
      });

      expect(count).toEqual(9);
    });
  });

  describe('every', () => {
    it('returns the result of every on the points', () => {
      let pointSet = fixtures('pointSet');
      let result = pointSet.every(function(p) {
        return p.id !== null;
      });

      expect(result).toBe(true);
    });
  });

  describe('length', () => {
    it('returns the length of the points', () => {
      let pointSet = fixtures('pointSet');
      let result = pointSet.length;

      expect(result).toEqual(9);
    });
  });

  describe('findById', () => {
    it('returns a point matching the id', () => {
      let pointSet = fixtures('pointSet');
      let pointId = 1;

      let point = pointSet.findById(pointId);

      expect(point.constructor).toBe(Point);
      expect(point.id).toEqual(pointId);
    });
  });

  describe('occupied', () => {
    it('must return points where stone is not null', () => {
      let pointSet = fixtures('pointSet');

      let result = pointSet.occupied;

      expect(result.points.every(function(p) { return p.stone !== null; })).toBe(true);
    });
  });

  describe('unoccupied', () => {
    it('must return points where stone is null', () => {
      let pointSet = fixtures('pointSet');

      let result = pointSet.unoccupied;

      expect(result.points.every(function(p) { return p.stone === null; })).toBe(true);
    });
  });

  describe('occupiedBy', () => {
    it('must return all points occupied by player', () => {
      let pointSet = fixtures('pointSet');
      let playerNumber = 1;

      let result = pointSet.occupiedBy(playerNumber);

      expect(result.points.every(function(p) { return p.stone.playerNumber === playerNumber; })).toBe(true);
    });
  });

  describe('adjacent', () => {
    describe('with a point', () => {
      it('must return the points next to and orthogonal to the point', () => {
        let pointSet = fixtures('pointSet');
        let pointId = 4;
        let point = pointSet.points.filter(function(p) {
          return p.id === pointId;
        })[0];

        let result = pointSet.adjacent(point);

        expect(result.points.map(function(p) { return p.id; })).toEqual([1, 3, 5, 7]);
      });
    });

    describe('with a chain', () => {
      it('must return the points next to and orthogonal to the chain', () => {
        let pointSet = fixtures('pointSetWithChain');
        let chain = new Chain({ points: [
          pointSet.points.filter(function(p) { return p.id == 4; })[0],
          pointSet.points.filter(function(p) { return p.id == 5; })[0]
        ] }); 

        let result = pointSet.adjacent(chain);

        expect(result.points.map(function(p) { return p.id; }).sort()).toEqual([1, 2, 3, 7, 8]);
      });

      it('must return unique points', () => {
        let pointSet = fixtures('pointSetWithUChain');

        let chain = new Chain({ points: [
          pointSet.points.filter(function(p) { return p.id == 1; })[0],
          pointSet.points.filter(function(p) { return p.id == 2; })[0],
          pointSet.points.filter(function(p) { return p.id == 5; })[0],
          pointSet.points.filter(function(p) { return p.id == 7; })[0],
          pointSet.points.filter(function(p) { return p.id == 8; })[0]
        ] }); 

        let result = pointSet.adjacent(chain);

        expect(result.points.map(function(p) { return p.id; }).sort()).toEqual([0, 4, 6]);
      });
    }); 

    describe('with a territory', () => {
      it('must return the points next to and orthogonal to the territory', () => {
        let pointSet = fixtures('pointSetWithTerritory');
        
        let territory = new Territory({
          points: [
            pointSet.points.filter(function(p) { return p.id == 0; })[0],
            pointSet.points.filter(function(p) { return p.id == 1; })[0],
            pointSet.points.filter(function(p) { return p.id == 5; })[0]
          ]
        });

        let result = pointSet.adjacent(territory);        

        expect(result.points.map(function(p) { return p.id; }).sort()).toEqual([10, 2, 6]);
      });
    });
  });

  describe('occupiedByOpponent', () => {
    it('must return all points occupied by player', () => {
      let pointSet = fixtures('pointSet');
      let playerNumber = 1;
      let opponentNumber = 2;

      let result = pointSet.occupiedByOpponent(playerNumber);

      expect(result.points.every(function(p) { return p.stone.playerNumber === opponentNumber; })).toBe(true);
    });
  });

  describe('where', () => {
    describe('with a single value', () => {
      it('must filter based on conditions', () => {
        let pointSet = fixtures('pointSetWithTerritory');
        let territoryId = 1;

        let result = pointSet.where({territoryId: territoryId});

        expect(result.points.every(function(p) { 
          return p.territoryId === territoryId; 
        })).toBe(true);
      });
    });

    describe('with multiple values', () => {
      it('must return all the ones matching', () => {
        let pointSet = fixtures('pointSetWithTerritory');
        let territoryIds = [1, 2];

        let result = pointSet.where({territoryId: territoryIds});

        expect(result.points.every(function(p) { 
          return territorIds.includes(function(e) {
            return p.territoryId === e; 
          });
        })).toBe(true);
      });
    });
  });

  describe('chains', () => {
    describe('specifying chain_ids', () => {
      it('must return an array of chains', () => {
        let pointSet = fixtures('pointSetWithChain');
        let chainId = 1;
        
        let result = pointSet.chains([chainId]);

        expect(result.every(function(c) {
          return c.constructor === Chain;
        })).toBe(true);

        expect(result.every(function(c) {
          return c.points[0].stone.chainId === chainId;
        })).toBe(true);
      });
    });

    describe('with no chain_ids passed in', () => {
      it('must return all chains', () => {
        let pointSet = fixtures('pointSetWithChain');
        let chainId = 1;
        
        let result = pointSet.chains();

        expect(result.every(function(c) {
          return c.constructor === Chain;
        })).toBe(true);

        expect(result.length).toEqual(2);
      });
    });
  });

  describe('territories', () => {
    it('must return points grouped by territory id', () => {
      let pointSet = fixtures('pointSetWithTerritory');
      
      let result = pointSet.territories();

      expect(result.length).toEqual(5);
      expect(result[0].constructor).toBe(Territory);
      expect(result[0].points.length).toEqual(3);
    });    
  });

  describe('territories_for', () => {
    it('must return territories for that player', () => {
      let pointSet = fixtures('pointSetWithTerritory');
      let playerNumber = 1;

      let territories = pointSet.territoriesFor(playerNumber);
      let territory = territories[0];

      expect(territories.length).toEqual(1);
      expect(territory.constructor).toEqual(Territory);
      expect(territory.points.length).toEqual(3);
    });
  });

  describe('liberties_for', () => {
    describe('with empty points adjacent', () => {
      it('must return the number of empty points adjacent', () => {
        let pointSet = fixtures('pointSetWithLiberties');
        let point = pointSet.points.filter(function(p) { return p.id === 4; })[0];

        let result = pointSet.libertiesFor(point);

        expect(result).toEqual(2);
      });
    });

    describe('with no empty points adjacent', () => {
      it('must return 0', () => {
        let pointSet = fixtures('pointSetWithoutLiberties');
        let point = pointSet.points.filter(function(p) { return p.id === 4; })[0];

        let result = pointSet.libertiesFor(point);

        expect(result).toEqual(0);
      });
    });
  });

  describe('deprivesLiberties', () => {
    describe('when the adjacent friendly chain has 1 liberty', () => {
      it('must return true', () => {
        let pointSet = fixtures('pointSetWithOneLiberty');
        let point = pointSet.points.filter(function(p) { return p.id === 4; })[0];
        let playerNumber = 2;

        let result = pointSet.deprivesLiberties(point, playerNumber);

        expect(result).toBe(true);
      });
    });

    describe('when the adjacent friendly chain has more than 1 liberty', () => {
      it('must return false', () => {
        let pointSet = fixtures('pointSetWithTwoLiberties');
        let point = pointSet.points.filter(function(p) { return p.id === 4; })[0];
        let playerNumber = 2;

        let result = pointSet.deprivesLiberties(point, playerNumber);

        expect(result).toBe(false);
      });
    });
  });

  describe('deprivesOpponentsLiberties', () => {
    describe('when move deprives adjacent opponents chains', () => {
      it('must return true', () => {
        let pointSet = fixtures('pointSetDeprivesOpponentsLiberties');
        let point = pointSet.points.find(function(p) { return p.id === 12; });
        let playerNumber = 1;

        let result = pointSet.deprivesOpponentsLiberties(point, playerNumber);
        
        expect(result).toBe(true);
      });
    });
  });

  describe('updateJoinedChains', () => {
    describe('with point adjacent to some chains', () => {
      it('must update the chains that are adjacent', () => {
        let pointSet = fixtures('pointSetWithAdjacentChains');
        let pointId = 4;
        let playerNumber = 1;

        pointSet.updateJoinedChains(pointId, playerNumber);

        let result = uniq(pointSet.points.filter(function(p) {
          return [0, 1, 2, 4, 6, 7, 8].includes(p.id);
        }).map(function(p) {
          return exists(p.stone) && p.stone.chainId; 
        })).length; 

        expect(result).toEqual(1);
      });
    });

    describe('with point adjacent to no chaiins', () => {
      it('must not update the chains that are not adjacent', () => {
        let pointSet = fixtures('pointSetWithNoAdjacentChains');
        let pointId = 4;
        let point = pointSet.points.filter(function(p) {
          return p.id === pointId;
        })[0];
        let playerNumber = 1;

        pointSet.updateJoinedChains(pointId, playerNumber);

        let nonAdjacentPoint = pointSet.points.filter(function(p) {
          return p.id === 8;
        })[0];

        expect(point.stone.chainId).toEqual(1);
        expect(nonAdjacentPoint.stone.chainId).toEqual(2);
      });
    });
  });

  describe('captureStones', () => {
    describe('with chains with no liberties', () => {
      it('must remove those chains', () => {
        let pointSet = fixtures('pointSetWithNoLiberties');
        let stoneCount = pointSet.captureStones(2);
        let capturedPoint = pointSet.points.filter(function(p) {
          return p.id === 0;
        })[0];

        expect(capturedPoint.stone).toBe(null);
        expect(stoneCount).toEqual(1);
      });
    });

    describe('with chains with liberties', () => {
      it('must not remove any chains', () => {
        let pointSet = fixtures('pointSetWithLiberties');

        pointSet.captureStones(2);

        let points = pointSet.points.filter(function(p) {
          return exists(p.stone); 
        });

        expect(points.length).toEqual(6);
      });
    });
  });

  describe('minify', () => {
    it('must return a string representing the board state', () => {
      let pointSet = fixtures('pointSet');

      let result = pointSet.minify;

      expect(result).toEqual('1-------2');
    });
  });

  describe('place', () => {
    it('adds stone on to the point', () => {
      let pointSet = fixtures('pointSet');
      let pointId = 3;
      let stone = new Stone({ id: 5, player_number: 1, chain_id: 5 });

      pointSet.place(pointId, stone);

      let placedPoint = pointSet.points.filter(function(p) {
        return p.id === pointId;
      })[0];

      expect(placedPoint.stone.id).toEqual(stone.id);
    });
  });

  describe('nextStoneId', () => {
    describe('with no points occupied', () => {
      it('must return 1', () => {
        let pointSet = fixtures('pointSetEmpty');
        let result = pointSet.nextStoneId;
        expect(result).toEqual(1);
      });
    });

    describe('with a point occupied', () => {
      it('must return the max point id + 1', () => {
        let pointSet = fixtures('pointSet');
        let result = pointSet.nextStoneId;
        expect(result).toEqual(3);
      });
    });
  });

  describe('adjacentChainId', () => {
    describe('with no stones adjacent', () => {
      it('must return null', () => {
        let pointSet = fixtures('pointSetEmpty');
        let point = pointSet.points.filter(function(p) {
          return p.id === 1;
        })[0];
        let playerNumber = 1;

        let result = pointSet.adjacentChainId(point, playerNumber);

        expect(result).toBe(null);
      });
    });

    describe('with stones adjacent', () => {
      it('must return the adjacent stone id', () => {
        let pointSet = fixtures('pointSet');
        let point = pointSet.points.filter(function(p) {
          return p.id === 1;
        })[0];
        let playerNumber = 1;

        let result = pointSet.adjacentChainId(point, playerNumber);

        expect(result).toEqual(1);
      });
    });
  });

  describe('nextChainId', () => {
    describe('withNoOccupiedPoints', () => {
      it('must return 1', () => {
        let pointSet = fixtures('pointSetEmpty');

        let result = pointSet.nextChainId;

        expect(result).toEqual(1);
      });
    });

    describe('withAnOccupiedPoint', () => {
      it('must return the max chain id + 1', () => {
        let pointSet = fixtures('pointSet');

        let result = pointSet.nextChainId;

        expect(result).toEqual(3);
      });
    });
  });

  describe('buildStone', () => {
    it('must return a new stone with id and chain id', () => {
      let pointSet = fixtures('pointSet');
      let point = pointSet.points.filter(function(p) {
        return p.id === 1;
      })[0];
      let playerNumber = 2;

      let stone = pointSet.buildStone(point, playerNumber);

      expect(stone.constructor).toEqual(Stone);
      expect(stone.id).toEqual(3);
      expect(stone.playerNumber).toEqual(playerNumber);
      expect(stone.chainId).toEqual(3);
    });
  });

  describe('performMove', () => {
    it('places a stone', () => {
      let pointSet = fixtures('pointSetToCapture');
      let point = pointSet.points.filter(function(p) {
        return p.id === 3;
      })[0]; 
      let playerNumber = 2;

      pointSet.performMove(point, playerNumber);

      let placedPoint = pointSet.points.filter(function(p) {
        return p.id === 3;
      })[0];
      let stone = placedPoint.stone;

      expect(stone.constructor).toEqual(Stone);
    });

    it('updates chain', () => {
      let pointSet = fixtures('pointSetToCapture');
      let point = pointSet.points.filter(function(p) {
        return p.id === 3;
      })[0]; 
      let playerNumber = 2;

      pointSet.performMove(point, playerNumber);

      let chainPoints = pointSet.points.filter(function(p) {
        return exists(p.stone) && p.stone.chainId === 2;
      });

      expect(chainPoints.length).toEqual(3);
    });

    it('captures stone', () => {
      let pointSet = fixtures('pointSetToCapture');
      let point = pointSet.points.filter(function(p) {
        return p.id === 3;
      })[0]; 
      let playerNumber = 2;

      pointSet.performMove(point, playerNumber);

      let capturePoint = pointSet.points.filter(function(p) {
        return p.id === 0;
      })[0];
      let stone = capturePoint.stone;

      expect(stone).toBe(null);
    });

    it('returns the captured stone count', () => {
      let pointSet = fixtures('pointSetToCapture');
      let point = pointSet.points.filter(function(p) {
        return p.id === 3;
      })[0]; 
      let playerNumber = 2;

      let result = pointSet.performMove(point, playerNumber);

      expect(result).toEqual(1);
    });
  });

  describe('dup', () => {
    it('must return a copy of the point set', () => {
      let pointSet = fixtures('pointSet');

      let dupped = pointSet.dup;

      expect(dupped.points).toEqual(pointSet.points);
    });
  });

  describe('markTerritories', () => {
    describe('with empty points surrounded by both players and no players', () => {
      it('clears existing territory ids and groups empty points into territories', () => {
        let pointSet = fixtures('pointSetEndGame');

        pointSet.markTerritories();

        let territoryCountOne = pointSet.points.filter(function(p) {
          return p.territoryId === 1;
        }).length;
        let territoryCountTwo = pointSet.points.filter(function(p) {
          return p.territoryId === 2;
        }).length;
        let territoryCountThree = pointSet.points.filter(function(p) {
          return p.territoryId === 3;
        }).length;
        let territoryCountFour = pointSet.points.filter(function(p) {
          return p.territoryId === 4;
        }).length;
        let territoryCountFive = pointSet.points.filter(function(p) {
          return p.territoryId === 5;
        }).length;
        let territoryCountSeven = pointSet.points.filter(function(p) {
          return p.territoryId === 7;
        }).length;

        expect(territoryCountOne).toEqual(3);
        expect(territoryCountTwo).toEqual(4);
        expect(territoryCountThree).toEqual(1);
        expect(territoryCountFour).toEqual(4);
        expect(territoryCountFive).toEqual(3);
        expect(territoryCountSeven).toEqual(0);
      });
    });
  });
});
