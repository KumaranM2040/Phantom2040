const { assert, expect, should } = chai;

describe.skip('var, let, const (test/01_variables-parameters.spec.js)', () => {
  
  describe('var...', () => {

    var name = 'outer';

    function myFunc(bool) {
      if (bool) {
        var name = 'inner';
      }
      return name;
    }

    it('what do you expect???', () => {
      const actual = myFunc(false);
      expect(actual).to.equal(__);
    });
    it('and now???', () => {
      const actual = myFunc(true);
      expect(actual).to.equal(__);
    });
  });

  describe('let...', () => {

    var name = 'outer';

    function myFunc(bool) {
      if (bool) {
        let name = 'inner';
      }
      return name;
    }
 
    it('what do you expect???', () => {
      const actual = myFunc(false);
      expect(actual).to.equal(__);
    });

    it('and now???', () => {
      const actual = myFunc(true);
      expect(actual).to.equal(__);
    });
  });

  describe('const...', () => {

    var name = 'outer';

    function myFunc(bool) {
      if (bool) {
        const name = 'inner';
      }
      return name;
    }
 
    it('what do you expect???', () => {
      const actual = myFunc(false);
      expect(actual).to.equal(__);
    });

    it('and now???', () => {
      const actual = myFunc(true);
      expect(actual).to.equal(__);
    });
  });
});
