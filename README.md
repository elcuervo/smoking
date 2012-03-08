# Smoking
Simple Mocks and Stubs for javascript.

[![Build Status](https://secure.travis-ci.org/elcuervo/smoking.png?branch=master)](http://travis-ci.org/elcuervo/smoking)

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

var stubbedRedFruit = smoking(redFruit, { healthy: 'a bit' });

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

## Mocking

You can easily verify the call of methods.

```javascript
var mockFruit = smoking(redFruit).expects({ cutInPieces: 1 });
mockFruit.cutInPieces();
smoking(mockFruit).verify();
```

Or with a shorthand if it's just one method and needs to be called once

```javascript
var mockFruit = smoking(redFruit).expects('cutInPieces');
smoking(mockFruit).verify();
```

The prior example will fail with a RangeError because the 'cutInPieces' methods
does not get called.

## Name
It's a [foca](http://github.com/foca)'s idea :D.
