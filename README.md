# JGo

A go game state and validation library written in Javascript.

## Installation

Install via npm:

  $ npm install @mrlhumphreys/jgo

## Usage

ES5:

```javascript
  var Match = require('@mrlhumphreys/jgo').Match;
```

ES6:

```javascript
  import { Match } from '@mrlhumphreys/jgo'
```

Initialize a new match object:

```javascript 
  var match = new Match({
  });
```

Serialize match object:

```javascript
  match.asJson;
```

Make a move

```javascript
  match.touchPoint(19, 1); // place a stone at point 19 for player 1
```

Pass the turn

```javascript
  match.touchPass(1); // pass the turn for player 1
```

Get winner

```javascript
  match.winner;
```

## Development

After checkout out the repo, run `npm install` to install dependencies. Run `npm build` to transpile ES6 to ES5 into the lib directory. Run `npm test` to run the tests.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/mrlhumphreys/jgo. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The module is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
