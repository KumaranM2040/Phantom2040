const assert = require("assert");

describe("About Strings (topics/06_about_strings.js)", function() {
  it("delimiters", function() {
    const singleQuotedString = "apple";
    const doubleQuotedString = "apple";
    assert.equal(
      true,
      singleQuotedString === doubleQuotedString,
      "are the two strings equal?"
    );
  });

  it("concatenation", function() {
    const fruit = "apple";
    const dish = "pie";
    assert.equal(
      'apple pie',
      fruit + " " + dish,
      'what is the value of fruit + " " + dish?'
    );
  });

  it("character Type", function() {
    const characterType = typeof "Amory".charAt(1); // typeof will be explained in about reflection
    assert.equal("string", characterType, "Javascript has no character type");
  });

  it("escape character", function() {
    const stringWithAnEscapedCharacter = "\u0041pple";
    assert.equal(
      "Apple",
      stringWithAnEscapedCharacter,
      "what  is the value of stringWithAnEscapedCharacter?"
    );
  });

  it("string.length", function() {
    const fruit = "apple";
    assert.equal(5, fruit.length, "what is the value of fruit.length?");
  });

  it("slice", function() {
    const fruit = "apple pie";
    assert.equal(
      'apple',
      fruit.slice(0, 5),
      "what is the value of fruit.slice(0,5)?"
    );
  });
});
