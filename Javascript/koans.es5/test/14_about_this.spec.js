const assert = require("assert");

describe.skip("About this (topics/14_about_this.js)", function() {
  it("'this' inside a method", function() {
    const person = {
      name: "bob",
      intro: function() {
        return "Hello, my name is " + this.__;
      }
    };
    assert.equal(
      person.intro(),
      "Hello, my name is bob",
      "If an object has a method can you access properties inside it?"
    );
  });

  it("'this' on unattached function", function() {
    const person = {
      globalName: "bob",
      intro: function() {
        return "Hello, my name is " + this.globalName;
      }
    };

    const alias = person.intro;

    // if the function is not called as an object property 'this' is the global context
    // (window in a browser). This is an example. Please do not do this in practise.
    window.__ = "Peter";
    assert.equal(
      alias(),
      "Hello, my name is Peter",
      "What does 'this' refer to when it is not part of an object?"
    );
  });

  it("'this' set explicitly", function() {
    const person = {
      name: "bob",
      intro: function() {
        return "Hello, my name is " + this.name;
      }
    };

    // calling a function with 'call' lets us assign 'this' explicitly
    const message = person.intro.call({ __: "Frank" });
    assert.equal(
      message,
      "Hello, my name is Frank",
      "What does 'this' refer to when you use the 'call()' method?"
    );
  });

  // extra credit: underscore.js has a 'bind' function https://lodash.com/docs/4.16.6#bind
  // read the source and see how it is implemented
});
