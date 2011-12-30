if(typeof module != 'undefined') {
  var scenario = require('gerbil').scenario;
  var smock = require('../lib/smock');
}

scenario("Smock - mocking methods and attributes", {
  'before': function() {
    var Thing = function() {
      this.day = 'today';
      this.answer = 21;
    };
    Thing.prototype = {
      whichDay: function() {
        return this.day;
      },
      someThing: function() { return 'potato'; }
    };
    this.object = new Thing;
  },

  'mock a given methods': function(g) {
    var mock = smock(this.object, { whichDay: function() { return 'tomorrow' } });

    g.assertEqual(mock.whichDay(), 'tomorrow');
    g.assertEqual(mock.someThing(), 'potato');

    g.assertEqual(this.object.whichDay(), 'today');
    g.assertEqual(this.object.someThing(), 'potato');
  },

  'mock a set of methods at once': function(g) {
    var mock = smock(this.object, {
      whichDay: function() { return 'someday'; },
      someThing: function() { return 'tomato'; },
      answer: function() { return 41; }
    });

    g.assertEqual(mock.whichDay(), 'someday');
    g.assertEqual(mock.someThing(), 'tomato');

    g.assertEqual(this.object.whichDay(), 'today');
    g.assertEqual(this.object.someThing(), 'potato');
  },

  'mock attributes as well': function(g) {
    var mock = smock(this.object, { answer: 42 });

    g.assertEqual(mock.answer, 42);
    g.assertEqual(this.object.answer, 21);
  }
});
