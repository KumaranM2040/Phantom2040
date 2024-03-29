const assert = require("assert");

describe("About Control Structures (topics/05_about_control_structures.js)", function() {
  it("if", function() {
    let isPositive = false;
    if (2 > 0) {
      isPositive = true;
    }
    assert.equal(true, isPositive, "what is the value of isPositive?");
  });

  it("for", function() {
    let counter = 10;
    for (let i = 1; i <= 3; i++) {
      counter = counter + i;
    }
    assert.equal(16, counter, "what is the value of counter?");
  });

  it("for in", function() {
    // this syntax will be explained in about objects
    const person = {
      name: "Amory Blaine",
      age: 102
    };
    let result = "";
    // for in enumerates the property names of an object
    for (let property_name in person) {
      result = result + property_name;
    }
    assert.equal('nameage', result, "what is the value of result?");
  });

  it("ternary operator", function() {
    let fruit = true ? "apple" : "orange";
    assert.equal('apple', fruit, "what is the value of fruit?");

    fruit = false ? "apple" : "orange";
    assert.equal('orange', fruit, "now what is the value of fruit?");
  });

  it("switch", function() {
    let result = 0;
    switch (2) {
      case 1:
        result = 1;
        break;
      case 1 + 1:
        result = 2;
        break;
    }
    assert.equal(2, result, "what is the value of result?");
  });

  it("switch default case", function() {
    let result = "Pippin";
    switch ("m") {
      case "f":
        result = "Frodo";
        break;
      case "s":
        result = "Samwise";
        break;
      default:
        result = "Merry";
        break;
    }
    assert.equal('Merry', result, "what is the value of result?");
  });

  it("null coalescing", function() {
    const result = null || "a value";
    assert.equal("a value", result, "what is the value of result?");
  });
});
