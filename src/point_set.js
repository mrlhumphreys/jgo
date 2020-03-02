import { compact, exists, flat, max, min, reject, uniq } from './utils'
import Vector from './vector'
import Stone from './stone'
import Point from './point'
import Chain from './chain'
import Territory from './territory'

/** A set of points */
class PointSet {
  /** 
   * Create a PointSet.
   * @param {Object} args - The properties of the point set.
   * @param {Object[]} args.points - An array of point properties.
   */
  constructor(args) {
    /** @member {Point[]} */
    this.points = args.points.map(function(p) {
      return (p.constructor === Point ? p : new Point(p));
    });
  }

  /**
   * Serialize the point set as a series of objects.
   * @return {Object[]}
   */
  get asJson() {
    return this.points.map(function(p) {
      return p.asJson;
    });
  }

  /**
   * Filter the points in the point set based on a function.
   * @param {Function} fn - The filter function.
   * @return {PointSet}
   */
  filter(fn) {
    let points = this.points.filter(fn);
    return new this.constructor({ points: points });
  }

  /**
   * Iterate through each point and run a function.
   * @param {Function} fn - The each function.
   * @return {undefined}
   */
  forEach(fn) {
    this.points.forEach(fn);
  }

  /**
   * Map through each point with a function.
   * @param {Function} fn - The map function.
   * @return {Object[]}
   */
  map(fn) {
    return this.points.map(fn);
  }

  /**
   * Does every point satisfy the function?
   * @param {Function} fn - The every function.
   * @return {boolean}
   */
  every(fn) {
    return this.points.every(fn);
  }

  /**
   * The number of points.
   * @return {boolean}
   */
  get length() {
    return this.points.length;
  }

  /**
   * Find the point by id.
   * @param {number} pointId - The identifier of the point.
   * @return {(Point|undefined)}
   */
  findById(pointId) {
    return this.points.filter(function(p) {
      return p.id == pointId;
    })[0];
  }

  /**
   * All the occupied points.
   * @return {PointSet}
   */
  get occupied() {
    return this.filter(function(p) {
      return p.occupied;
    });
  }

  /**
   * All the unoccupied points.
   * @return {PointSet}
   */
  get unoccupied() {
    return this.filter(function(p) {
      return p.unoccupied;
    });
  }

  /**
   * All the points occupied by player.
   * @param {number} playerNumber - The number of the player.
   * @return {PointSet}
   */
  occupiedBy(playerNumber) {
    return this.filter(function(p) {
      return p.occupiedBy(playerNumber);
    });
  }

  /**
   * All the points occupied by the opponent.
   * @param {number} playerNumber - The number of the player.
   * @return {PointSet}
   */
  occupiedByOpponent(playerNumber) {
    return this.filter(function(p) {
      return p.occupiedByOpponent(playerNumber);
    });
  }

  /**
   * All the points adjacent to the point or group.
   * @param {(Point|Chain|Territory)} pointOrGroup
   * @return {(PointSet|null)}
   */
  adjacent(pointOrGroup) {
    let points = [];

    switch (pointOrGroup.constructor) {
      case Point:
        return this.filter(function(p) {
          let vector = new Vector(pointOrGroup, p);
          return vector.orthogonal && (vector.magnitude === 1);
        });
      case Chain:
        points = flat(pointOrGroup.points.map((p) => { 
          return this.adjacent(p).points;
        })).filter(function(p) {
          return !pointOrGroup.includes(p); 
        }).filter(function(p, i, a) {
          return a.indexOf(p) === i; 
        });

        return new this.constructor({ points: points });
      case Territory:
        points = flat(pointOrGroup.points.map((p) => { 
          return this.adjacent(p).points;
        })).filter(function(p) {
          return !pointOrGroup.includes(p); 
        }).filter(function(p, i, a) {
          return a.indexOf(p) === i; 
        });

        return new this.constructor({ points: points });
      default:
        return null; 
    }
  }

  /**
   * Find all points matching properties.
   * @param {Object} args - Key Value pairs representing the property of the object and the matching value
   * @return {PointSet}
   */
  where(args) {
    let scope = this;
    let fields = Object.keys(args);
    fields.forEach(function(field) {
      let value = args[field];

      scope = scope.filter(function(point) {
        if (value.constructor === Array) {
          return value.includes(function(element) {
            return point[field] === element; 
          }); 
        } else {
          return point[field] === value;
        }
      });
    }); 

    return scope;
  }

  /**
   * All chains in the point set.
   * If specified, only get chains matching chainIds
   * @param {number[]} [chainIds=null] - The chain ids.
   * @return {Chain[]}
   */
  chains(chainIds=null) {
    if (exists(chainIds)) {
      return chainIds.map((cId) => { 
        let points = this.filter(function(p) {
          return exists(p.stone) && p.stone.chainId === cId;
        }).points;
        return new Chain({points: points});
      });
    } else {
      let allChainIds = uniq(this.filter(function(p) {
        return exists(p.stone);
      }).map(function(p) {
        return p.stone.chainId; 
      }));
      return this.chains(allChainIds);
    }
  }

  /**
   * All territories in the point set.
   * If specified, only get territories matching territoryIds
   * @param {number[]} [territoryIds=null] - The territory ids.
   * @return {Territory[]}
   */
  territories(territoryIds=null) {
    if (exists(territoryIds)) {
      return territoryIds.map((tId) => { 
        let points = this.filter(function(p) {
          return p.territoryId === tId; 
        }).points; 
        return new Territory({points: points});
      });
    } else {
      let allTerritoryIds = uniq(this.filter(function(p) {
        return exists(p.territoryId); 
      }).map(function(p) {
        return p.territoryId;    
      }));
      return this.territories(allTerritoryIds);
    }
  }

  /**
   * All territories owned by player.
   * @param {number} playerNumber - The number of the player.
   * @return {Territory[]}
   */
  territoriesFor(playerNumber) {
    return this.territories().filter((t) => {
      return this.adjacent(t).every(function(p) { 
        return p.occupiedBy(playerNumber);
      });
    });
  }

  /**
   * The number of liberties of the point or chain.
   * @param {(Point|Chain)} pointOrChain - The point or chain.
   * @return {number}
   */
  libertiesFor(pointOrChain) {
    return this.adjacent(pointOrChain).unoccupied.length;
  }

  /**
   * Does adding a stone owned by player deprive their own liberties?
   * @param {Point} point - The point a stone will be placed.
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  deprivesLiberties(point, playerNumber) {
    let chainIds = uniq(this.adjacent(point).occupiedBy(playerNumber).map(function(p) { return p.stone.chainId }));
    let chains = this.chains(chainIds);
    return chains.every((c) => { return this.libertiesFor(c) === 1; });
  }

  /**
   * Does adding a stone owned by the player deprive opponent's liberties?
   * @param {Point} point - The point a stone will be placed.
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  deprivesOpponentsLiberties(point, playerNumber) {
    let chainIds = uniq(this.adjacent(point).occupiedByOpponent(playerNumber).map(function(p) { return p.stone.chainId; }));
    let chains = this.chains(chainIds);
    return chains.some((c) => { return this.libertiesFor(c) === 1; });
  }

  /**
   * Go through all chains and update the chain ids of any recently connected chains.
   * @param {number} pointId - The point that just had a stone placed.
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  updateJoinedChains(pointId, playerNumber) {
    let point = this.findById(pointId);
    if (exists(point)) {
      let existingChainIds = uniq(this.adjacent(point).occupiedBy(playerNumber).map(function(p) {
        return p.stone.chainId;
      }));
      let existingChains = this.chains(existingChainIds);

      existingChains.forEach(function(c) {
        c.points.forEach(function(p) {
          p.stone.joinChain(point.stone);
        });
      });
      return true;
    } else {
      return false;
    }
  }

  /**
   * Remove stones that have no liberties.
   * Return the number of stones captured.
   * @param {number} playerNumber - The number of the player capturing the stones.
   * @return {number}
   */
  captureStones(playerNumber) {
    let stoneCount = 0;

    this.chains().filter((c) => {
      return c.playerNumber !== playerNumber && this.libertiesFor(c) === 0;
    }).forEach(function(c) {
      c.points.forEach(function(p) {
        p.captureStone();
        stoneCount += 1;
      }); 
    });

    return stoneCount;
  }

  /**
   * Minify the board state into a string.
   * @return {string}
   */
  get minify() {
    return this.points.map(function(p) {
      let playerNumber = exists(p.stone) && p.stone.playerNumber;
      return playerNumber ? String(playerNumber) : '-';
    }).join('');
  }

  /**
   * Place a stone at the matching point.
   * @param {number} pointId - The id of the point.
   * @param {Stone} stone - The stone.
   * @return {boolean}
   */
  place(pointId, stone) {
    let point = this.findById(pointId);
    if (exists(point)) {
      return point.place(stone);
    } else {
      return false;
    }
  }

  /**
   * The id of the next stone to be placed.
   * @return {number};
   */
  get nextStoneId() {
    let maxId = max(this.occupied.map(function(p) {
      return p.stone.id;
    }));
    if (exists(maxId)) {
      return maxId + 1;
    } else {
      return 1;
    }
  }

  /**
   * The chain id of an adjacent chain to the point, owned by the player.
   * Returns null if no matching adjacent chains.
   * @param {Point} point - The point.
   * @param {number} playerNumber - The number of the player.
   * @return {(number|null)}
   */
  adjacentChainId(point, playerNumber) {
    let chainId = this.adjacent(point).occupiedBy(playerNumber).map(function(p) {
      return p.stone.chainId; 
    })[0];
    if (exists(chainId)) {
      return chainId;
    } else {
      return null;
    }
  }

  /**
   * The id of the next chain to be made.
   * @return {number}
   */
  get nextChainId() {
    let maxId = max(this.occupied.map(function(p) {
      return p.stone.chainId;
    }));
    if (exists(maxId)) {
      return maxId + 1;
    } else {
      return 1;
    }
  }

  /**
   * Build a stone based on the point and player.
   * @param {Point} point - The point the stone will be placed on.
   * @param {number} playerNumber - The number of the player who is placing the stone.
   * @return {Stone}
   */
  buildStone(point, playerNumber) {
    let adjacentChainId = this.adjacentChainId(point, playerNumber);
    return new Stone({
      id: this.nextStoneId,
      player_number: playerNumber,
      chain_id: exists(adjacentChainId) ? adjacentChainId : this.nextChainId
    });
  }

  /**
   * Place a stone on the point as the player. Returns the number of captured stones.
   * @param {Point} point - The point the stone will be placed on.
   * @param {number} playerNumber - The number of the player who is placing the stone.
   * @return {number} 
   */
  performMove(point, playerNumber) {
    let stone = this.buildStone(point, playerNumber);
    this.place(point.id, stone);
    this.updateJoinedChains(point.id, playerNumber);
    return this.captureStones(playerNumber);
  }

  /**
   * Duplicate the PointSet.
   * @return {PointSet}
   */
  get dup() {
    return new this.constructor({ points: this.asJson });
  }

  /**
   * Clear all territory ids and assign a territory to all unoccupied points.
   * @return {boolean}
   */
  markTerritories() {
    this.points.forEach(function(point) {
      point.clearTerritory();
    });
    this.points.forEach((point) => {
      if (point.unoccupied && point.unmarked) {
        let territoryIds = uniq(compact(this.adjacent(point).unoccupied.map(function(p) {
          return p.territoryId;
        })));
        let addTerritoryId = undefined;
        switch(territoryIds.length) {
          case 0:
            let maxId = max(compact(this.points.map(function(p) {
              return p.territoryId; 
            })));
            if (exists(maxId)) {
              addTerritoryId = maxId + 1;
            } else {
              addTerritoryId = 1;
            }
            break;
          case 1:
            addTerritoryId = territoryIds[0];
            break;
          default:
            let minId = min(territoryIds);
            let otherIds = reject(territoryIds, function(p) {
              return p === minId;  
            });
            let otherPoints = this.points.filter(function(p) {
              return otherIds.includes(p.id);
            });
            otherPoints.forEach(function(otherPoint) {
              otherPoint.addToTerritory(minId);
            });
            addTerritoryId = minId;
        }

        point.addToTerritory(addTerritoryId);
      }
    });
    return true;
  }
}

export default PointSet;
