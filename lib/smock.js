var Smock = function(object) {
  this.extend = function(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  };

  this.clone = function(object) {
    return this.extend({}, object);
  };

  this.mockMethod = function(name, response) {
    var mockedObject = new Object;
    mockedObject[name] = typeof this.object[name] == 'function' ? function() { return response; } : response;
    return this.extend(this.object, mockedObject);
  };

  this.object = this.clone(object);

  return this;
};

Smock.prototype = {
  with: function() {
    var mainArgument = arguments[0];
    if(typeof mainArgument == 'object' ) {
      for(var arg in mainArgument) {
        this.mockMethod(arg, mainArgument[arg]);
      }
    } else {
      this.mockMethod(mainArgument, arguments[1]);
    };
    return this.object;
  }
};

var smock = function(obj) { return new Smock(obj) };

if(typeof module != 'undefined') module.exports = smock;
