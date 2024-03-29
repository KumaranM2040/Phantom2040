const assert = require("assert");

describe("About Objects (topics/08_about_objects.js)", function() {
  it("object type", function() {
    const empty_object = {};
    assert.equal("object", typeof empty_object, "what is the type of an object?");
  });

  it("object literal notation", function() {
    let person = {
      name: "Amory Blaine",
      age: 102
    };
    assert.equal("Amory Blaine", person.name, "what is the person's name?");
    assert.equal(102, person.age, "what is the person's age?");
  });

  it("dynamically adding properties", function() {
    const person = {};
    person.name = "Amory Blaine";
    person.age = 102;
    assert.equal("Amory Blaine", person.name, "what is the person's name?");
    assert.equal(102, person.age, "what is the person's age?");
  });

  it("adding properties from strings", function() {
    const person = {};
    person["name"] = "Amory Blaine";
    person["age"] = 102;
    assert.equal("Amory Blaine", person.name, "what is the person's name?");
    assert.equal(102, person.age, "what is the person's age?");
  });

  it("adding functions", function() {
    const person = {
      name: "Amory Blaine",
      age: 102,
      toString: function() {
        return `I ${this.name} am ${this.age} years old.`; // HINT: use the 'this' keyword to refer to the person object.
      }
    };
    assert.equal(
      "I Amory Blaine am 102 years old.",
      person.toString(),
      "what should the toString function be?"
    );
  });
});
