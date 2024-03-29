const assert = require("assert");

describe.skip("About Scope (topics/15_about_scope.js)", function() {
  window.thisIsAGlobalVariable = 77;

  it("global variables", function() {
    assert.equal(
      __,
      thisIsAGlobalVariable,
      "is thisIsAGlobalVariable defined in this scope?"
    );
  });

  it("variables declared inside of a function", function() {
    const outerVariable = "outer";

    // this is a self-invoking function. Notice that it calls itself at the end ().
    (function() {
      const innerVariable = "inner";
      assert.equal(
        __,
        outerVariable,
        "is outerVariable defined in this scope?"
      );
      assert.equal(
        __,
        innerVariable,
        "is innerVariable defined in this scope?"
      );
    })();

    assert.equal(__, outerVariable, "is outerVariable defined in this scope?");
    assert.equal(
      __,
      typeof innerVariable,
      "is innerVariable defined in this scope?"
    );
  });

  it("global variables declared inside of a function", function() {
    // this is a self-invoking function. Notice that it calls itself at the end ().
    (function() {
      innerVariable = "inner";
      assert.equal(
        __,
        typeof innerVariable,
        "is innerVariable defined in this scope?"
      );
    })();

    assert.equal(
      __,
      typeof innerVariable,
      "is innerVariable defined in this scope?"
    );
  });
});
