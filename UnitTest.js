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

    it('Return price series for ticker', (done) => {
        var promise = new Promise(function (resolve, reject) {
            asx.priceHistory('BHP', function (series) {
                resolve(series);
            });
        });

        promise.then((series) => {
            for (var i = series.length - 1; i >= 0; i--) {
                //console.log([series[i].date.valueOf() + '=>' + series[i].close]);
            }
            done();
        })
    }).timeout(50000);

    it('Return option series for ticker, month and option type', (done) => {
        var promise = new Promise(function (resolve, reject) {
            asx.options('BHP', 'Jan 2017', 'Call', function (series) {
                resolve(series);
            });
        });

        promise.then((series) => {
            for (var i = series.length - 1; i >= 0; i--) {
                if (series[i].last > 0.0) {
                    console.log(JSON.stringify(series[i]));
                }
            }
            done();
        })
    }).timeout(50000);
})
