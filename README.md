# Smoking
Simple Mocks and Stubs for javascript.

![Smock](http://www.omerique.net/polavide/rec_polavide0708/edilim/hie_hue_hui_hum/misrecursos/humo.gif)

```bash
$ npm install smoking
```

Or add it to your script tag

```html
https://raw.github.com/elcuervo/smoking/master/lib/smoking.js
```

## Stubbing

The idea is to provide simple mocking and stubbing to normal objects, no API, no
dependencies.

### Example

```javascript
var Fruit = function(color) {
  this.color = color;
  this.healthy = 'yes';
};

Fruit.prototype = {
  cutInPieces: function() {
    return Math.floor(Math.random()*11);
  }
};

var redFruit = new Fruit('red');

redFruit.color;
// 'red'
redFruit.healthy;
// 'yes'
redFruit.cutInPieces();
// 5

var stubedRedFruit = smoking(redFruit, { healthy: 'a bit' });

stubbedRedFruit.healthy;
// 'a bit'
stubbedRedFruit.color;
// 'red'
stubbedRedFruit.cutInPieces();
// 2
redFruit.healthy;
// 'yes'
// You get the point
```

### Another

```javascript
var uberChangedFruit = smoking(redFruit, {
  color: 'blue',
  cutInPieces: function() {
    return 7;
  }
});

uberChangedFruit.color;
// 'blue'
uberChangedFruit.cutInPieces();
// 7
uberChangedFruit.healthy;
// 'yes'
```

## Name
It's a [foca](http://github.com/foca)'s idea :D.
