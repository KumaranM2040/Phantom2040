const assert = require('assert');

describe("About Assignment (topics/04_about_assignment.js)", function() {
  it("local variables", function() {
      const temp = 1;
      assert.equal(temp, 1, "Assign a value to the variable temp");
  });

  it("global variables", function() {
      window.temp = 1; // Not using var is an example. Always use let/const in practise.
      assert.equal(window.temp, temp, 'global variables are assigned to the window object');
  });
});