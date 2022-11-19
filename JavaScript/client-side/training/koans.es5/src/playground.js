// Install Quokka.js extension
// https://quokkajs.com/docs/

'use strict'

// ******** Numeric literal
5
10.05
3.14159
5000
5e3     // 5000
0xFE0A

// ******** String literal
'hello'
"World!"
'hello' + "World!"

// ******** Block
{
    console.log("Hello World!")
}

//******** lexical declaration

{
    let x = 20;
    let junior = { name: 'Junior' };
    let [a, b, c] = [1, 2, 3];
    // a === 1, b === 2, c === 3
    let [d, e, ...f] = [1, 2, 3, 4, 5];
    // d === 1, e === 1, f === [3, 4, 5]
    const [{ g, h }, { i, j }, ...k] = [{ g: 1, h: 2 }, { i: 3, j: 4 }, 5, 6]
    // g === 1, h === 2, i === 3, j === 4, k === [5, 6]
    let { l, m, n: [o, p, ...q] } = { l: 1, m: 2, n: [3, 4, 5, 6] }
    // l === 1, m === 2, n is not defined, o === 3, p === 4, q === [5, 6]

    console.log(x);
    console.log(junior);
    console.log(a, b, c);
    console.log(d, e, f);
    console.log(g, h, i, j, k);
    console.log(l, m, o, p, q);
}



// example showing lexical scoping
{
    let x = 5;
    {
        let x = 4;
    }
    x === 5;  // true
    console.log(x);

    {
        const y = 10;
    }
    //console.log(y); // undefined
}

const c = 5;
//c = 4;



//********** binding pattern
{
    let input = {
        firstName: 'Harry',
        dob: {
            y: 1979,
            m: 2,
            d: 15
        },
        amounts: [10, 20, 30, 40, 50, 60, 70]
    }
    let {
        firstName,
        dob: dob,
        amounts: [amt1, amt2, amt3, ...remainingAmts],
        surname = 'Windsor'
    } = input;
    console.log(firstName);                       // Harry
    console.log(surname);                         // Windsor
    console.log(dob);                             // { y: 1979, m: 2, d: 15 }
    console.log(amt1, amt2, amt3, remainingAmts); // 10 20 30 [40, 50, 60, 70]
}


// *********** Variable declaration
{
    var x1 = 5;
    var brian = { name: 'Brian' }
    var [anne, bae] = ["Anne", "Bae"] // anne contains "Anne", bae contains "Bae"
    var { pi, e } = { pi: 3.14159, e: 2.71828 } // pi === 3.14159, e === 2.71828 

    console.log(anne);
    console.log(bae);
    console.log(pi);
    console.log(e);

    var y1 = 5;
    {
        var y1 = 4;
    }
    y1 === 5; // false! The y1 declared within the block is the same y1
    console.log(y1);

    {
        var z1 = 10;
    }
    z1 === 10; // true, z1 is hoisted up to the containing block
    console.log(z1);
}



// *********** Function declaration
{

    function square(x) { return x * x; }
    let sq4 = square(4);  // 16

    let sq = function (x) { return x * x; }
    let sq5 = sq(5);      // 25

    let log = function (operand, base = e) {
        // calculate logarithm of operand to base provided
    }
    let log1000 = log(1000, 10); // 3

    let calcAge = function ({ y, m, d }) {
        // do calc using y, m and d
        return 39;
    }
    let dob = { y: 1979, m: 2, d: 15 }
    let age = calcAge(dob);  // 39

    let result = function (input) {
        // do calculation of result
        return 5;
    }();  // result === 5

}

// *********** Generator declaration
{

    // finite generator:
    let greetingWordByWord = function* () {
        yield "Hello";
        yield "world!";
    }
    let greetingGen = greetingWordByWord();
    let greeting = greetingGen.next().value + " " + greetingGen.next().value;
    console.log(greeting);  // Hello world!

    let furtherGreeting = greetingGen.next();
    console.log(furtherGreeting.value);
    console.log(furtherGreeting.done);

    // infinite generator
    let naturalNumbers = function* () {
        let num = 1;
        while (true) {
            yield num;
            num = num + 1
        }
    }
    let naturalNumberGen = naturalNumbers();
    console.log(naturalNumberGen.next().value); // 1
    console.log(naturalNumberGen.next().value); // 2, and so on

    // generator that uses another generator
    let generateTriangle = function* (size) {
        let x = 1;
        do {
            yield x;
            x += 1;
        } while (x <= size);
    }
    let triangleNumbers = function* () {
        let triangleSize = 1;
        do {
            yield* generateTriangle(triangleSize);
            triangleSize += 1;
        } while (true);
    }();
    console.log(triangleNumbers.next().value)
    // continuing calls generate this sequence: 1 1 2 1 2 3 1 2 3 4 1 2 3 4 5

}

// ********* Class declaration
{
    let Animal = class {
        constructor(name) {
            this.name = name;
        }
        speak() {
            console.log(this.name + " tries to speak");
        }
    }
    let Cat = class extends Animal {
        constructor(name, colour) {
            super(name);
            this.colour = colour;
        }
        speak() {
            console.log(
                `${this.name} says miaow and licks her ${this.colour} fur.`);
        }
    }
    let a = new Animal("Wormy");
    a.speak();  // Wormy tries to speak
    let c = new Cat("McGee", "grey");
    c.speak();  // McGee says miaow and licks her grey fur
    console.log(typeof (Animal));
}

// ******* Method declaration
{
    let Rectangle = class {
        constructor(width, height) {
            this.setDimensions(width, height);
        }
        get width() {
            return this.w;
        }
        get height() {
            return this.h;
        }
        get ["perimeter" + "Length"]() {
            return (this.w + this.h) * 2;
        }
        set dimensions({ width, height }) {
            this.setDimensions(width, height);
        }
        calculateArea() {
            return this.width * this.height;
        }
        setDimensions(width, height) {
            this.w = width;
            this.h = height;
        }
    }
    let r = new Rectangle(20, 10);
    console.log(r.calculateArea()); // 200
    r.setDimensions(20, 30);
    console.log(r.calculateArea()); // 600
    r.dimensions = { width: 50, height: 60 };
    console.log(r.width); // 50
    console.log(r.height); // 60
    console.log(r.perimeterLength);
}


// **************** Throw statement (and try statement)
{

    let f = function () {
        throw {
            name: "NotFoundException",
            message: "The expected object was not found."
        }
    }

    let validateAge = function (age) {
        if (typeof (age) !== 'number') {
            throw {
                name: 'ValidationException',
                message: 'Age must be a number'
            }
        }
    }

    try {
        validateAge('5');
    } catch (ex) {
        console.log(ex.name);     // ValidationException
        console.log(ex.message);  // Age must be a number
    }
}


// ************ Return statement
{
    let sq = function (n) {
        return n * n;
    }
    let sq10 = sq(10);
    console.log(sq10);  // 100

    let noReturn = function () { }
    let result = noReturn();
    console.log(result);  // undefined
}

// ********* break statement
{
    let str = "";
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j <= i; j++) {
            if (j === 1) {
                break;
            }
            str = str + j;
        }
        str = str + " ";
    }
    console.log(str);  // output is 0 0 0 0

    str = "";
    outer_loop:
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j <= i; j++) {
            if (j === 1) {
                break outer_loop;
            }
            str = str + j;
        }
        str = str + " ";
    }
    console.log(str);  // output is 0 0 
}

// ******** continue statement
{
    let str = "";
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j <= i; j++) {
            if (j === 1) {
                continue;
            }
            str = str + j;
        }
        str = str + " ";
    }
    console.log(str); // output is 0 0 02 023

    str = "";
    outer_loop:
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j <= i; j++) {
            if (j === 1) {
                continue outer_loop;
            }
            str = str + j;
        }
        str = str + " ";
    }
    console.log(str); // output is 0 000
}

// ******** if statement
{
    let canDrive = function (age) {
        if (age < 18) {
            return false;
        } else if (age > 90) {
            return false
        } else {
            return true;
        }
    }
    console.log(canDrive(15));  // false
    console.log(canDrive(100)); // false
    console.log(canDrive(21));  // true

    let x = 5;
    if (x === 4)  // interpreter may insert a semi-colon here!
        x += 1;

    x = 5;
    if (x === 4) {
        x += 1;
    }

}

// ************** switch statement
{
    let check = function (s) {
        switch (s) {
            case 4:
                s += 1;
                break;
            case 5:
                s = s * 5;
                break;
            case 6:
                s -= 1;
            case 7:
                return 20;
            default:
                s = 2;
        }
        return s;
    }
    console.log(check(4));  // 5
    console.log(check(5));  // 25
    console.log(check(6));  // 20
    console.log(check(7));  // 20
    console.log(check(8));  // 2

}

// ********** while statement
{
    let count = 1;
    while (count < 10) {
        console.log(count);  // output is 1 3 5 7 9
        count += 2;
    }

    let obj = 3;
    while (obj) {
        console.log("truthy"); // truthy truthy truthy
        obj -= 1;
    }
}

// ********** do statement
{
    let count = 1;
    do {
        console.log(count);  // output is 1 3 5 7 9
        count += 2;
    } while (count < 10);

    let obj = 3;
    do {
        console.log("truthy"); // truthy truthy truthy
        obj -= 1;
    } while (obj);

}


// ************** for statement
{

    for (let i = 0; i < 3; i += 1) {
        console.log(i);  // 0 1 2
    }

    let count = 0;
    for (; ;) {    // not a recommended use - rather use while (true) { ... }
        if (count === 3) break;
        console.log(count);  // 0 1 2
        count += 1;
    }

    let evensToN = function* (n) {
        for (let even = 0; even < n; even += 2) {
            yield even;
        }
    }
    let eventsTo10 = evensToN(10);
    console.log(eventsTo10.next());
    console.log(eventsTo10.next());
}


// ******** prefix operators
{

    console.log(typeof 3);
    console.log(typeof '3');
    typeof 3   // 'number'
    typeof '3' // 'string'

    console.log(typeof '3');
    console.log(typeof +'3');

    typeof '3'  // 'string'
    typeof +'3' // 'number'

    console.log(typeof '3');
    console.log(typeof -'3');
    console.log(-'3' === -3);

    typeof '3'   // 'string'
    typeof -'3'  // 'number'
        - '3' === -3; // true

    console.log(! 'hello');
    console.log(! null);

    ! 'hello' // false
    ! null    // true

}


// ******** infix operators
{

    let x = 5;
    let y = 10;
    let z = x + y;  // 15
    let greeting = 'Hello' + ' ' + 'world!';  // 'Hello world!'
    let happy = true;
    let healthy = false;
    let isOK = happy && healthy;  // false
    let isPartiallyOK = happy || healthy;  // true

    console.log(greeting);
    console.log(isOK);
    console.log(isPartiallyOK);

    console.log('3' == 3);
    console.log('3' === 3);

    '3' == 3;   // true, which is an odd result
    '3' === 3;  // false, which is expected

}

/// *********** invocation
{

    let f = function (x) {
        return 5 * x;
    }
    console.log(f(10));

}

/// *************** refinement
{

    let rectangle = {
        width: 20,
        height: 30
    }
    let width = rectangle.width;           // 20
    let height = rectangle['hei' + 'ght']; // 30
    let area = rectangle.area;             // undefined
    console.log(width);
    console.log(height);
    console.log(area);

}

// ************** ternary operator
{

    let greeting = function (hour) {
        return hour < 12 ? "Good morning" : "Good day"
    }
    console.log(greeting(8));  // Good morning
    console.log(greeting(14)); // Good day

    {
        let greeting = function (hour) {
            if (hour < 12) {
                return "Good morning";
            } else {
                return "Good day";
            }
        }
    }
}


// ************* regexp
{

    let containsDigit = /[0123456789]/
    console.log(containsDigit.test('1'));
    console.log(containsDigit.test('a'));
    console.log(containsDigit.test('1,000'));
    console.log(containsDigit.test('1000'));
    console.log(containsDigit.test('a1'));

    let containsOnlyDigits = /^[0123456789]*$/
    console.log(containsOnlyDigits.test('1'));
    console.log(containsOnlyDigits.test('a'));
    console.log(containsOnlyDigits.test('1,000'));
    console.log(containsOnlyDigits.test('1000'));
    console.log(containsOnlyDigits.test('a1'));


}

// ************ arrow functions
{

    let double = x => 2 * x;
    console.log(double(5)); // 10

    let area = (width, height) => width * height;
    console.log(area(10, 20)); // 200

    let collect = (...test) => test;
    console.log(collect(1, 2, 3)); // [1, 2, 3]

    let multiply = ({ x, y }) => x * y;
    console.log(multiply({ x: 2, y: 3 })); // 6

    let numbers = [1, 2, 3, 4, 5]
    let squares = numbers.map(n => n * n);
    console.log(squares); // [1, 4, 9, 16, 25]

}

// ************** Assignment
{
    {
        let { a, b } = { a: 10, b: 20 };

    }

    {
        let num = 4;
        if (num === 5);
        num += 1;

        console.log(num);

        num = 4;
        if (num === 5) {
            num += 1;
        }
        console.log(num);
    }
}

/// ******** Assignment statement
{
    let bob = { name: 'Bob', age: 25 }
    bob.age = 29;   // bob.age is now 29
    bob.age += 1;   // bob.age is now 30
    let age = bob.age -= 1;        // bob.age is now 29, so is age
    let newAge = bob['age'] += 10; // bob.age is now 39, so is newAge
    console.log(age);
    console.log(newAge);
}

/// ****** Invocation statement

{
    let subs = {
        name: 'Subs',
        age: 20,
        incrementAge: function () { this.age += 1; }
    }
    subs.incrementAge(); // subs.age is now 21
    console.log(subs.age);
}

/// ******** delete statement
{
    let amahle = {
        name: 'Amahle',
        age: 25
    }
    delete amahle.age;   // amahle.age is now 'undefined'
    console.log(amahle.age);

    let sbu = {
        name: 'Sbu',
        age: 45
    }
    let sbustr =
        `Name: ${sbu.name}
Age: ${sbu.age}`
    console.log(sbustr);
}


// ******* Refinement

{
    let test = {};
    console.log(test.greeting)
    console.log(test['greeting']);
}


// ******************* Objects
{
    let x = {}, y = x;
    x.value = 5;
    console.log(y.value); // 5

    let point = {
        x: 0,
        y: 0,
        distanceFromOrigin: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }
    point.x = 3;
    point.y = 4;
    console.log(point.distanceFromOrigin());  // 5
    console.log(point['x']);   // 3

    let distanceFromOrigin = point.distanceFromOrigin;
    console.log(distanceFromOrigin.apply(point));  // 5


    {
        let animalPrototype = {
            name: 'unnamed',
            speak: function () {
                console.log(`${this.name} made a noise.`);
            }
        }
        console.log(animalPrototype.hasOwnProperty('speak'));  // true

        let dog = Object.create(animalPrototype);
        dog.speak();      // unnamed made a noise.
        console.log(dog.hasOwnProperty('speak'));  // false
        dog.name = 'Fido'
        dog.speak();      // Fido made a noise
        dog.speak = function () {
            console.log(`${this.name} barked!`);
        }
        dog.speak();      // Fido barked!
        console.log(dog.hasOwnProperty('speak')); // true

        let poodle = Object.create(dog);
        poodle.name = 'Spot';
        poodle.speak();   // Spot barked!

        delete dog.speak;
        poodle.speak();   // Spot made a noise.

        // let specialArray = Object.create(myArray);
        // myArray.push(5);
        // console.log(myArray[0]);
        // console.log(specialArray[0]);
        // specialArray.push(10);
        // console.log(myArray[1]);
        // console.log(specialArray[1]);
    }


    class Light {
        constructor() {
            this.status = 'off';
        }
        switch() {
            this.status = this.status === 'off' ? 'on' : 'off';
        }
    }
    let lamp = new Light();
    console.log(lamp.status);
    lamp.switch();
    let switchFunc = lamp.switch;
    switchFunc.apply(lamp);
    console.log(lamp.status);

    {

        let falsyTruthyList = [
            false,
            true,
            null,
            {},
            undefined,
            '',
            ' ',
            0,
            1,
            -1,
            NaN,
            []
        ];
    
        let truthyValues = falsyTruthyList.filter((x) => x);        
        console.log(truthyValues);
        //assert.DeepEqual();
        assert.deepEqual([ true, {},' ', 1, -1, []], truthyValues, 'do we understand truthyness in general?');

    }


    {
        let student = {
            learnJs() {
              this.masteredJs = true;
            }
          };
      
          let devfluenceStudent = {
            __proto__: student
          };
      
          devfluenceStudent.learnJs();
          assert.equal(
            true,
            devfluenceStudent.masteredJs,
            "did the devfluence student master js?"
          );
        console.log(student.masteredJs);
           assert.equal(
             undefined,
             student.masteredjs,
             "did the regular student master js?"
           );


        let developer = {
            technologies: [],
      
            learn(tech) {
              console.log(this, this.technologies.length)
                this.technologies.push(tech);
            }
          };
      
          let antonio = {
            __proto__: developer
          };
          let davy = {
            __proto__: developer
          };
          antonio.learn("php");
          console.log(antonio.technologies);
          console.log(davy.technologies);
          assert.equal(antonio.technologies.length, 1, "What has Antonio learned?");
          assert.equal(
            davy.technologies.length,
            1,
            "Davy should not have learned php"
          );

          const Mammal = function(name) {
            this.name = name;
          };
          // things that don't need to be set in the constructor should be added to the constructor's prototype property.
          Mammal.prototype = {
            sayHi: function() {
              return "Hello, my name is " + this.name;
            }
          };
        


          const paul = new Mammal("Paul");
          Mammal.prototype.numberOfLettersInName = function() {
            return this.name.length;
          };
          console.log(paul.__proto__);
          // the following statement asks the paul object to call a function that was added
          // to the Mammal prototype after paul was constructed.
          assert.equal(4, paul.numberOfLettersInName(), "how long is Paul's name?");


          const person = {
            name: "Amory Blaine",
            age: 102,
            toString: function() {
              let a = this.name;
              let b = this.age;
              let c = `${this.name}`;
              let d = `${this.age}`;
              console.log(process.versions);
              console.log(c,d);
              return `I ${this.name} am ${this.age} years old.`; // HINT: use the 'this' keyword to refer to the person object.
            }
          };
          assert.equal(
            "I Amory Blaine am 102 years old.",
            person.toString(),
            "what should the toString function be?"
          );


{

    let A = function() {
        this.aprop = "A";
      };
      
      let B = function() {
        this.bprop = "B";
      };
      
      B.prototype = new A();

      let b = new B();
      let propertyName;
  
      let keys = [];
      for (propertyName in b) {
        console.log(propertyName);
        b.hasOwnProperty(propertyName) ? console.log(`TRUE HERO: ${propertyName}`) : console.log(`FALSE HERO: ${propertyName}`);
        keys.push(propertyName);
      }
      console.log(keys, b);
      
      assert.equal(2, keys.length, "how many elements are in the keys array?");
      assert.deepEqual(["bprop","aprop"], keys, "what are the properties of the array?");
    
      let ownKeys = [];
      for (propertyName in b) {
        if (b.hasOwnProperty(propertyName)) {
            ownKeys.push(propertyName);
        }
      }
      
      let a = new A();
      console.log(a, b);
      assert.equal(
        1,
        ownKeys.length,
        "how many elements are in the ownKeys array?"
      );
      assert.deepEqual(
        ["bprop"],
        ownKeys,
        "what are the own properties of the array?"
      );


}



    }


}