const { assert, expect, should } = chai;
should();

// You can implement your solution in another file or inline here
// Here is a great resource on Classes
// http://exploringjs.com/es6/ch_classes.html
describe.skip('Class in ES6 (test/04_classes.spec.js)', () => {
  describe('Class in ES6 (test/04_classes.spec.js)', () => {
    describe('Like a function ...', () => {

      it('should be a function', () => {
        // Declare the Human class below that will satisfy all assertions
        let Human;
        expect(Human).to.be.a('function');
      });
      it('should not be hoisted like function', () => {
        let polyFunc;

        (() => {
          polyFunc = new PolygonFunc(3, 5);
        }).should.not.throw(Error);

        function PolygonFunc(height, width) {
          this.height = height;
          this.width = width;

          this.log = function () {
            return `H:${this.height} & W:${this.width}`;
          };
        }

        let actual = polyFunc.log();

        expect(actual).equal('H:3 & W:5');

        let polyClass;

        // Hint: the class declaration position of PolygonClass is not correct
        //  please fix it.
        (() => {
          polyClass = new PolygonClass(3, 5);
        }).should.not.throw(Error);

        class PolygonClass {
          constructor(height, width) {
            this.height = height;
            this.width = width;
          }
          log() {
            return `H:${this.height} & W:${this.width}`;
          }
        }

        actual = polyClass.log();

        expect(actual).equal('H:3 & W:5');

      });
    });

    describe('Property ...', () => {
      // Declare and implement the Man class to satisfy all assertions below

      it('should have a name property called Man', () => {
        expect(Man).has.property('name').equal('Man');
      });

      it('Should have a property prototype of type object', () => {
        expect(Man).has.property('prototype').is.a('object');
        expect(typeof Man.prototype).equal('object');
      });

      it('Should contain a static property called inject of type array', () => {
        expect(Man).has.property('inject').is.an('array');
      });

      it('Should throw an error if no fullName is passed at the instantiation', () => {
        (() => {
          new Man();
        }).should.throw(Error);
      });

      describe('Man.prototype', () => {
        it('Should contain a property walk of type function', () => {
          expect(Man.prototype).has.property('walk').is.a('function');
        });
      });

      describe('Getter and Setter in ES6 class', () => {

        it('Should have an instance property fullName', () => {
          let obj = new Man({
            fullName: 'Tom Thomas'
          });
          const actual = obj.fullName;

          expect(actual).to.be.defined;
          expect(actual).to.equal('Tom Thomas');
        });

        it('It should throw an error if fullName is set to anything else but a string', () => {
          (() => {
            new Man({
              fullName: 12987
            });
          }).should.throw(Error);
        });
      });
    });
  });
});
