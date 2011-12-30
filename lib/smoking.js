var Smoking = function(object, stubs) {
  this.stubs = stubs;
  this.extend = function(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  };

  this.clone = function(object) { return this.extend({}, object); };

  this.stub = function() {
    var stubbedObject = new Object;
    for(var arg in this.stubs) stubbedObject[arg] = this.stubs[arg];
    this.extend(this.object, stubbedObject);
    return this.object;
  };

  this.object = this.clone(object);
  return this.stubs!= 'undefined' ? this.stub() : this;
};

var smoking = function(obj, stubs) { return new Smoking(obj, stubs); };

if(typeof module != 'undefined') module.exports = smoking;
