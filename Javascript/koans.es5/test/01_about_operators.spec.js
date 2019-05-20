const assert = require('assert');

describe("About Operators (topics/01_about_operators.js)", function () {

  it("addition", function () {
    let result = 0;
    //starting i at 0, add i to result and increment i by 1 until i is equal to 5
    for (let i = 0; i <= 5; i++) {
      result = result + i;
    }
    assert.equal(15, result, "What is the value of result?");
  });

  it("assignment addition", function () {
    let result = 0;
    for (let i = 0; i <= 5; i++) {
      //the code below is just like saying result = result + i; but is more concise
      result += i;
    }
    assert.equal(15, result, "What is the value of result?");
  });

  it("subtraction", function () {
    let result = 5;
    for (let i = 0; i <= 2; i++) {
      result = result - i;
    }
    assert.equal(2, result, "What is the value of result?");
  });

  it("assignment subtraction", function () {
    let result = 5;
    for (let i = 0; i <= 2; i++) {
      result -= i;
    }
    assert.equal(2, result, "What is the value of result?");
  });

  //Assignment operators are available for multiplication and division as well
  //let's do one more, the modulo operator, used for showing division remainder

  it("modulus", function () {
    let result = 10;
    let x = 5;
    //again this is exactly the same as result = result % x
    result %= x;
    assert.equal(0, result, "What is the value of result?");
  });
});