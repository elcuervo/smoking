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

  this.intercept = function(method, interceptFn) {
    var originalFn = this.object[method];
    if(typeof originalFn == 'function') {
      this.object[method] = function() {
        interceptFn();
        var args = Array.prototype.slice.call(arguments);
        originalFn.apply(this, args);
      };
    }
  },

  this.object = this.clone(object);
  return typeof this.stubs != 'undefined' ? this.stub() : this;
};

Smoking.prototype = {
  expects: function(callExpectations) {
    if(typeof callExpectations == 'string') callExpectations = new Object()[callExpectations] = 1;
    this.extend(this.object, { ___smoking_call_expectations: callExpectations });
    for(var arg in callExpectations) {
      if(!this.object[arg] || typeof this.object[arg] != 'function') return;
      var self = this;
      this.intercept(arg, function() { self.object.___smoking_call_expectations[arg]--; });
    };
    return this.object;
  },

  verify: function() {
    if(!this.object.___smoking_call_expectations) throw new Error("No mocks defined");
    var expectations = this.object.___smoking_call_expectations;
    for(var arg in expectations)
      if(expectations[arg] !== 0) throw new RangeError(arg + " needs to be called " + expectations[arg] + " times");
    delete this.object.___smoking_call_expectations;
    return true;
  }

}

var smoking = function(obj, stubs) { return new Smoking(obj, stubs); };

if(typeof module != 'undefined') module.exports = smoking;
