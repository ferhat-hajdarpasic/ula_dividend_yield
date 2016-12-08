var assert = require('assert');
var asx = require('./lib/Asx.js');

describe('Get price from ASX', function () {
    it('Valid ticker must return correct price', (done) => {
        var promise = new Promise(function (resolve, reject) {
                asx.price('NAB', function (price) {
                    resolve(price);
                });
            });

        promise.then((price) => {
            console.log("price=" + price);
            var p = parseFloat(price);
            assert.ok(p > 0.0);
            done();
        })
    }).timeout(50000);

    it('Invalid ticker must fail', (done) => {
        var promise = new Promise(function (resolve, reject) {
            asx.price('23NAB', function (price) {
                resolve(price);
            });
        });

        promise.then((price) => {
            console.log("price=" + price);
            assert.ok(price == '');
            done();
        })
    }).timeout(50000);
})
