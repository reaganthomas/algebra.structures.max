(function() {
  var deepEqual = require('deep-equal');
  var Constructor = require('algebra.structures.constructor').Constructor;

  function inspect(x) {
    if(x === null || x === undefined) return 'null';
    return x.inspect ? x.inspect() : x;
  }

  /**
    Max

    Max is a Monoid, making it also a Semigroup.
    Max implements the empty and concat methods to adhere
    to the Monoid and Semigroup algebras.

    Max only works for numbers and arrays of numbers. Should
    any other values be used the behavior is unspecified.
  **/
  var Max = Constructor(function(value) {
    if(value instanceof Array) {
      this.value = value.reduce(function(acc, val) {
        return (acc > val) ? acc : val;
      }, Number.MIN_VALUE);
    } else {
      this.value = value;
    }
  });

  /**
    Max.empty

    Returns an "empty max", otherwise known as Number.MIN_VALUE.
  **/
  Max.prototype.empty = function() { return Max(Number.MIN_VALUE); };

  /**
    Max.concat

    Returns the greater of the two Max structures.
  **/
  Max.prototype.concat = function(max2) {
    return Max(this.value > max2.value) ? this.value : max2.value;
  };

  /**
    Max.inspect

    Returns the string representation of a Max.
  **/
  Max.prototype.inspect = function() { return 'Max(' + inspect(this.value) + ')'; };

  /**
    Max.isEqual

    Compares tow maxes for equality.
  **/
  Max.prototype.isEqual = function(max2) { return deepEqual(this.value, max2.value); };

  module.exports = Max;
})();
