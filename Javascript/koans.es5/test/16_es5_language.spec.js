const assert = require("assert");

describe.skip("The Javascript Language [ES5] (topics/16_es5_language.js)", function () {

  describe("has different types and operators", function () {
    it("considers numbers to be equal to their string representation", function () {
      assert.equal(__, 1 == "1", `true/false: 1 == "1"`);
      assert.equal(__, 1 != "1", `true/false: 1 != "1"`);
    });

    it("knows that numbers and strings are not exactly the same", function () {
      assert.equal(__, 1 === "1", `true/false: 1 === "1"`);
      assert.equal(__, 1 !== "1", `true/false: 1 !== "1"`);
    });

    it("joins parts as string when using the plus operator", function () {
      assert.equal(__, 1 + "a");
    });

    it("operates integers before joining the string", function () {
      assert.equal(__, 1 + 1 + "2");
    });

    it("knows the type of the variable", function () {
      var x = 1;

      assert.equal(__, typeof (x));
    });

    it("surprises me, NaN is not comparable with NaN", function () {
      assert.equal(__, 5 / "a" == 5 / "a", "Is NaN equal to NaN?");
      assert.equal(__, typeof (NaN), "What is the type of NaN?");
      assert.equal(__, isNaN(5 / "a"), `true/false: isNaN(5 / "a")`);
    });

    it("considers an empty string to be falsy", function () {
      assert.equal(__, "" == false, 'true or false?');
      assert.equal(__, "" === false, 'true or false?');
    });

    it("considers zero to be falsy", function () {
      assert.equal(__, 0 == false, 'true or false?');
      assert.equal(__, 0 === false, 'true or false?');
    });

    it("considers nulls to be falsy", function () {
      var x = null;
      var result;

      if (x) {
        result = true;
      } else {
        result = false;
      }

      assert.equal(__, result == false, 'true or false?');
      assert.equal(__, null === false, 'true or false?');
      assert.equal(__, null == false, 'true or false?');
    });

    it("knows the type of a function", function () {
      function x() { }

      assert.equal(__, typeof (x), "What is the type of a function?");
    });

    it("has arrays and they can contain anything inside", function () {
      var arr = [1, 2, 3, 4];
      arr.push(5);
      arr[9] = 6;
      var matrix = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 7, 8]];

      assert.equal(__, arr[1], "What is the item arr[1]?");
      assert.equal(__, arr[4], "What is the item arr[4]?");
      assert.equal(__, arr[6], "What is the item arr[6]?");
      assert.equal(__, arr[9], "What is the item arr[9]?");
      assert.equal(__, matrix[0][2], "What is the item matrix[0][2]?");
    });

    it("may contain functions inside arrays", function () {
      var arr = [1, 2, function (arg) { return 3 + arg; }];

      assert.equal(__, arr[2](1));
    });

    it("concatenate arrays - well, kind of", function () {
      var a = [1, 2, 3];
      var b = [4, 5, 6];

      assert.equal(__, a + b);
    });

    it("joins arrays and strings", function () {
      var a = [1, 2, 3];

      assert.equal(__, "1" + a);
      assert.equal(__, a + "1");
    });

    it("joins arrays and other things", function () {
      var a = [1, 2, 3];
      var b = ['x', 'y', 'z'];

      assert.equal(__, 1 + a);
      assert.equal(__, a + 1);
      assert.equal(__, 1 + b);
      assert.equal(__, true + a);
    });

    it("can't compare arrays", function () {
      var a = [1, 2, 3];
      var b = [1, 2, 3];

      assert.equal(__, a == b, 'true or false?');
      assert.equal(__, a === b, 'true or false?');
    });

    it("is not the same to compare by value than by reference ", function () {
      var a = [1, 2, 3];
      var b = [1, 2, 3];

      assert.equal(__, a == b);
      assert.equal(__, a === b);
    });
  });


  describe("considers functions as first class citizens", function () {
    it("can declare named functions", function () {
      function example() {
        return 'some example';
      }

      assert.equal(__, example());
    });

    it("can declare anonymous functions", function () {
      var someVar = function (a, b) {
        return a + b;
      };

      assert(typeof (someVar) === __, `What is typeof(someVar)?`);
      assert(someVar(1, 1) === __, `What is someVar(1,1)?`);
    });

    it("may return anything", function () {
      function example(arg) {
        return [arg, arg * 2, arg * 3];
      }

      var result = example(2);

      assert.equal(__, result[1]);
    });

    it("may return arrays that contains functions and so on", function () {
      function example() {
        // write the missing code here
      }

      assert.equal(10, example()[0](1)[1]);
    });

    it("doesn't care about the declaration order when they are named", function () {
      function exampleA() {
        return exampleB(1);
      }

      assert.equal(__, exampleA());

      function exampleB(arg1) {
        return arg1;
      }
    });

    it("matters, the declaration order when they are anonymous", function () {
      var exampleA = function () {
        return exampleB(1);
      };

      assert.equal(exampleA()).toEqual(1);

      var exampleB = function (arg1) {
        return arg1;
      };
    });

    it("can use optional parameters", function () {
      function example(a, b, c) {
        if (c) {
          return a + b + c;
        }
        return a + b;
      }

      assert(example(1, 1, 1) === __, `What is example(1,1,1)?`);
      assert(example(1, 1) === __, `What is example(1,1)?`);
    });

    it("anonymous functions are anonymous", function () {
      var x = function z() {
        return 1;
      };
      assert.equal(__, typeof (z));
      assert.equal(__, x());
    });

    it("can create closures with free variables", function () {
      function external() {
        var a = 1;

        function internal() {
          return a + 1;
        }

        return internal();
      }

      assert(external() === __, `What is external()?`);
    });

    it("can create closures with several free variables", function () {
      function external() {
        var a = 1, b = 2;

        function internal() {
          var c = 3;
          return a + b + c;
        }
      }

      assert.equal(__, external());
    });

    it("defines a pure function when there are no free variables", function () {
      function external() {
        var a = 1, b = 2;

        function internal(a, b) {
          var c = 1;
          return a + b + c;
        }

        return internal(4, 4);
      }

      assert(external() === __, `What is external()?`);
    });

    it("captures variables in the closure as opposed to the value", function () {

      let a = 1;

      function theFunc() {
        return a;
      }

      a = 2;

      assert.equal(__, theFunc());
    });

    it("may return arrays that contains closures and so on", function () {
      function example() {
        // write the missing code here
      }

      assert.equal(10, example()[0](1)[1]);
      assert.equal(11, example()[0](2)[1]);
      assert.equal(12, example()[0](3)[1]);
    });

    it("passes primitive types as values (a copy) to functions", function () {
      function example(arg) {
        arg = "test!";
      }

      var x = 1;
      var y = "example";
      var z = true;

      example(x);
      assert.equal(__, x);

      example(y);
      assert.equal(__, y);

      example(z);
      assert.equal(__, z);
    });

    it("passes arrays by reference", function () {
      function example(arg) {
        arg[0] = 100;
      }

      var x = [1, 2, 3];

      example(x);
      assert.equal(__, x);
    });

    it("passes objects by reference", function () {
      function example(arg) {
        arg.property = 'test';
      }

      var x = { property: 'cool!' };

      example(x);
      assert.equal(__, x);
    });

    it("may return a function as the result of invoking a function", function () {
      function add(a, b) {
        return a + b;
      }

      function example() {
        return add;
      }

      assert.equal(__, example()(1, 2));
      var f = example();
      assert.equal(__, f(2, 2));
    });

    it("can return closures as a function result", function () {
      function plus(amount) {
        return function (number) {
          return number + amount;
        };
      }

      var f = plus(5);

      assert(f(3) === __, `What is f(3)?`);
    });

    it("can have functions that receive other functions as arguments", function () {
      function add(a, b) {
        return a + b;
      }

      function example(arg) {
        return arg(2, 2) + 1;
      }

      assert.equal(__, example(add));
    });

    it("may have functions as the input and the output", function () {
      function plus(originalFunction) {
        return function (arg1) {
          return originalFunction() + arg1;
        };
      }

      var f = plus(function () { return 1; });

      assert(f(2) === __, `What is f(2)?`);
    });

    it("can invoke functions indirectly using the special 'call'", function () {
      function f(a, b) {
        return a + b;
      }

      assert.equal(__, f.call(f, 1, 1));
    });

    it("can invoke functions indirectly using the special 'apply'", function () {
      function f(a, b) {
        return a + b;
      }

      assert.equal(__, f.apply(f, [1, 1]));
    });

    it("doesnt have a private scope inside blocks", function () {
      var j = 0;
      for (var i = 0; i < 5; i++) {
        j += i;
      }

      assert.equal(__, i);
      assert.equal(__, j);
    });
  });

  describe("has multiple ways to define and create objects", function () {
    it("can define object literals", function () {
      var obj = {
        name: 'bob',
        theName: function () {
          return this.name;
        }
      };

      assert(obj.theName() === __, `What is obj.theName()?`);
    });

    it("can create properties dynamically", function () {
      var obj = {
        name: 'bob',
        surname: 'sponge'
      };
      obj.address = 'palm tree';

      assert.equal(__, obj.address);
      assert.equal(__, obj['address']);
      assert.equal(__, obj['name']);
    });

    it("may define complex objects", function () {
      var user = __;
      // write the contents of the user object to make the satisfy the expectations:

      assert.equal(user.address.street).toEqual('sesame');
      assert.equal(user.friends[0].name).toEqual('triki');
    });

    it("has a pattern called, the Module Pattern", function () {
      function createObject() {
        var points = 0;

        return {
          addPoint: function () { ++points; },
          score: function () { return points; }
        };
      }

      var obj = createObject();
      obj.addPoint();

      assert.equal(__, obj.score());
      assert.equal(__, typeof(obj.points));
    });

    it("may create objects also with the module pattern", function () {
      function createObject(initialScore) {
        // write the code here
      }
      
      var obj = createObject(5, 'red');
      obj.incrementScoreIn(5);
      assert.equal(obj.color).toEqual('red');
      assert.equal(obj.points()).toEqual(10);      
    });

    it("can define constructors", function () {
      function Obj() {
        var name = 'bob';

        this.theName = function () {
          return name;
        };
      }

      var obj = new Obj();
      assert(obj.theName() === __, `What is obj.theName()?`);
    });

    it("may contain 'static' methods", function () {
      function Obj() {
        var name = 'bob';

        this.theName = function () {
          return name;
        };
      }

      Obj.someStaticMethod = function () {
        return 22;
      };

      assert(Obj.someStaticMethod() === __, `What is Obj.someStaticMethod()?`);
    });

    it("can have have methods in the prototype", function () {
      function Obj() {
        var name = 'bob';
      }

      Obj.prototype.theName = function () {
        return this.name;
      };

      var obj = new Obj();
      assert.equal(__, obj.theName());
      assert.equal(obj.theName).toBe(new Obj().theName);
    });

    it("can define a factory", function () {
      function obj() {
        var self = {};
        var name = 'bob';

        self.theName = function () {
          return name;
        };

        return self;
      }

      var instance = obj();
      assert(instance.theName() === __, `What is instance.theName()?`);
      assert.equal(__, instance.theName !== obj().theName);
    });

    it("can create methods dynamically on an object instance", function () {
      var obj = {};
      var methodNames = ['meow', 'jump'];

      for (var i = 0; i < methodNames.length; i++) {
        obj[[methodNames[i]]] = function () { return 'it works'; };
      }

      assert.equal(__, obj.meow());
    });

    describe("the polymorphism", function () {
      it("may use constructor plus prototype", function () {
        function Parent() {
          this.name = 'parent';
        }
        Parent.prototype.someMethod = function () {
          return 10;
        };

        function Child() {
          Parent.call(this); // constructor stealing
          this.name = 'child';
        }
        Child.prototype = Object.create(Parent.prototype); // prototype chaining

        var child = new Child();
        assert.equal(__, child.someMethod());
        assert.equal(__, child.name);
      });

      it("may use the functional inheritance", function () {
        function parent() {
          var name = 'parent';
          var self = {};
          self.someMethod = function () {
            return 10;
          };
          return self;
        }

        function child() {
          var name = 'child';
          var self = parent();
          return self;
        }

        var instance = child();
        assert(instance.someMethod() === __, `What is instance.someMethod()?`);
      });

    });
  });

  describe("common patterns with functions and behaviors", function () {
    it("can invoke functions immediately to take advantage of scopes", function () {
      var myNamespace = {};

      (function (theNamespace) {
        var counter = 0;

        theNamespace.addOne = function () {
          counter++;
        };

        theNamespace.giveMeTheCount = function () {
          return counter;
        };

      }(myNamespace));

      myNamespace.addOne();
      myNamespace.addOne();

      assert(myNamespace.giveMeTheCount() === __, `What is myNamespace.giveMeTheCount()?`);
    });

    it("hoists 'var' variables the way you probably dont expect", function () {
      function generate() {
        var functions = [];
        for (var i = 0; i < 5; i++) {
          functions.push(function () {
            return i;
          });
        }
        return functions;
      }

      assert.equal(__, generate()[0]());
      assert.equal(__, generate()[1]());
    });
  });

  context("has ways to simulate classes", function () {
    // "Class"
    function Cat() {
      this.kilos = 1;
      this.feed = function () {
        this.kilos++;
      };
      this.isPurring = function () {
        return true;
      };
    }

    //////////////////////////////////////
    // "Class"
    //////////////////////////////////////
    function Lion(energy) {
      Cat.call(this);
      this.energy = energy || 100;
      var self = this;

      var run = function () { // private method
        self.energy -= 10;
      };
      var attack = function () { // private method
        self.energy -= 5;
      };
      this.playWithFriend = function (friend) {
        if (friend.isPurring())
          self.energy += 10;
      };
      this.hunt = function () { // public method
        run();
        attack();
        this.onHunting(); // fire event
      };
      this.onHunting = function () { /* event */ };
    }

    context("and the THIS keyword", function () {
      var cat;

      beforeEach(function () {
        cat = new Cat();
        window.kilos = 0;
      });

      it("sometimes works as expected in other languages", function () {
        cat.feed();
        cat.feed();

        assert.equal(__, cat.kilos);
      });

      it("works different on dettached functions", function () {
        window.kilos = 10;
        var feed = cat.feed;

        feed();

        assert.equal(__, window.kilos);
        assert.equal(__, cat.kilos);
      });

      it("can be bound explicitly with CALL and APPLY", function () {
        var feed = cat.feed;
        feed.apply(cat);

        assert.equal(__, cat.kilos);
      });

      it("can be bound in modern browsers with BIND", function () {
        var feed = cat.feed;
        var bound = feed.bind(cat);

        bound();

        assert.equal(__, cat.kilos);
      });

      it("works when function is attached to a similar object", function () {
        var otherCat = { kilos: 10 };
        otherCat.feed = cat.feed;

        otherCat.feed();
        assert.equal(__, otherCat.kilos);
        assert.equal(__, cat.kilos);
      });

      it("can be handled using the SELF trick", function () {
        var energy = 200;
        var lion = new Lion(energy);

        lion.hunt();

        assert.equal(__, lion.energy);
      });

      it("interprets the THIS when the function is executed", function () {        
        var lion = new Lion();
        lion.energy = 200;

        lion.hunt = function () {
          this.energy = 4000;
        };
        lion.hunt();

        assert.equal(__, lion.energy);
      });
    });
  });
});