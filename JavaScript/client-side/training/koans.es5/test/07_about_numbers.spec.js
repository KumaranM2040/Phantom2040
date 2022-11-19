const assert = require("assert");

describe("About Numbers (topics/07_about_numbers.js)", function() {
  it("types", function() {
    let typeOfIntegers = typeof 6;
    let typeOfFloats = typeof 3.14159;
    assert.equal(
      true,
      typeOfIntegers === typeOfFloats,
      "are ints and floats the same type?"
    );
    assert.equal("number", typeOfIntegers, "what is the javascript numeric type?");
    assert.equal(1, 1.0, "what is a integer number equivalent to 1.0?");
  });

  it("NaN", function() {
    let resultOfFailedOperations = 7 / "apple";
    assert.equal(
      true,
      isNaN(resultOfFailedOperations),
      "what will satisfy the equals assertion?"
    );
    assert.equal(false, resultOfFailedOperations == NaN, "is NaN == NaN?");
  });
  
  it("integers vs floats", function() {
    assert.equal(true, 1 === 1.0, "are 1 and 1.0 equal?");
  });

  it("has exponents", function() {
    assert.equal(10000, 1e4, "what does 1e4 equal?");
    assert.equal(100000, 1E5, "what does 1E5 equal?");
  });

  it("has binary form", function() {
    assert.equal(2, 0b10, "what does 0b10 equal?");
  });

  it("has hexadecimal form", function() {
    assert.equal(16, 0x10, "what does 0x10 equal?");
  });

  it("beware the octal form", function() {
    assert.equal(8, 0o10, "what does 0o10 equal?");
    // Note that 0o10 === 010! 
    // 'use strict' prevents this alternate form to avoid confusion
  });

  it("has floating point issues!", function() {
    assert.equal(3, 1 + 2, "what does 1 + 2 equal?");
    assert.equal(0.3, +(0.1 + 0.2).toFixed(3)); // what does 0.1 + 0.2 equal?
  });
});
