const assert = require('assert');

describe("About Truthyness (topics/03_about_truthyness.js)", function () {

    it("truthyness of positive numbers", function () {
        const oneIsTruthy = 1 ? true : false;
        assert.equal(true, oneIsTruthy, 'is one truthy?');
    });

    it("truthyness of negative numbers", function () {
        const negativeOneIsTruthy = -1 ? true : false;
        assert.equal(true, negativeOneIsTruthy, 'is -1 truthy?');
    });

    it("truthyness of zero", function () {
        const zeroIsTruthy = 0 ? true : false;
        assert.equal(false, zeroIsTruthy, 'is 0 truthy?');
    });

    it("truthyness of null", function () {
        const nullIsTruthy = null ? true : false;
        assert.equal(false, nullIsTruthy, 'is null truthy?');
    });

    it("general application of truthyness", function () {
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
        assert.deepEqual([ true, {}, ' ', 1, -1, [] ], truthyValues, 'do we understand truthyness in general?');
    });
});

