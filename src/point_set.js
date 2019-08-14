import exists from './exists'
import flat from './flat'
import uniq from './uniq'
import max from './max'
import min from './min'
import compact from './compact'
import reject from './reject'
import Vector from './vector'
import Stone from './stone'
import Point from './point'
import Chain from './chain'
import Territory from './territory'

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

  filter(fn) {
    let points = this.points.filter(fn);
    return new this.constructor({ points: points });
  }

  forEach(fn) {
    this.points.forEach(fn);
  }

  map(fn) {
    return this.points.map(fn);
  }

  every(fn) {
    return this.points.every(fn);
  }

  get length() {
    return this.points.length;
  }

  findById(pointId) {
    return this.points.filter(function(p) {
      return p.id == pointId;
    })[0];
  }

  get occupied() {
    return this.filter(function(p) {
      return p.occupied;
    });
  }

  get unoccupied() {
    return this.filter(function(p) {
      return p.unoccupied;
    });
  }

  occupiedBy(playerNumber) {
    return this.filter(function(p) {
      return p.occupiedBy(playerNumber);
    });
  }

  occupiedByOpponent(playerNumber) {
    return this.filter(function(p) {
      return p.occupiedByOpponent(playerNumber);
    });
  }

  adjacent(point_or_group) {
    let points = [];

    switch (point_or_group.constructor) {
      case Point:
        return this.filter(function(p) {
          let vector = new Vector(point_or_group, p);
          return vector.orthogonal && (vector.magnitude === 1);
        });
        break;
      case Chain:
        points = flat(point_or_group.points.map((p) => { 
          return this.adjacent(p).points;
        })).filter(function(p) {
          return !point_or_group.includes(p); 
        }).filter(function(p, i, a) {
          return a.indexOf(p) === i; 
        });

        return new this.constructor({ points: points });
        break;
      case Territory:
        points = flat(point_or_group.points.map((p) => { 
          return this.adjacent(p).points;
        })).filter(function(p) {
          return !point_or_group.includes(p); 
        }).filter(function(p, i, a) {
          return a.indexOf(p) === i; 
        });

        return new this.constructor({ points: points });
        break;
      default:
        return null; 
    }
  }


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

  territoriesFor(playerNumber) {
    return this.territories().filter((t) => {
      return this.adjacent(t).every(function(p) { 
        return p.occupiedBy(playerNumber);
      });
    });
  }

  libertiesFor(pointOrChain) {
    return this.adjacent(pointOrChain).unoccupied.length;
  }

  deprivesLiberties(point, playerNumber) {
    let chainIds = uniq(this.adjacent(point).occupiedBy(playerNumber).map(function(p) { return p.stone.chainId }));
    let chains = this.chains(chainIds);
    return chains.every((c) => { return this.libertiesFor(c) === 1; });
  }

  deprivesOpponentsLiberties(point, playerNumber) {
    let chainIds = uniq(this.adjacent(point).occupiedByOpponent(playerNumber).map(function(p) { return p.stone.chainId; }));
    let chains = this.chains(chainIds);
    return chains.some((c) => { return this.libertiesFor(c) === 1; });
  }

  updateJoinedChains(pointId, playerNumber) {
    let point = this.findById(pointId);
    let existingChainIds = uniq(this.adjacent(point).occupiedBy(playerNumber).map(function(p) {
      return p.stone.chainId;
    }));
    let existingChains = this.chains(existingChainIds);

    existingChains.forEach(function(c) {
      c.points.forEach(function(p) {
        p.stone.joinChain(point.stone);
      });
    });
  }

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

  get minify() {
    return this.points.map(function(p) {
      let playerNumber = exists(p.stone) && p.stone.playerNumber;
      return playerNumber ? String(playerNumber) : '-';
    }).join('');
  }

  place(pointId, stone) {
    let point = this.findById(pointId);
    point.place(stone);
  }

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

  buildStone(point, playerNumber) {
    let adjacentChainId = this.adjacentChainId(point, playerNumber);
    return new Stone({
      id: this.nextStoneId,
      player_number: playerNumber,
      chain_id: exists(adjacentChainId) ? adjacentChainId : this.nextChainId
    });
  }

  performMove(point, playerNumber) {
    let stone = this.buildStone(point, playerNumber);
    this.place(point.id, stone);
    this.updateJoinedChains(point.id, playerNumber);
    return this.captureStones(playerNumber);
  }

  get dup() {
    return new this.constructor({ points: this.asJson });
  }

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
  }
}

export default PointSet;
