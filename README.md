# SMock
Simple Mock for javascript
Straight forward and no hussle object mocking.

## Example

```javascript
var Fruit = function(color) {
  this.color = color;
  this.healthy = function(){ return 'yes'; };
};

Fruit.prototype = {
  cutInPieces: function() {
    return Math.floor(Math.random()*11);
  }
};

var redFruit = new Fruit('red');

redFruit.color;
// 'red'
redFruit.healthy();
// 'yes'
redFruit.cutInPieces();
// 5

var mockedRedFruit = smock(redFruit).with('healthy', 'a bit');
mockedRedFruit.healthy();
// 'a bit'
mockedRedFruit.color;
// 'red'
mockedRedFruit.cutInPieces;
// 2
redFruit.healthy();
// 'yes'
// You get the point
```

```javascript
var uberChangedFruit = smock(redFruit).with({
  color: 'blue',
  cutInPieces: function() {
    return 7;
  }
});

uberChangedFruit.color;
// 'blue'
uberChangedFruit.cutInPieces();
// 7
uberChangedFruit.healthy();
// 'yes'
```
