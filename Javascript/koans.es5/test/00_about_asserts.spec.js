const assert = require('assert');

describe('About Asserts (topics/00_about_asserts.js)', function() {
  it('check what ok means', function() {
    assert(true === true, 'what will satisfy the ok assertion?');
  });

  it('not ok', function() {
    assert(false === false, 'what is a false value?');
  });

  describe('test Equal', () => {
    it('equal', function() {
      assert.equal(2, 1 + 1, 'what will satisfy the equal assertion?');
    });
  });
});
