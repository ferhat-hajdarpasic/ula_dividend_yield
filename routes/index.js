var express = require('express');
var moment = require('moment');
var router = express.Router();
var plotly = require('plotly')("DemoAccount", "lr1c37zw81");
var fs = require("fs");
var accounting = require('accounting');

/* GET home page. 
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
*/
var request = require('request');
var cheerio = require('cheerio');

var asx = require('../lib/Asx.js');

router.get('/skeleton', function (req, res, next) {
    res.render('skeleton', {});
});
router.get('/mobile', function (req, res, next) {
    res.render('mobile', {});
});
router.get('/bootstrap', function (req, res, next) {
    res.render('bootstrap', {});
});
router.get('/stock', function (req, res, next) {
    var ticker = req.query.ticker;
    asx.price(ticker, function (price) {
        res.render('stock', {
            price: price,
            ticker: ticker
        });
    });
});

router.get('/image', function (req, res, next) {
    var ticker = req.query.ticker;
    var data = [
        {
            x: [0, 1, 2,3], 
            y: [3, 2, 1, 4], 
            type: 'bar', 
            stream: { token: 'yourStreamtoken', maxpoints: 200 }
        }];
    var layout = { fileopt : "extend", filename : "haba1" };
    plotly.plot(data, layout, function (err, msg) {
        if (err) {
            return console.log(err);
        }
        console.log(msg);
        //var stream = plotly.stream('yourStreamtoken', function (res) {
         //   console.log(res);
        //});
        //res.setHeader("Content-Type", "image/png");
        //stream.pipe(stream);
    });
});
router.get('/dividends', function (req, res, next) {
    var ticker = req.query.ticker;
    asx.price(ticker, function (price) {
        asx.termDepositRate(function (termDepositRecord) {
            asx.retailLandingRate(function (retailLendingRecord) {
                asx.dividends(ticker, function (dividends) {
                    var totalDividendIncome = 0;
                    dividends.forEach(function (dividend) {
                        if (dividend.exDividendDate.isAfter(moment().subtract('years', 1))) {
                            totalDividendIncome = totalDividendIncome + dividend.dividendIncome;
                        }
                    });
                    var dividendYield = accounting.toFixed(totalDividendIncome / price, 2);
                    res.render('dividends', {
                        title : 'Dividend Yield',
                        dividendYield : dividendYield,
                        termDeposit : termDepositRecord[13],
                        retailLandingRate : retailLendingRecord[19],
                        dividends: dividends,
                        ticker : ticker,
                        lastPrice : price,
                        helpers : {
                            formatDate : function (date) {
                                return date.format('DD/MM/YYYY')
                            }
                        }
                    });
                });
            });
        });
    });
});
router.get('/file/:jsonfile', function (req, res, next) {
    
    var filepath = __dirname + '\\..\\views\\bootstrap_files\\' + req.params.jsonfile;
    fs.readFile(filepath, 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
    });
});

router.get('/', function (req, res, next) {
    res.render('index', {});
});

router.get('/jumbotron', function (req, res, next) {
    res.render('jumbotron', {title : "Jumbotron!"});
});

router.get('/play', function (req, res, next) {
    res.render('play', { title : "Play!" });
});

router.get('/csv', function (req, res, next) {
    asx.retailLandingRate(function (record) {
        res.render('play', { title : record[13] });
    });
});

router.get('/priceSeries', function (req, res, next) {
    var ticker = req.query.ticker;
    asx.priceHistory(ticker, function (series) {
        var data = [];
        for (var i = series.length - 1; i >= 0; i--) {
            data.push([series[i].date.valueOf(), series[i].close]);
        }
        res.json(data);
    });
});

router.get('/dividendsSeries', function (req, res, next) {
    var ticker = req.query.ticker;
    asx.dividendsHistory(ticker, function (series) {
        var data = [];
        for (var i = series.length - 1; i >= 0; i--) {
            data.push([series[i].date.valueOf(), series[i].dividendAmount]);
        }
        res.json(data);
    });
});

router.get('/history', function (req, res, next) {
    var ticker = req.query.ticker;
    res.render('history', { ticker : ticker });
});


module.exports = router;