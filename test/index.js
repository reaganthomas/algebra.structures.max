var assert = require('assert');
var laws = require('algebra.laws');
var Max = require('../lib');

function makeMax(a)     { return new Max(a); }
function makeListMax(a) { return new Max([a]); }

describe('Max', function() {
  describe('Semigroup', function() {
    it('1. Associativity', function() { laws.semigroup.associativity(makeListMax).asTest()(); });
  });

  describe('Monoid', function() {
    it('1. Left Identity',  function() { laws.monoid.leftIdentity(makeMax).asTest()(); });
    it('2. Right Identity', function() { laws.monoid.rightIdentity(makeMax).asTest()(); });
  });

  describe('empty', function() {
    it('should create a Max(Number.MIN_VALUE)', function() {
      var max = makeMax(-Infinity);
      var max2 = max.empty();
      assert.equal(max2.inspect(), max.inspect());
    });
  });

  describe('concat', function() {
    it('should concat maxes containing arrays', function() {
      var max = makeMax([-20, 0, 20]);
      var max2 = makeMax([-42, 0, 42]);
      assert.equal(max.concat(max2).inspect(), 'Max(42)');
    });

    it('should add maxes containing single values', function() {
      var max = makeMax(13);
      var max2 = makeMax(-2);
      assert.equal(max.concat(max2).inspect(), 'Max(13)');
    });
  });

  describe('inspect', function() {
    it('should show value of number', function() {
      var max = makeMax(1);
      assert.equal(max.inspect(), 'Max(1)');
    });

    it('should show value of maxed array', function() {
      var max = makeMax([1,2,3]);
      assert.equal(max.inspect(), 'Max(3)');
    });
  });

  describe('isEqual', function() {
    it('should be true when maxes are equal', function() {
      var max = makeMax(1);
      var max2 = makeMax(1);
      assert.equal(max.isEqual(max2), true);
    });

    it('should be false when maxes are different', function() {
      var max = makeMax(10);
      var max2 = makeMax(11);
      assert.equal(max.isEqual(max2), false);
    });

    it('should be true for arrays with equal maxes', function() {
      var max = makeMax([1,5,10]);
      var max2 = makeMax([1,10,5]);
      assert.equal(max.isEqual(max2), true);
    });

    it('should be true for equal array max and value', function() {
      var max = makeMax([1,2,3]);
      var max2 = makeMax(3);
      assert.equal(max.isEqual(max2), true);
    });
  });
});
