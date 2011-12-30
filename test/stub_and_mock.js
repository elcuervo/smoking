if(typeof module != 'undefined') {
  var scenario = require('gerbil').scenario;
  var smoking = require('../lib/smoking');
}

scenario("Smoking - stub methods and attributes", {
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

  'stub a given methods': function(g) {
    var stub = smoking(this.object, { whichDay: function() { return 'tomorrow' } });

    g.assertEqual(stub.whichDay(), 'tomorrow');
    g.assertEqual(stub.someThing(), 'potato');

    g.assertEqual(this.object.whichDay(), 'today');
    g.assertEqual(this.object.someThing(), 'potato');
  },

  'stub a set of methods at once': function(g) {
    var stub = smoking(this.object, {
      whichDay: function() { return 'someday'; },
      someThing: function() { return 'tomato'; },
      answer: function() { return 41; }
    });

    g.assertEqual(stub.whichDay(), 'someday');
    g.assertEqual(stub.someThing(), 'tomato');

    g.assertEqual(this.object.whichDay(), 'today');
    g.assertEqual(this.object.someThing(), 'potato');
  },

  'stub attributes as well': function(g) {
    var stub = smoking(this.object, { answer: 42 });

    g.assertEqual(stub.answer, 42);
    g.assertEqual(this.object.answer, 21);
  }
});

scenario("Smoking - mock methods calls", {
  'before': function() {
    var Thing = function() {
      this.day = 'today';
      this.answer = 21;
    };
    Thing.prototype = {
      whichDay: function(day, another) {
        if(typeof day == 'string') this.day = day;
        return this.day;
      },
      someThing: function() { return 'potato'; }
    };
    this.object = new Thing;
  },

  'should return true if the mocking was successfull': function(g) {
    var mockedObject = smoking(this.object).expects({ whichDay: 1});
    mockedObject.whichDay("nowdays");

    g.assertEqual(mockedObject.day, "nowdays");
    g.assert(smoking(mockedObject).verify());
  },

  'should have a shorthand for common uses': function(g) {
    var mockedObject = smoking(this.object).expects('whichDay');
    mockedObject.whichDay("nowdays");

    g.assertEqual(mockedObject.day, "nowdays");
    g.assert(smoking(mockedObject).verify());
  },

  'should raise an error if the mocking failed': function(g) {
    var mockedObject = smoking(this.object).expects({ someThing: 1});
    mockedObject.whichDay("nowdays");

    g.assertThrow(RangeError, function() {
      smoking(mockedObject).verify();
    });
  },

  'should raise an error if trying to verify an object without mocks': function(g) {
    g.assertThrow(Error, function() {
      smoking(this.object).verify();
    });
  }
});
