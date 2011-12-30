var Smock = function(object, mocks) {
  this.mocks = mocks;
  this.extend = function(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  };

  this.clone = function(object) { return this.extend({}, object); };

  this.mock = function() {
    var mockedObject = new Object;
    for(var arg in this.mocks) mockedObject[arg] = this.mocks[arg];
    this.extend(this.object, mockedObject);
    return this.object;
  };

  this.object = this.clone(object);
  return this.mock();
};

var smock = function(obj, mocks) { return new Smock(obj, mocks); };

if(typeof module != 'undefined') module.exports = smock;
