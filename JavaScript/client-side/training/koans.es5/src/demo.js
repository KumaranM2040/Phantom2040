// object in javascript

// 1
const obj = {};
obj.run = function() {
  console.log('running...');
};

// 2
// class User{
//   constructor(){}
// }
function User() {}
const user = new User();

// 3
const objCreate = Object.create(User);

// Variable hoisting

function hoisting() {
  const user = { name: 'user' };
  run();

  // Private API
  function run() {
    init();
  }

  function first() {
    console.log(user);
  }

  function init() {}

  // Public API
  return {
    init,
    first
  };
}

hoisting.call = function() {};

const res = hoisting();

console.log(res);

//Prototype

function Company(name) {
  this.name = name;
}

Company.prototype.register = function() {
  return this.name;
};

const comp1 = new Company('foobar');
const comp2 = new Company('koanlab');
const comp3 = new Company('whatever');

// closure

for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  });
}

var funcs = [];
for (var i = 0; i < 3; i++) {
  funcs[i] = function() {
    console.log(i);
  };
}

funcs[0]();
funcs[1]();
funcs[2]();

function add(x) {
  const user = {};
  return function(y) {
    console.log(user);
    return x + y;
  };
}

const add20 = add(20);

console.log(add20(5));
